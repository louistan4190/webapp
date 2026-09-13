// Staff Order Management System

const STAFF_PIN = '1234';
let isLoggedIn = false;
let orders = [];
let draggedOrderId = null;

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadOrders();
});

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
  // Login
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
  document.getElementById('pinInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);

  // Kanban card drag events
  document.addEventListener('dragstart', handleDragStart, true);
  document.addEventListener('dragend', handleDragEnd, true);
  document.addEventListener('dragover', handleDragOver, true);
  document.addEventListener('drop', handleDrop, true);
  document.addEventListener('dragenter', handleDragEnter, true);
  document.addEventListener('dragleave', handleDragLeave, true);
}

// ============================================
// Login & Logout
// ============================================

function handleLogin() {
  const pin = document.getElementById('pinInput').value;
  const errorMessage = document.getElementById('errorMessage');

  if (pin === STAFF_PIN) {
    isLoggedIn = true;
    errorMessage.classList.remove('show');

    // Show staff dashboard
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('staffHeader').style.display = 'block';
    document.getElementById('kanbanBoard').classList.add('active');

    // Load and display orders
    loadOrders();
    renderKanbanBoard();

    document.getElementById('pinInput').value = '';
  } else {
    errorMessage.classList.add('show');
    document.getElementById('pinInput').value = '';
    document.getElementById('pinInput').focus();
  }
}

function handleLogout() {
  isLoggedIn = false;

  // Show login screen
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('staffHeader').style.display = 'none';
  document.getElementById('kanbanBoard').classList.remove('active');

  // Clear form
  document.getElementById('pinInput').value = '';
  document.getElementById('errorMessage').classList.remove('show');
  document.getElementById('pinInput').focus();
}

// ============================================
// Order Management
// ============================================

function loadOrders() {
  const stored = localStorage.getItem('orders');
  orders = stored ? JSON.parse(stored) : [];
}

function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function getOrdersByStatus(status) {
  return orders.filter(order => order.status === status);
}

function updateOrderStatus(orderNumber, newStatus) {
  const order = orders.find(o => o.orderNumber === orderNumber);
  if (order) {
    order.status = newStatus;
    saveOrders();
    return true;
  }
  return false;
}

// ============================================
// Kanban Board Rendering
// ============================================

function renderKanbanBoard() {
  const statuses = shopContent.orderStatus;

  statuses.forEach(status => {
    const column = document.getElementById(`column-${status}`);
    const countBadge = document.getElementById(`count-${status}`);
    const ordersForStatus = getOrdersByStatus(status);

    // Update count
    countBadge.textContent = ordersForStatus.length;

    // Clear column
    column.innerHTML = '';

    if (ordersForStatus.length === 0) {
      column.innerHTML = '<div class="empty-column">No orders</div>';
      return;
    }

    // Add order cards
    ordersForStatus.forEach(order => {
      const card = createOrderCard(order);
      column.appendChild(card);
    });
  });
}

function createOrderCard(order) {
  const card = document.createElement('div');
  card.className = 'order-card';
  card.draggable = true;
  card.dataset.orderId = order.orderNumber;
  card.dataset.status = order.status;

  // Format date
  const orderDate = new Date(order.dateCreated);
  const timeStr = orderDate.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Format items
  const itemsHtml = order.items.map(item => `
    <div class="order-item">
      <span>${item.name} x${item.quantity}</span>
      <span>RM ${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');

  // Format payment method
  const paymentLabel = shopContent.paymentMethods.find(m => m.value === order.paymentMethod)?.label || order.paymentMethod;

  card.innerHTML = `
    <div class="order-number">${order.orderNumber}</div>
    <div class="order-customer">${order.customerName}</div>
    <div class="order-phone">📞 ${order.customerPhone}</div>

    <div class="order-items">
      ${itemsHtml}
    </div>

    <div class="order-footer">
      <div class="order-total">RM ${order.totalAmount.toFixed(2)}</div>
      <div class="order-payment">${paymentLabel}</div>
    </div>
  `;

  return card;
}

// ============================================
// Drag & Drop
// ============================================

function handleDragStart(e) {
  if (!e.target.classList.contains('order-card')) return;

  draggedOrderId = e.target.dataset.orderId;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragEnd(e) {
  if (!e.target.classList.contains('order-card')) return;

  e.target.classList.remove('dragging');
  document.querySelectorAll('.kanban-cards').forEach(col => {
    col.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (!e.target.classList.contains('kanban-cards')) return;
  e.target.classList.add('drag-over');
}

function handleDragLeave(e) {
  if (!e.target.classList.contains('kanban-cards')) return;
  e.target.classList.remove('drag-over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  const column = e.target.closest('.kanban-cards');
  if (!column || !draggedOrderId) return;

  const newStatus = column.dataset.status;
  const oldStatus = document.querySelector(`[data-order-id="${draggedOrderId}"]`)?.dataset.status;

  if (newStatus && newStatus !== oldStatus) {
    // Update order status
    if (updateOrderStatus(draggedOrderId, newStatus)) {
      // Re-render the board
      renderKanbanBoard();
    }
  }

  draggedOrderId = null;
  column.classList.remove('drag-over');
  return false;
}

// ============================================
// Polling for New Orders
// ============================================

// Refresh orders every 3 seconds to catch new orders from customer page
setInterval(() => {
  if (isLoggedIn) {
    const prevCount = orders.length;
    loadOrders();

    // Re-render if orders changed
    if (orders.length !== prevCount) {
      renderKanbanBoard();
    }
  }
}, 3000);
