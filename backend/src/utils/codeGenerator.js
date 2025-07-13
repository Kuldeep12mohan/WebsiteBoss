
const generateWebsiteCode = (template, customData) => {
  let html = template.html_content;
  let css = template.css_content;
  let js = template.js_content || '';

  // Replace placeholders with custom data
  if (customData) {
    // Replace text content
    if (customData.businessName) {
      html = html.replace(/{{BUSINESS_NAME}}/g, customData.businessName);
    }
    if (customData.tagline) {
      html = html.replace(/{{TAGLINE}}/g, customData.tagline);
    }
    if (customData.description) {
      html = html.replace(/{{DESCRIPTION}}/g, customData.description);
    }
    if (customData.phone) {
      html = html.replace(/{{PHONE}}/g, customData.phone);
    }
    if (customData.email) {
      html = html.replace(/{{EMAIL}}/g, customData.email);
    }
    if (customData.address) {
      html = html.replace(/{{ADDRESS}}/g, customData.address);
    }

    // Replace images
    if (customData.logo) {
      html = html.replace(/{{LOGO_URL}}/g, customData.logo);
    }
    if (customData.heroImage) {
      html = html.replace(/{{HERO_IMAGE_URL}}/g, customData.heroImage);
    }

    // Replace colors
    if (customData.primaryColor) {
      css = css.replace(/{{PRIMARY_COLOR}}/g, customData.primaryColor);
    }
    if (customData.secondaryColor) {
      css = css.replace(/{{SECONDARY_COLOR}}/g, customData.secondaryColor);
    }

    // Replace product images and info
    if (customData.products && Array.isArray(customData.products)) {
      let productsHtml = '';
      customData.products.forEach((product, index) => {
        productsHtml += `
          <div class="product-item">
            <img src="${product.image || '/placeholder.svg'}" alt="${product.name || 'Product'}" class="product-image">
            <h3 class="product-name">${product.name || 'Product Name'}</h3>
            <p class="product-description">${product.description || 'Product description'}</p>
            <span class="product-price">${product.price || '$0.00'}</span>
          </div>
        `;
      });
      html = html.replace(/{{PRODUCTS}}/g, productsHtml);
    }

    // Replace services
    if (customData.services && Array.isArray(customData.services)) {
      let servicesHtml = '';
      customData.services.forEach((service, index) => {
        servicesHtml += `
          <div class="service-item">
            <h3 class="service-name">${service.name || 'Service Name'}</h3>
            <p class="service-description">${service.description || 'Service description'}</p>
          </div>
        `;
      });
      html = html.replace(/{{SERVICES}}/g, servicesHtml);
    }

    // Replace social media links
    if (customData.socialMedia) {
      if (customData.socialMedia.facebook) {
        html = html.replace(/{{FACEBOOK_URL}}/g, customData.socialMedia.facebook);
      }
      if (customData.socialMedia.instagram) {
        html = html.replace(/{{INSTAGRAM_URL}}/g, customData.socialMedia.instagram);
      }
      if (customData.socialMedia.twitter) {
        html = html.replace(/{{TWITTER_URL}}/g, customData.socialMedia.twitter);
      }
    }
  }

  // Remove any remaining placeholders
  html = html.replace(/{{[^}]+}}/g, '');
  css = css.replace(/{{[^}]+}}/g, '#333333'); // Default color for remaining placeholders

  return {
    html,
    css,
    js
  };
};

module.exports = { generateWebsiteCode };
