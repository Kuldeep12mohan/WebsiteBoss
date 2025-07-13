
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const archiver = require('archiver');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken } = require('../middleware/auth');
const { generateWebsiteCode } = require('../utils/codeGenerator');

const router = express.Router();
const prisma = new PrismaClient();

// Get user projects
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        template: {
          select: {
            name: true,
            industry: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Format response
    const formattedProjects = projects.map(project => ({
      id: project.id,
      name: project.name,
      template_name: project.template.name,
      industry: project.template.industry,
      created_at: project.createdAt,
      updated_at: project.updatedAt
    }));

    res.json(formattedProjects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { templateId, name, customData } = req.body;

    // Validate template exists
    const template = await prisma.template.findUnique({
      where: { id: templateId }
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Generate website code
    const generatedCode = generateWebsiteCode(template, customData);

    // Create project
    const project = await prisma.project.create({
      data: {
        name: name || `${template.name} Project`,
        userId,
        templateId,
        customData: customData || {},
        html_content: generatedCode.html,
        css_content: generatedCode.css,
        js_content: generatedCode.js
      },
      include: {
        template: {
          select: {
            name: true,
            industry: true
          }
        }
      }
    });

    res.status(201).json({
      id: project.id,
      name: project.name,
      template_name: project.template.name,
      industry: project.template.industry,
      created_at: project.createdAt,
      updated_at: project.updatedAt
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get project by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: { id, userId },
      include: {
        template: true
      }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const {  customData } = req.body;
    const name = customData.businessName;

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findFirst({
      where: { id, userId },
      include: { template: true }
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Generate updated website code
    const generatedCode = generateWebsiteCode(existingProject.template, customData);

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: {
        name: name || existingProject.name,
        customData: customData || existingProject.customData,
        html_content: generatedCode.html,
        css_content: generatedCode.css,
        js_content: generatedCode.js
      },
      include: {
        template: {
          select: {
            name: true,
            industry: true
          }
        }
      }
    });

    res.json({
      id: project.id,
      name: project.name,
      template_name: project.template.name,
      industry: project.template.industry,
      created_at: project.createdAt,
      updated_at: project.updatedAt
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Download project
router.get('/:id/download', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Get project
    const project = await prisma.project.findFirst({
      where: { id, userId }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create temporary directory
    const tempDir = path.join(__dirname, '../temp', uuidv4());
    await fs.ensureDir(tempDir);

    try {
      // Write files
      await fs.writeFile(path.join(tempDir, 'index.html'), project.html_content || '');
      await fs.writeFile(path.join(tempDir, 'style.css'), project.css_content || '');
      if (project.js_content) {
        await fs.writeFile(path.join(tempDir, 'script.js'), project.js_content);
      }

      // Create README
      const readme = `# ${project.name}

This website was generated by WebsiteBoss.

## Files included:
- index.html - Main HTML file
- style.css - Stylesheet
${project.js_content ? '- script.js - JavaScript functionality' : ''}

## How to use:
1. Upload all files to your web hosting service
2. Open index.html in a web browser

Generated on: ${new Date().toLocaleString()}
`;
      await fs.writeFile(path.join(tempDir, 'README.md'), readme);

      // Create ZIP
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      res.attachment(`${project.name.replace(/[^a-zA-Z0-9]/g, '_')}.zip`);
      archive.pipe(res);

      archive.directory(tempDir, false);
      await archive.finalize();

      // Cleanup
      setTimeout(() => {
        fs.remove(tempDir).catch(console.error);
      }, 60000); // Clean up after 1 minute

    } catch (fileError) {
      await fs.remove(tempDir).catch(console.error);
      throw fileError;
    }

  } catch (error) {
    console.error('Download project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Check if project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: { id, userId }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete project
    await prisma.project.delete({
      where: { id }
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
