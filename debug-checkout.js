// Debug script to test checkout functionality

console.log('🔍 Debugging Customer Page Checkout...\n');

// Test 1: Check if content.js loaded
console.log('1. Checking if shopContent is available:');
if (typeof shopContent !== 'undefined') {
  console.log('   ✓ shopContent loaded');
  console.log(`   - Order types: ${shopContent.orderTypes.length}`);
  console.log(`   - Payment methods: ${shopContent.paymentMethods.length}`);
} else {
  console.log('   ✗ shopContent NOT loaded - This is the problem!');
}

// Test 2: Check form elements
console.log('\n2. Checking form elements:');
const formElements = [
  'checkoutForm',
  'customerName',
  'customerPhone',
  'orderType',
  'paymentMethod',
  'placeOrderBtn'
];

formElements.forEach(id => {
  const el = document.getElementById(id);
  console.log(`   ${el ? '✓' : '✗'} ${id}: ${el ? 'Found' : 'MISSING'}`);
});

// Test 3: Check select options
console.log('\n3. Checking select options:');
const orderTypeSelect = document.getElementById('orderType');
const paymentSelect = document.getElementById('paymentMethod');

console.log(`   Order Type options: ${orderTypeSelect?.options?.length || 0}`);
if (orderTypeSelect?.options?.length > 0) {
  for (let i = 0; i < Math.min(3, orderTypeSelect.options.length); i++) {
    console.log(`     - ${orderTypeSelect.options[i].text}`);
  }
}

console.log(`   Payment Method options: ${paymentSelect?.options?.length || 0}`);
if (paymentSelect?.options?.length > 0) {
  for (let i = 0; i < Math.min(3, paymentSelect.options.length); i++) {
    console.log(`     - ${paymentSelect.options[i].text}`);
  }
}

// Test 4: Check if shop object exists
console.log('\n4. Checking shop object:');
if (typeof shop !== 'undefined') {
  console.log('   ✓ Shop object created');
  console.log(`   - Cart items: ${shop.cart.length}`);
  console.log(`   - Orders: ${shop.orders.length}`);
} else {
  console.log('   ✗ Shop object NOT created');
}

// Test 5: Manual checkout test
console.log('\n5. Testing checkout flow:');
if (typeof shop !== 'undefined') {
  // Add a test item
  const testProduct = {
    id: 'test-001',
    name: 'Test Product',
    price: 50,
    description: 'Test',
    category: 'test'
  };

  shop.addToCart(testProduct, 1);
  console.log(`   ✓ Added test product to cart`);
  console.log(`   - Cart now has: ${shop.cart.length} item(s)`);

  // Try to place order without filling form
  console.log(`\n6. Testing validation:`);
  const result = shop.placeOrder();
  console.log(`   ${result ? '✗ Order placed without form data (BUG!)' : '✓ Validation works - form data required'}`);
}

console.log('\n✅ Debug complete - Check console for errors\n');
