
const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage (we'll upload to Cloudinary directly)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload image to Cloudinary
router.post('/image', authenticateToken, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File too large' });
        }
      }
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      // Upload to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'websiteboss',
          public_id: `user_${req.user.userId}_${Date.now()}`,
        },
        async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ message: 'Failed to upload image' });
          }

          try {
            // Save upload record to database
            const uploadRecord = await prisma.upload.create({
              data: {
                filename: result.public_id,
                originalName: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                path: result.secure_url,
                userId: req.user.userId
              }
            });

            res.json({
              id: uploadRecord.id,
              filename: result.public_id,
              originalName: req.file.originalname,
              url: result.secure_url,
              size: req.file.size
            });
          } catch (dbError) {
            console.error('Database save error:', dbError);
            res.status(500).json({ message: 'Failed to save upload record' });
          }
        }
      );

      // Pipe the file buffer to Cloudinary
      uploadStream.end(req.file.buffer);

    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: 'Failed to upload image' });
    }
  });
});

// Get user uploads
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const uploads = await prisma.upload.findMany({
      where: { userId },
      select: {
        id: true,
        filename: true,
        originalName: true,
        mimetype: true,
        size: true,
        path: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // URLs are already full Cloudinary URLs
    const uploadsWithUrls = uploads.map(upload => ({
      ...upload,
      url: upload.path
    }));

    res.json(uploadsWithUrls);
  } catch (error) {
    console.error('Get uploads error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete upload
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Find upload
    const upload = await prisma.upload.findFirst({
      where: { id, userId }
    });

    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(upload.filename);
    } catch (cloudinaryError) {
      console.error('Cloudinary delete error:', cloudinaryError);
      // Continue with database deletion even if Cloudinary deletion fails
    }

    // Delete record from database
    await prisma.upload.delete({
      where: { id }
    });

    res.json({ message: 'Upload deleted successfully' });
  } catch (error) {
    console.error('Delete upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
