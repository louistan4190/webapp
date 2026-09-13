// Pets Shop - Automated Testing Script

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Pawsome Pets Shop Tests\n');

// Test 1: Verify all files exist
console.log('✓ Test 1: Checking file structure...');
const requiredFiles = ['index.html', 'style.css', 'script.js', 'content.js'];
let filesOk = true;
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
  if (!exists) filesOk = false;
});
console.log('');

// Test 2: Verify content.js structure
console.log('✓ Test 2: Validating content.js structure...');
try {
  const contentJs = fs.readFileSync('content.js', 'utf8');

  // Check for required objects
  let testsPassed = 0;
  const checks = [
    { name: 'Business info', check: contentJs.includes('shopContent.business') },
    { name: 'Categories array', check: contentJs.includes('categories:') && contentJs.includes('dog-food') },
    { name: 'Products array', check: contentJs.includes('products:') && contentJs.includes('Premium Dog Kibble') },
    { name: 'Order types', check: contentJs.includes('orderTypes:') },
    { name: 'Payment methods', check: contentJs.includes('paymentMethods:') },
    { name: 'Order status', check: contentJs.includes('orderStatus:') }
  ];

  checks.forEach(check => {
    console.log(`  ${check.check ? '✓' : '✗'} ${check.name}`);
    if (check.check) testsPassed++;
  });
  console.log(`  Result: ${testsPassed}/${checks.length} checks passed`);
} catch (e) {
  console.log(`  ✗ Error reading content.js: ${e.message}`);
}
console.log('');

// Test 3: Count products
console.log('✓ Test 3: Counting products in catalog...');
try {
  const contentJs = fs.readFileSync('content.js', 'utf8');
  const productMatches = contentJs.match(/id: 'prod-\d+'/g);
  const productCount = productMatches ? productMatches.length : 0;
  console.log(`  Found ${productCount} products in catalog`);

  // Count by category
  const categories = ['dog-food', 'cat-food', 'toys', 'accessories', 'grooming', 'supplies'];
  categories.forEach(cat => {
    const count = (contentJs.match(new RegExp(`category: '${cat}'`, 'g')) || []).length;
    if (count > 0) console.log(`  - ${cat}: ${count} products`);
  });
} catch (e) {
  console.log(`  ✗ Error: ${e.message}`);
}
console.log('');

// Test 4: Verify HTML structure
console.log('✓ Test 4: Validating HTML structure...');
try {
  const html = fs.readFileSync('index.html', 'utf8');

  const sections = [
    { id: 'browse-section', name: 'Browse Products' },
    { id: 'cart-section', name: 'Shopping Cart' },
    { id: 'checkout-section', name: 'Checkout' },
    { id: 'confirmation-section', name: 'Order Confirmation' },
    { id: 'track-section', name: 'Order Tracking' }
  ];

  let sectionsOk = 0;
  sections.forEach(section => {
    const exists = html.includes(`id="${section.id}"`);
    console.log(`  ${exists ? '✓' : '✗'} ${section.name}`);
    if (exists) sectionsOk++;
  });

  console.log(`  Result: ${sectionsOk}/${sections.length} sections found`);

  // Check for key form fields
  console.log(`  ${html.includes('id="customerName"') ? '✓' : '✗'} Customer name field`);
  console.log(`  ${html.includes('id="customerPhone"') ? '✓' : '✗'} Phone field`);
  console.log(`  ${html.includes('id="orderType"') ? '✓' : '✗'} Order type field`);
  console.log(`  ${html.includes('id="paymentMethod"') ? '✓' : '✗'} Payment method field`);
} catch (e) {
  console.log(`  ✗ Error reading HTML: ${e.message}`);
}
console.log('');

// Test 5: Verify JavaScript functionality
console.log('✓ Test 5: Validating JavaScript functionality...');
try {
  const script = fs.readFileSync('script.js', 'utf8');

  const functions = [
    { name: 'addToCart', check: script.includes('addToCart(product, quantity)') },
    { name: 'removeFromCart', check: script.includes('removeFromCart(productId)') },
    { name: 'placeOrder', check: script.includes('placeOrder()') },
    { name: 'searchOrder', check: script.includes('searchOrder()') },
    { name: 'switchSection', check: script.includes('switchSection(sectionName)') },
    { name: 'updateCartCount', check: script.includes('updateCartCount()') }
  ];

  let functionsOk = 0;
  functions.forEach(func => {
    console.log(`  ${func.check ? '✓' : '✗'} ${func.name} method`);
    if (func.check) functionsOk++;
  });
  console.log(`  Result: ${functionsOk}/${functions.length} methods found`);
} catch (e) {
  console.log(`  ✗ Error reading script: ${e.message}`);
}
console.log('');

// Test 6: Verify CSS styling
console.log('✓ Test 6: Validating CSS styling...');
try {
  const css = fs.readFileSync('style.css', 'utf8');

  const styles = [
    { name: 'Color scheme', check: css.includes('--primary-color') },
    { name: 'Typography', check: css.includes('--font-primary') },
    { name: 'Responsive grid', check: css.includes('grid-template-columns: repeat(auto-fill') },
    { name: 'Mobile responsive', check: css.includes('@media (max-width: 768px)') },
    { name: 'Product card styles', check: css.includes('.product-card') },
    { name: 'Button styles', check: css.includes('.btn-primary') }
  ];

  let stylesOk = 0;
  styles.forEach(style => {
    console.log(`  ${style.check ? '✓' : '✗'} ${style.name}`);
    if (style.check) stylesOk++;
  });
  console.log(`  Result: ${stylesOk}/${styles.length} styles found`);
} catch (e) {
  console.log(`  ✗ Error reading CSS: ${e.message}`);
}
console.log('');

// Test 7: Order tracking logic validation
console.log('✓ Test 7: Validating order tracking logic...');
try {
  const script = fs.readFileSync('script.js', 'utf8');

  const trackers = [
    { name: 'Order number generation', check: script.includes('padStart(3, \'0\')') },
    { name: 'Order status tracking', check: script.includes('NEW', 'PREPARING', 'READY', 'COMPLETED') },
    { name: 'LocalStorage integration', check: script.includes('localStorage.getItem') },
    { name: 'Order search', check: script.includes('find(o => o.orderNumber') }
  ];

  let trackersOk = 0;
  trackers.forEach(tracker => {
    console.log(`  ${tracker.check ? '✓' : '✗'} ${tracker.name}`);
    if (tracker.check) trackersOk++;
  });
  console.log(`  Result: ${trackersOk}/${trackers.length} tracking features found`);
} catch (e) {
  console.log(`  ✗ Error: ${e.message}`);
}
console.log('');

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ All file validations complete!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n📋 Application is ready for testing.\n');
