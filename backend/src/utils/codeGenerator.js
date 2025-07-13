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
        const sku = product.sku || `SKU-${index + 1001}`;
        const unit = product.unit || 'piece';
        const specifications = [
          
        ];
        
        productsHtml += `
          <div class="product-item">
            <div class="product-image-container">
              <img src="${product.image || '/placeholder.svg'}" alt="${product.name || 'Product'}" class="product-image">
              <div class="product-badge">New</div>
            </div>
            <div class="product-info">
              <h3 class="product-name">${product.name || 'Product Name'}</h3>
              <p class="product-description">${product.description || 'Product description'}</p>
               <div class="product-details">
                 <div class="product-sku">SKU: ${sku}</div>
                 <div class="product-unit">Unit: ${unit}</div>
                 <div class="product-specs">
                   <ul>
                     ${specifications.map(spec => `<li>${spec}</li>`).join('')}
                   </ul>
                 </div>
               </div>
              <div class="product-pricing">
                <span class="product-price">${product.price || '$0.00'}</span>
                <span class="product-original-price">$${(parseFloat(product.price?.replace('$', '') || '0') * 1.2).toFixed(2)}</span>
              </div>
               <div class="product-actions">
                 <button class="btn-order" onclick="orderProduct('${product.name || 'Product'}', '${product.price || '$0.00'}', '${sku}', '${unit}', '${product.description || 'Product description'}')">
                   <i class="fas fa-shopping-cart"></i> Order Now
                 </button>
                 <button class="btn-wishlist" onclick="addToWishlist('${sku}')">
                   <i class="fas fa-heart"></i>
                 </button>
               </div>
            </div>
          </div>
        `;
      });
      
      // Add payment options section
      const paymentSection = `
        <div class="payment-options-section" id="payment-section" style="display: none;">
          <div class="payment-modal">
            <div class="payment-header">
              <h3>Choose Payment Method</h3>
              <button class="close-payment" onclick="closePayment()">×</button>
            </div>
            <div class="payment-content">
               <div class="selected-product-info">
                 <h4 id="selected-product-name">Product Name</h4>
                 <p id="selected-product-description">Product description</p>
                 <div class="product-meta">
                   <p id="selected-product-price">$0.00</p>
                   <p id="selected-product-sku">SKU: 000</p>
                   <p id="selected-product-unit">Unit: piece</p>
                 </div>
                 <div class="quantity-selector">
                   <label for="quantity">Quantity:</label>
                   <div class="quantity-controls">
                     <button type="button" onclick="decreaseQuantity()" class="qty-btn">-</button>
                     <input type="number" id="quantity" value="1" min="1" class="qty-input">
                     <button type="button" onclick="increaseQuantity()" class="qty-btn">+</button>
                   </div>
                 </div>
               </div>
              <div class="payment-methods">
                <div class="payment-method" onclick="selectPaymentMethod('upi')">
                  <i class="fas fa-mobile-alt"></i>
                  <span>UPI Payment</span>
                  <div class="payment-details upi-details" style="display: none;">
                    <input type="text" placeholder="Enter UPI ID" class="payment-input">
                  </div>
                </div>
                <div class="payment-method" onclick="selectPaymentMethod('card')">
                  <i class="fas fa-credit-card"></i>
                  <span>Credit/Debit Card</span>
                  <div class="payment-details card-details" style="display: none;">
                    <input type="text" placeholder="Card Number" class="payment-input">
                    <div class="card-row">
                      <input type="text" placeholder="MM/YY" class="payment-input">
                      <input type="text" placeholder="CVV" class="payment-input">
                    </div>
                  </div>
                </div>
                <div class="payment-method" onclick="selectPaymentMethod('cod')">
                  <i class="fas fa-money-bill-wave"></i>
                  <span>Cash on Delivery</span>
                  <div class="payment-details cod-details" style="display: none;">
                    <p>Pay when your order arrives at your doorstep</p>
                  </div>
                </div>
              </div>
              <button class="btn-confirm-order" onclick="confirmOrder()">Confirm Order</button>
            </div>
          </div>
        </div>
      `;
      
      html = html.replace(/{{PRODUCTS}}/g, productsHtml + paymentSection);
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

  // Add JavaScript for order functionality
  const orderJS = `
    // Order and Payment functionality
    function orderProduct(productName, price, sku, unit, description) {
      document.getElementById('selected-product-name').textContent = productName;
      document.getElementById('selected-product-description').textContent = description;
      document.getElementById('selected-product-price').textContent = price;
      document.getElementById('selected-product-sku').textContent = 'SKU: ' + sku;
      document.getElementById('selected-product-unit').textContent = 'Unit: ' + unit;
      document.getElementById('quantity').value = 1;
      document.getElementById('payment-section').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function increaseQuantity() {
      const input = document.getElementById('quantity');
      input.value = parseInt(input.value) + 1;
    }

    function decreaseQuantity() {
      const input = document.getElementById('quantity');
      if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
      }
    }

    function closePayment() {
      document.getElementById('payment-section').style.display = 'none';
      document.body.style.overflow = 'auto';
      // Reset payment method selection
      document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
        method.querySelector('.payment-details').style.display = 'none';
      });
    }

    function selectPaymentMethod(method) {
      // Remove previous selections
      document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
        el.querySelector('.payment-details').style.display = 'none';
      });
      
      // Select current method
      event.currentTarget.classList.add('selected');
      event.currentTarget.querySelector('.payment-details').style.display = 'block';
    }

    function confirmOrder() {
      const selectedMethod = document.querySelector('.payment-method.selected');
      if (!selectedMethod) {
        alert('Please select a payment method');
        return;
      }
      
      const productName = document.getElementById('selected-product-name').textContent;
      const quantity = document.getElementById('quantity').value;
      const paymentType = selectedMethod.querySelector('span').textContent;
      
      alert(\`Order confirmed for \${quantity} x \${productName} via \${paymentType}! Thank you for your purchase.\`);
      closePayment();
    }

    function addToWishlist(sku) {
      alert(\`Product \${sku} added to wishlist!\`);
    }

    // Close payment modal when clicking outside
    document.addEventListener('click', function(event) {
      const paymentSection = document.getElementById('payment-section');
      const paymentModal = document.querySelector('.payment-modal');
      
      if (paymentSection && paymentSection.style.display === 'flex' && 
          !paymentModal.contains(event.target)) {
        closePayment();
      }
    });
  `;

  // Add CSS for order functionality
  const orderCSS = `
    /* Product Card Enhancements */
    .product-item {
      position: relative;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      margin-bottom: 2rem;
    }
    
    .product-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }
    
    .product-image-container {
      position: relative;
      overflow: hidden;
    }
    
    .product-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .product-item:hover .product-image {
      transform: scale(1.05);
    }
    
    .product-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .product-info {
      padding: 1.5rem;
    }
    
    .product-name {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #2c2c2c;
    }
    
    .product-description {
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    
    .product-details {
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .product-sku, .product-unit {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .product-specs h4 {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    .product-specs ul {
      list-style: none;
      padding: 0;
    }
    
    .product-specs li {
      font-size: 0.8rem;
      color: #666;
      margin-bottom: 0.3rem;
      padding-left: 1rem;
      position: relative;
    }
    
    .product-specs li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #28a745;
      font-weight: bold;
    }
    
    .product-pricing {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #e74c3c;
    }
    
    .product-original-price {
      font-size: 1rem;
      color: #999;
      text-decoration: line-through;
    }
    
    .product-actions {
      display: flex;
      gap: 1rem;
    }
    
    .btn-order {
      flex: 1;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .btn-order:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .btn-wishlist {
      background: #f8f9fa;
      border: 2px solid #e9ecef;
      color: #6c757d;
      width: 50px;
      height: 50px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .btn-wishlist:hover {
      background: #ff6b6b;
      border-color: #ff6b6b;
      color: white;
      transform: scale(1.05);
    }
    
    /* Payment Modal Styles */
    .payment-options-section {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(5px);
    }
    
    .payment-modal {
      background: white;
      border-radius: 16px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      animation: modalSlideIn 0.3s ease-out;
    }
    
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    .payment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
    }
    
    .payment-header h3 {
      margin: 0;
      color: #2c2c2c;
    }
    
    .close-payment {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6c757d;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
    }
    
    .close-payment:hover {
      background: #f8f9fa;
      color: #333;
    }
    
    .payment-content {
      padding: 1.5rem;
    }
    
    .selected-product-info {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .selected-product-info h4 {
      margin: 0 0 0.5rem 0;
      color: #2c2c2c;
    }
    
    .selected-product-info p {
      margin: 0.25rem 0;
      color: #666;
    }
    
    .product-meta {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      padding: 0.5rem;
      background: white;
      border-radius: 6px;
    }
    
    .quantity-selector {
      margin: 1rem 0;
      text-align: center;
    }
    
    .quantity-selector label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }
    
    .quantity-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .qty-btn {
      background: #667eea;
      color: white;
      border: none;
      width: 35px;
      height: 35px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
      transition: all 0.2s ease;
    }
    
    .qty-btn:hover {
      background: #5a6fd8;
      transform: scale(1.05);
    }
    
    .qty-input {
      width: 80px;
      text-align: center;
      padding: 8px;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
    }
    
    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .payment-method {
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .payment-method:hover {
      border-color: #667eea;
      background: #f8f9ff;
    }
    
    .payment-method.selected {
      border-color: #667eea;
      background: #f0f4ff;
    }
    
    .payment-method i {
      font-size: 1.2rem;
      color: #667eea;
      width: 24px;
    }
    
    .payment-method span {
      font-weight: 500;
      color: #2c2c2c;
    }
    
    .payment-details {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
    }
    
    .payment-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    .card-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 0.5rem;
    }
    
    .btn-confirm-order {
      width: 100%;
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      border: none;
      padding: 15px;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-confirm-order:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
    }
    
    @media (max-width: 768px) {
      .payment-modal {
        width: 95%;
        margin: 1rem;
      }
      
      .product-actions {
        flex-direction: column;
      }
      
      .btn-wishlist {
        width: 100%;
        height: 45px;
      }
    }
  `;

  // Append the new JavaScript and CSS
  js = js + orderJS;
  css = css + orderCSS;

  return {
    html,
    css,
    js
  };
};

module.exports = { generateWebsiteCode };

	
