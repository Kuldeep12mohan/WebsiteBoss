
const API_BASE_URL = "https://website-builder-server-lttq.onrender.com/api"


export const templateService = {
  async getTemplates() {
    const response = await fetch(`${API_BASE_URL}/templates`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }

    return response.json();
  },

  async getTemplate(id: string) {
    const response = await fetch(`${API_BASE_URL}/templates/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch template');
    }

    return response.json();
  },

  async getTemplatesByIndustry(industry: string) {
    const response = await fetch(`${API_BASE_URL}/templates?industry=${industry}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }

    return response.json();
  },

  async generatePreview(template: any, customData: any) {
    const response = await fetch(`${API_BASE_URL}/generate-preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ template, customData }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate preview');
    }

    const data = await response.json();
    
    // Create complete HTML with inlined CSS and JS
    const completeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
        ${data.css || ''}
    </style>
</head>
<body>
    ${data.html || ''}
    ${data.js ? `<script>${data.js}</script>` : ''}
</body>
</html>
    `;
    
    return { html: completeHtml };
  }
};
