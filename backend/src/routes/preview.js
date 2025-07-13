
const express = require('express');
const { generateWebsiteCode } = require('../utils/codeGenerator');

const router = express.Router();

// Generate preview HTML
router.post('/generate-preview', async (req, res) => {
  try {
    const { template, customData } = req.body;

    if (!template) {
      return res.status(400).json({ message: 'Template is required' });
    }

    // Generate website code
    const generatedCode = generateWebsiteCode(template, customData);

    // Combine HTML with CSS and JS for preview
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
        ${generatedCode.css}
    </style>
</head>
<body>
    ${generatedCode.html}
    ${generatedCode.js ? `<script>${generatedCode.js}</script>` : ''}
</body>
</html>
    `;

    res.json({
      html: fullHtml,
      css: generatedCode.css,
      js: generatedCode.js
    });
  } catch (error) {
    console.error('Generate preview error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
