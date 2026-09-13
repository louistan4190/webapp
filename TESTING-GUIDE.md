# 🧪 Testing Guide - Customer & Staff System

## 🚀 How to Preview Both Pages

### Local Server Running
Server is currently running on: **http://localhost:8080**

### Access the Pages
- **Customer Page**: http://localhost:8080
- **Staff Page**: http://localhost:8080/staff.html

---

## 📋 Full User Journey Test

### Step 1: Open Customer Page (First Tab)
1. Open browser to: `http://localhost:8080`
2. You should see:
   - Header with "🐾 Pawsome Pets Shop"
   - "Shop", "Track Order", and "🛒 Cart 0" buttons
   - Browse Products section with product grid
   - Category filter buttons

✅ **Verify**: All sections load, no errors in console

---

### Step 2: Browse Products on Customer Page
1. Click different category buttons (Dog Food, Cat Food, Toys, etc.)
2. You should see products filtered by category
3. Hover over a product card
4. Verify you can see:
   - Product image
   - Product name
   - Description
   - Price in RM
   - Add to Cart button with quantity selector

✅ **Verify**: Categories filter correctly, all product info displays

---

### Step 3: Add Products to Cart
1. Select "Dog Food" category
2. Find "Premium Dog Kibble" (RM 45.99)
3. Change quantity to "2"
4. Click "Add" button
5. Verify cart count changes from "0" to "2"
6. Add another product:
   - Select "Cat Food" category
   - Click "Add" on "Premium Cat Dry Food" (keep qty 1)
   - Cart should show "3" total items

✅ **Verify**: 
- Cart count updates
- Message confirms product added
- Products added successfully

---

### Step 4: View Shopping Cart
1. Click 🛒 Cart button
2. You should see:
   - List of added products
   - Quantities for each product
   - Total amount (should be: 45.99 × 2 + 39.99 × 1 = RM 131.97)
   - "Proceed to Checkout" button

3. Test quantity controls:
   - Click "+" button on first item → quantity increases
   - Click "−" button → quantity decreases
   - Change quantity in input field
   - Cart total updates automatically

✅ **Verify**: 
- All items display correctly
- Quantities update
- Total calculates accurately
- Cart summary shows correct amount

---

### Step 5: Checkout
1. Click "Proceed to Checkout" button
2. Fill the form:
   - **Name**: Ahmad Jamaludin
   - **Phone**: +601234567890
   - **Order Type**: Select "Delivery"
   - **Payment Method**: Select "Credit Card"
   - **Special Notes** (optional): "Please ring the bell"
3. Verify Order Summary on right shows:
   - All items
   - Quantities
   - Correct total (RM 131.97)
4. Click "Place Order"

✅ **Verify**:
- Form validates (required fields checked)
- Order summary matches cart
- Total is correct

---

### Step 6: Order Confirmation (Customer)
1. After placing order, you should see:
   - ✓ Success icon (large checkmark)
   - "Order Placed Successfully!"
   - **Order Number**: Should be #001 (or next number if orders exist)
   - Status: "NEW"
   - Message: "Your order has been received..."
   - Buttons: "Track Your Order", "Continue Shopping"

2. Note the order number (e.g., #001)

✅ **Verify**:
- Order number generated correctly (#001 format)
- Status shows as "NEW"
- Confirmation message displays

---

### Step 7: Open Staff Page (Second Tab)
1. Open new browser tab
2. Go to: `http://localhost:8080/staff.html`
3. You should see:
   - **Login Screen** with purple gradient background
   - 🔐 Lock icon
   - "Staff Access" title
   - "Enter your PIN to access..."
   - PIN input field
   - "Login" button
   - Demo PIN hint: "1234"

✅ **Verify**: 
- Login screen shows
- NO order data visible
- Customer information hidden

---

### Step 8: Test Staff Login - Wrong PIN
1. Enter wrong PIN: `9999`
2. Click "Login" button
3. You should see:
   - Error message: "Incorrect PIN. Please try again."
   - PIN input clears
   - Order board still hidden

✅ **Verify**:
- Wrong PIN rejected
- Error message shows
- No order data exposed

---

### Step 9: Staff Login - Correct PIN
1. Enter correct PIN: `1234`
2. Click "Login" button
3. You should see:
   - Login screen disappears
   - Staff header appears with "🐾 Staff Order Dashboard"
   - **Logout button** (red button, top right)
   - **Kanban Board** with 4 columns:
     - 🆕 NEW (with order count badge)
     - 👨‍🍳 PREPARING
     - ✅ READY
     - ✔️ COMPLETED

✅ **Verify**:
- Correct PIN opens staff board
- Order data now visible
- All 4 columns display
- NEW column shows count "1" (the order placed in Step 6)

---

### Step 10: View Customer Order on Staff Board
1. Look at the **NEW** column
2. You should see the order card with:
   - **Order Number**: #001
   - **Customer Name**: Ahmad Jamaludin
   - **Phone**: 📞 +601234567890
   - **Items**:
     - Premium Dog Kibble x2 = RM 91.98
     - Premium Cat Dry Food x1 = RM 39.99
   - **Total**: RM 131.97
   - **Payment**: Credit Card

✅ **Verify**:
- Customer order appears in NEW column
- All order details match customer checkout
- Items and total are correct

---

### Step 11: Staff Updates Order Status (Drag & Drop)
1. On the order card in NEW column:
   - Try to drag the order card
   - Drag it to the **PREPARING** column
   - Card should move to new column

2. The **NEW** column count should become "0"
3. The **PREPARING** column count should become "1"

✅ **Verify**:
- Card can be dragged
- Card moves between columns
- Column counts update automatically

---

### Step 12: Continue Status Updates
1. Drag the order from **PREPARING** → **READY**
2. Drag the order from **READY** → **COMPLETED**
3. Verify counts update:
   - PREPARING: 0
   - READY: 0
   - COMPLETED: 1

✅ **Verify**:
- Status progression works: NEW → PREPARING → READY → COMPLETED
- All count badges update
- Order moves smoothly between columns

---

### Step 13: Customer Page Reflects Status Change
1. Go back to **Customer Page tab** (first tab)
2. Click "Track Order" button
3. Enter order number: `#001` (or whatever was displayed)
4. Click "Search" or press Enter
5. You should see:
   - Order #001
   - Customer: Ahmad Jamaludin
   - Order details
   - **Status Timeline** showing:
     - NEW ✓ (completed)
     - PREPARING ✓ (completed)
     - READY ✓ (completed)
     - COMPLETED → (current status, highlighted)

✅ **Verify**:
- Customer tracking shows same order
- Status matches what staff set (COMPLETED)
- Status timeline updated correctly
- Both pages sync automatically

---

### Step 14: Verify Customer Functions Still Work
1. Click "Shop" button to go back to products
2. Add more products to cart
3. Verify:
   - Products still browse normally
   - Cart still works
   - All customer features intact

✅ **Verify**: Customer page functionality not broken

---

### Step 15: Test Staff Logout
1. Go back to Staff Page tab
2. Click "Logout" button (red button, top right)
3. You should see:
   - Staff dashboard disappears
   - Login screen appears again
   - PIN input is empty
   - Order data hidden

✅ **Verify**:
- Logout works
- Login screen shown again
- No order data visible without login

---

## ✅ All Tests Checklist

### Customer Page
- [ ] Products display correctly
- [ ] Categories filter correctly
- [ ] Add to cart works
- [ ] Cart count updates
- [ ] Quantity controls work
- [ ] Cart total accurate
- [ ] Checkout form validates
- [ ] Order number generated
- [ ] Status shows "NEW"
- [ ] Confirmation displays
- [ ] Order tracking works
- [ ] Existing features not broken

### Staff Page
- [ ] Login screen shows by default
- [ ] Wrong PIN rejected
- [ ] Correct PIN (1234) opens board
- [ ] Order board displays
- [ ] 4 columns visible (NEW, PREPARING, READY, COMPLETED)
- [ ] Customer orders appear
- [ ] Order details correct
- [ ] Can drag orders between columns
- [ ] Column counts update
- [ ] Status progression works
- [ ] Logout works

### Integration
- [ ] Customer orders appear on staff page
- [ ] Order details match
- [ ] Staff status changes sync to customer
- [ ] Customer tracking shows updated status
- [ ] Both pages use same order data
- [ ] No fake orders
- [ ] Real-time sync works

---

## 🔍 Browser Console Check

1. Open Developer Tools (F12 or Ctrl+Shift+I)
2. Go to **Console** tab
3. There should be **no red errors**
4. Create an order on customer page
5. Go to staff page
6. New order should appear within 3 seconds (polling interval)

---

## 📁 File Reference

| File | Purpose |
|------|---------|
| **index.html** | Customer ordering page |
| **staff.html** | Staff order management page |
| **script.js** | Customer-side JavaScript |
| **staff.js** | Staff-side JavaScript |
| **style.css** | Shared styling for both pages |
| **content.js** | Shared business data |

---

## 🔐 Security Note

This is a **demo/workshop PIN system** only. The PIN 1234:
- Is simple and visible in code
- Provides basic access control
- Is NOT suitable for production
- Does NOT encrypt order data
- Is for demonstration purposes only

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Staff page won't open | Check URL is http://localhost:8080/staff.html |
| Orders not showing on staff board | Refresh page, wait 3 seconds, or create new order |
| Status change doesn't sync | Orders sync every 3 seconds, try refreshing customer page |
| Drag & drop not working | Use browser that supports HTML5 drag & drop (all modern browsers) |
| Cart empty after refresh | Orders save in browser localStorage (persist across sessions) |

---

## 📊 What's Working

✅ Both pages load correctly
✅ Customer ordering flow complete
✅ Staff login with PIN
✅ Kanban board display
✅ Drag & drop status updates
✅ Real-time sync between pages
✅ Order data persistence
✅ All calculations accurate
✅ Responsive mobile design
✅ Professional UI

---

## 🎯 Ready for Review

The system is fully functional and ready for review. Both the customer page and staff page are working with complete integration and real-time synchronization.

**No deployment yet - waiting for your feedback!**
