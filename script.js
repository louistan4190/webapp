// Pawsome Pets Shop - JavaScript Functionality

// ============================================
// Data Management
// ============================================

class PetsShop {
  constructor() {
    this.cart = [];
    this.orders = JSON.parse(localStorage.getItem('orders')) || [];
    this.currentOrderNumber = this.orders.length > 0
      ? Math.max(...this.orders.map(o => parseInt(o.orderNumber.replace('#', '')))) + 1
      : 1;
    this.init();
  }

  init() {
    this.renderProducts();
    this.renderCategories();
    this.renderOrderTypes();
    this.renderPaymentMethods();
    this.setupEventListeners();
    this.updateCartCount();
  }

  // ============================================
  // Product Rendering
  // ============================================

  renderProducts(categoryFilter = 'all') {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    let productsToShow = shopContent.products;

    if (categoryFilter !== 'all') {
      productsToShow = productsToShow.filter(p => p.category === categoryFilter);
    }

    productsToShow.forEach(product => {
      const card = this.createProductCard(product);
      grid.appendChild(card);
    });
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/200x200?text=${product.name.replace(/\\s/g, '+')}'">
      <div class="product-content">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">RM ${product.price.toFixed(2)}</p>
        <div class="product-actions">
          <div class="quantity-selector">
            <button class="quantity-btn minus-btn" data-product-id="${product.id}">−</button>
            <input type="number" class="quantity-input" value="1" min="1" max="99" data-product-id="${product.id}">
            <button class="quantity-btn plus-btn" data-product-id="${product.id}">+</button>
          </div>
          <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Add</button>
        </div>
      </div>
    `;

    // Quantity controls
    card.querySelector('.minus-btn').addEventListener('click', (e) => {
      const input = card.querySelector('.quantity-input');
      if (input.value > 1) input.value = parseInt(input.value) - 1;
    });

    card.querySelector('.plus-btn').addEventListener('click', (e) => {
      const input = card.querySelector('.quantity-input');
      input.value = parseInt(input.value) + 1;
    });

    // Add to cart
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      const quantity = parseInt(card.querySelector('.quantity-input').value);
      this.addToCart(product, quantity);
    });

    return card;
  }

  renderCategories() {
    const container = document.getElementById('categoryButtons');
    container.innerHTML = '';

    shopContent.categories.forEach(category => {
      const btn = document.createElement('button');
      btn.className = 'category-btn';
      btn.textContent = category.name;
      btn.dataset.category = category.id;
      btn.addEventListener('click', () => {
        this.filterByCategory(category.id);
      });
      container.appendChild(btn);
    });
  }

  filterByCategory(categoryId) {
    // Update active state
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-category="all"]`).classList.add('active');
    event.target.classList.add('active');

    // Render products
    this.renderProducts(categoryId);
  }

  // ============================================
  // Cart Management
  // ============================================

  addToCart(product, quantity) {
    quantity = parseInt(quantity) || 1;

    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity: quantity
      });
    }

    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCartCount();
    this.renderCart();
  }

  updateCartItemQuantity(productId, quantity) {
    quantity = Math.max(1, parseInt(quantity));
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCartCount();
      this.renderCart();
    }
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateCartCount() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
  }

  renderCart() {
    const container = document.getElementById('cartContent');

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <button class="btn btn-primary" data-section="browse">Continue Shopping</button>
        </div>
      `;
      return;
    }

    let cartHTML = '<div class="cart-items">';

    this.cart.forEach(item => {
      cartHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80x80?text=${item.name.replace(/\\s/g, '+')}'">
          <div class="cart-item-details">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">RM ${item.price.toFixed(2)}</p>
            <div class="cart-item-actions">
              <div class="quantity-selector">
                <button class="quantity-btn minus-btn" data-product-id="${item.id}">−</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-product-id="${item.id}">
                <button class="quantity-btn plus-btn" data-product-id="${item.id}">+</button>
              </div>
              <button class="btn btn-secondary remove-btn" data-product-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    cartHTML += '</div>';

    // Summary
    cartHTML += `
      <div class="cart-summary">
        <h3>Cart Summary</h3>
        ${this.cart.map(item => `
          <div class="cart-summary-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>RM ${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('')}
        <div class="cart-summary-divider"></div>
        <div class="cart-summary-total">
          <span>Total</span>
          <span>RM ${this.getCartTotal().toFixed(2)}</span>
        </div>
        <button class="btn btn-primary btn-full" data-section="checkout">Proceed to Checkout</button>
      </div>
    `;

    container.innerHTML = cartHTML;

    // Add event listeners
    container.querySelectorAll('.minus-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        const input = container.querySelector(`input[data-product-id="${productId}"]`);
        this.updateCartItemQuantity(productId, parseInt(input.value) - 1);
      });
    });

    container.querySelectorAll('.plus-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        const input = container.querySelector(`input[data-product-id="${productId}"]`);
        this.updateCartItemQuantity(productId, parseInt(input.value) + 1);
      });
    });

    container.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', () => {
        this.updateCartItemQuantity(input.dataset.productId, input.value);
      });
    });

    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Remove this item from cart?')) {
          this.removeFromCart(btn.dataset.productId);
        }
      });
    });
  }

  // ============================================
  // Checkout & Orders
  // ============================================

  renderOrderTypes() {
    const select = document.getElementById('orderType');
    select.innerHTML = '<option value="">Select order type</option>';
    shopContent.orderTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type.value;
      option.textContent = type.label;
      select.appendChild(option);
    });
  }

  renderPaymentMethods() {
    const select = document.getElementById('paymentMethod');
    select.innerHTML = '<option value="">Select payment method</option>';
    shopContent.paymentMethods.forEach(method => {
      const option = document.createElement('option');
      option.value = method.value;
      option.textContent = method.label;
      select.appendChild(option);
    });
  }

  renderCheckout() {
    const container = document.getElementById('cartContent');

    // This will be handled by switching sections
    const form = document.getElementById('checkoutForm');
    form.reset();
    this.updateOrderSummary();
  }

  updateOrderSummary() {
    const summary = document.getElementById('summaryItems');
    summary.innerHTML = '';

    this.cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'summary-item';
      div.innerHTML = `
        <span>${item.name} x ${item.quantity}</span>
        <span>RM ${(item.price * item.quantity).toFixed(2)}</span>
      `;
      summary.appendChild(div);
    });

    document.getElementById('summaryTotal').textContent = this.getCartTotal().toFixed(2);
  }

  placeOrder() {
    // Get form data
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const orderType = document.getElementById('orderType').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const notes = document.getElementById('specialNotes').value.trim();

    // Validation
    if (!name || !phone || !orderType || !paymentMethod) {
      alert('Please fill in all required fields');
      return false;
    }

    if (this.cart.length === 0) {
      alert('Your cart is empty');
      return false;
    }

    // Create order
    const orderNumber = `#${String(this.currentOrderNumber).padStart(3, '0')}`;

    const order = {
      orderNumber: orderNumber,
      customerName: name,
      customerPhone: phone,
      orderType: orderType,
      paymentMethod: paymentMethod,
      notes: notes,
      items: JSON.parse(JSON.stringify(this.cart)),
      totalAmount: this.getCartTotal(),
      status: 'NEW',
      dateCreated: new Date().toISOString()
    };

    // Save order
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.currentOrderNumber++;

    // Show confirmation
    this.showOrderConfirmation(orderNumber, order.status);

    // Clear cart
    this.cart = [];
    this.updateCartCount();

    return true;
  }

  showOrderConfirmation(orderNumber, status) {
    document.getElementById('orderNumber').textContent = orderNumber;
    this.switchSection('confirmation');
  }

  // ============================================
  // Order Tracking
  // ============================================

  searchOrder() {
    const orderNumber = document.getElementById('trackingOrderNumber').value.trim();

    if (!orderNumber) {
      alert('Please enter an order number');
      return;
    }

    const order = this.orders.find(o => o.orderNumber.toLowerCase() === orderNumber.toLowerCase());

    if (!order) {
      this.showOrderNotFound();
      return;
    }

    this.displayOrderTracking(order);
  }

  displayOrderTracking(order) {
    document.getElementById('trackingOrderNum').textContent = `Order ${order.orderNumber}`;
    document.getElementById('trackingCustomerName').textContent = `Customer: ${order.customerName}`;

    const date = new Date(order.dateCreated);
    document.getElementById('trackingOrderDate').textContent = `Date: ${date.toLocaleDateString('en-MY')}`;

    // Update status timeline
    document.querySelectorAll('.status-step').forEach(step => {
      step.classList.remove('active', 'completed');
      const status = step.dataset.status;
      const statuses = shopContent.orderStatus;
      const currentStatusIndex = statuses.indexOf(order.status);
      const stepStatusIndex = statuses.indexOf(status);

      if (stepStatusIndex <= currentStatusIndex) {
        step.classList.add('completed');
        if (stepStatusIndex === currentStatusIndex) {
          step.classList.add('active');
        }
      }
    });

    // Display items
    const itemsHTML = order.items.map(item => `
      <div class="tracking-item">
        <span>${item.name} x ${item.quantity}</span>
        <span>RM ${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');
    document.getElementById('trackingOrderItems').innerHTML = itemsHTML;

    // Display total
    document.getElementById('trackingTotalAmount').textContent = order.totalAmount.toFixed(2);

    // Show result
    document.getElementById('trackingResult').classList.remove('hidden');
    document.getElementById('orderNotFound').classList.add('hidden');
  }

  showOrderNotFound() {
    document.getElementById('trackingResult').classList.remove('hidden');
    document.getElementById('orderNotFound').classList.remove('hidden');
  }

  // ============================================
  // UI Navigation
  // ============================================

  switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(`${sectionName}-section`);
    if (section) {
      section.classList.add('active');
      window.scrollTo(0, 0);
    }

    // Update active nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.section === sectionName) {
        btn.classList.add('active');
      }
    });

    // Special handling for cart and checkout
    if (sectionName === 'cart') {
      this.renderCart();
    } else if (sectionName === 'checkout') {
      if (this.cart.length === 0) {
        alert('Your cart is empty. Please add items first.');
        this.switchSection('browse');
        return;
      }
      this.renderCheckout();
    }
  }

  // ============================================
  // Utilities
  // ============================================

  showNotification(message) {
    // Simple notification (can be enhanced)
    console.log('Notification:', message);
  }

  setupEventListeners() {
    // Navigation buttons - Use event delegation for dynamically created buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-section]');
      if (btn) {
        e.preventDefault();
        this.switchSection(btn.dataset.section);
      }
    });

    // Cart button
    document.getElementById('cartBtn').addEventListener('click', () => {
      this.switchSection('cart');
    });

    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    document.getElementById('placeOrderBtn').addEventListener('click', () => {
      if (this.placeOrder()) {
        // Order placed successfully
      }
    });

    // Order tracking
    document.getElementById('searchOrderBtn').addEventListener('click', () => {
      this.searchOrder();
    });

    document.getElementById('trackingOrderNumber').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.searchOrder();
      }
    });

    document.getElementById('tryAgainBtn').addEventListener('click', () => {
      document.getElementById('trackingOrderNumber').value = '';
      document.getElementById('trackingOrderNumber').focus();
      document.getElementById('trackingResult').classList.add('hidden');
    });
  }
}

// ============================================
// Initialize App
// ============================================

let shop;

document.addEventListener('DOMContentLoaded', () => {
  shop = new PetsShop();
});
