/* ============================================
   SHOPORA - Cart, Wishlist, Checkout, Orders
   All cart/checkout/order logic
   ============================================ */

/* ---------- CART ---------- */
function getCart() {
  return JSON.parse(localStorage.getItem("shopora-cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("shopora-cart", JSON.stringify(cart));
  updateCartBadges();
}

function addToCartById(productId, qty) {
  let cart = getCart();
  const quantity = qty || 1;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }
  saveCart(cart);
  showToast("Added to cart!", "success");
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCartPage();
  showToast("Removed from cart", "error");
}

function updateCartQuantity(productId, quantity) {
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
  renderCartPage();
}

function increaseCartQuantity(productId) {
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += 1;
  }
  saveCart(cart);
  renderCartPage();
}

function decreaseCartQuantity(productId) {
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
  saveCart(cart);
  renderCartPage();
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

function getCartSavings() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product ? (product.oldPrice - product.price) * item.quantity : 0);
  }, 0);
}

function renderCartPage() {
  const container = document.getElementById("cartContent");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-state-icon">&#128722;</div>' +
        '<h2>Your cart is empty</h2>' +
        '<p>Looks like you haven\'t added anything to your cart yet.</p>' +
        '<a href="' + getProductsURL() + '" class="btn btn-primary">Start Shopping</a>' +
      '</div>';
    return;
  }

  let itemsHTML = "";
  let subtotal = 0;
  let totalSavings = 0;

  cart.forEach(item => {
    const product = getProductById(item.id);
    if (!product) return;
    const itemTotal = product.price * item.quantity;
    const savings = (product.oldPrice - product.price) * item.quantity;
    subtotal += itemTotal;
    totalSavings += savings;

    itemsHTML +=
      '<div class="cart-item">' +
        '<div class="cart-item-image">' +
          '<img src="' + product.image + '" alt="' + product.name + '">' +
        '</div>' +
        '<div class="cart-item-info">' +
          '<h3><a href="' + getProductURL(product.id) + '">' + product.name + '</a></h3>' +
          '<p class="cart-item-category">' + product.category + '</p>' +
          '<p class="cart-item-price">' + formatPrice(product.price) + '</p>' +
        '</div>' +
        '<div class="cart-item-actions">' +
          '<div class="quantity-selector">' +
            '<button onclick="decreaseCartQuantity(' + product.id + ')">-</button>' +
            '<input type="number" value="' + item.quantity + '" min="1" max="99" onchange="updateCartQuantity(' + product.id + ', parseInt(this.value))">' +
            '<button onclick="increaseCartQuantity(' + product.id + ')">+</button>' +
          '</div>' +
          '<button class="cart-item-remove" onclick="removeFromCart(' + product.id + ')" title="Remove">&#10005;</button>' +
        '</div>' +
      '</div>';
  });

  const deliveryCharge = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + deliveryCharge;

  const summaryHTML =
    '<div class="cart-summary">' +
      '<h2>Order Summary</h2>' +
      '<div class="cart-summary-row"><span>Subtotal (' + cart.reduce((s, i) => s + i.quantity, 0) + ' items)</span><span>' + formatPrice(subtotal) + '</span></div>' +
      (totalSavings > 0 ? '<div class="cart-summary-row" style="color:var(--success)"><span>You Save</span><span>-' + formatPrice(totalSavings) + '</span></div>' : '') +
      '<div class="cart-summary-row"><span>Delivery</span><span>' + (deliveryCharge === 0 ? '<span style="color:var(--success)">Free</span>' : formatPrice(deliveryCharge)) + '</span></div>' +
      (subtotal < 50 ? '<div class="cart-summary-row" style="font-size:0.8rem;color:var(--text-tertiary)"><span>Add ' + formatPrice(50 - subtotal) + ' more for free shipping</span></div>' : '') +
      '<div class="cart-summary-row total"><span>Total</span><span>' + formatPrice(total) + '</span></div>' +
      '<a href="' + getCheckoutURL() + '" class="btn btn-primary btn-block" style="margin-top:20px">Proceed to Checkout</a>' +
      '<a href="' + getProductsURL() + '" class="btn btn-outline btn-block" style="margin-top:10px">Continue Shopping</a>' +
    '</div>';

  container.innerHTML = '<div class="cart-items">' + itemsHTML + '</div>' + summaryHTML;
}

/* ---------- WISHLIST ---------- */
function getWishlist() {
  return JSON.parse(localStorage.getItem("shopora-wishlist") || "[]");
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem("shopora-wishlist", JSON.stringify(wishlist));
  updateWishlistBadges();
  renderWishlistPage();
  showToast("Removed from wishlist", "error");
}

function renderWishlistPage() {
  const container = document.getElementById("wishlistContent");
  if (!container) return;

  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-state-icon">&#9829;</div>' +
        '<h2>Your wishlist is empty</h2>' +
        '<p>Save items you love to your wishlist and come back anytime.</p>' +
        '<a href="' + getProductsURL() + '" class="btn btn-primary">Discover Products</a>' +
      '</div>';
    return;
  }

  let html = "";
  wishlist.forEach(id => {
    const product = getProductById(id);
    if (!product) return;
    html += buildProductCard(product);
  });

  container.innerHTML = '<div class="product-grid">' + html + '</div>';
}

/* ---------- CHECKOUT ---------- */
function renderCheckoutSummary() {
  const container = document.getElementById("checkoutItems");
  const summaryEl = document.getElementById("checkoutSummary");
  if (!container || !summaryEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = '<p style="padding:20px;color:var(--text-secondary)">No items in cart.</p>';
    return;
  }

  let html = "";
  let subtotal = 0;

  cart.forEach(item => {
    const product = getProductById(item.id);
    if (!product) return;
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;

    html +=
      '<div class="order-summary-item">' +
        '<img src="' + product.image + '" alt="' + product.name + '">' +
        '<div class="order-summary-item-info">' +
          '<h4>' + product.name + '</h4>' +
          '<p>Qty: ' + item.quantity + '</p>' +
        '</div>' +
        '<span class="price">' + formatPrice(itemTotal) + '</span>' +
      '</div>';
  });

  container.innerHTML = html;

  const deliveryCharge = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + deliveryCharge;

  summaryEl.innerHTML =
    '<div class="cart-summary-row"><span>Subtotal</span><span>' + formatPrice(subtotal) + '</span></div>' +
    '<div class="cart-summary-row"><span>Delivery</span><span>' + (deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge)) + '</span></div>' +
    '<div class="cart-summary-row total"><span>Total</span><span>' + formatPrice(total) + '</span></div>';
}

function placeOrder(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();
  const address = form.querySelector('[name="address"]').value.trim();
  const city = form.querySelector('[name="city"]').value.trim();
  const state = form.querySelector('[name="state"]').value.trim();
  const pincode = form.querySelector('[name="pincode"]').value.trim();

  if (!name || !email || !phone || !address || !city || !state || !pincode) {
    showToast("Please fill in all fields", "error");
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty", "error");
    return;
  }

  // Build order
  let items = [];
  let subtotal = 0;
  cart.forEach(item => {
    const product = getProductById(item.id);
    if (product) {
      items.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        category: product.category
      });
      subtotal += product.price * item.quantity;
    }
  });

  const deliveryCharge = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + deliveryCharge;

  const paymentMethod = form.querySelector('input[name="payment"]:checked');
  const payment = paymentMethod ? paymentMethod.value : "cod";

  const statuses = ["Processing", "Shipped", "Delivered"];
  const randomStatus = statuses[Math.floor(Math.random() * 2)]; // Processing or Shipped

  const order = {
    id: "ORD-" + Date.now().toString(36).toUpperCase(),
    date: new Date().toISOString(),
    items: items,
    subtotal: subtotal,
    deliveryCharge: deliveryCharge,
    total: total,
    status: randomStatus,
    customer: { name, email, phone, address, city, state, pincode },
    payment: payment
  };

  // Save order
  let orders = JSON.parse(localStorage.getItem("shopora-orders") || "[]");
  orders.unshift(order);
  localStorage.setItem("shopora-orders", JSON.stringify(orders));

  // Clear cart
  localStorage.removeItem("shopora-cart");
  updateCartBadges();

  // Show confirmation
  const confirmContainer = document.getElementById("checkoutContainer");
  if (confirmContainer) {
    confirmContainer.innerHTML =
      '<div class="order-confirmation">' +
        '<div class="success-icon">&#10004;&#65039;</div>' +
        '<h1>Order Placed Successfully!</h1>' +
        '<p>Thank you ' + name + '! Your order <strong>' + order.id + '</strong> has been placed.</p>' +
        '<p>A confirmation has been sent to ' + email + '</p>' +
        '<div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:20px">' +
          '<a href="' + getOrdersURL() + '" class="btn btn-primary">View Orders</a>' +
          '<a href="' + getProductsURL() + '" class="btn btn-outline">Continue Shopping</a>' +
        '</div>' +
      '</div>';
  }
}

/* ---------- ORDERS ---------- */
function renderOrdersPage() {
  const container = document.getElementById("ordersContent");
  if (!container) return;

  const orders = JSON.parse(localStorage.getItem("shopora-orders") || "[]");

  if (orders.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-state-icon">&#128230;</div>' +
        '<h2>No orders yet</h2>' +
        '<p>When you place an order, it will appear here.</p>' +
        '<a href="' + getProductsURL() + '" class="btn btn-primary">Start Shopping</a>' +
      '</div>';
    return;
  }

  let html = "";
  orders.forEach(order => {
    const date = new Date(order.date);
    const dateStr = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    let itemsHTML = "";
    order.items.forEach(item => {
      itemsHTML +=
        '<div class="order-card-item">' +
          '<img src="' + item.image + '" alt="' + item.name + '">' +
          '<div class="order-card-item-info">' +
            '<h4>' + item.name + '</h4>' +
            '<p>Qty: ' + item.quantity + ' &times; ' + formatPrice(item.price) + '</p>' +
          '</div>' +
        '</div>';
    });

    let statusClass = "processing";
    if (order.status === "Delivered") statusClass = "delivered";
    else if (order.status === "Shipped") statusClass = "shipped";

    html +=
      '<div class="order-card">' +
        '<div class="order-card-header">' +
          '<div>' +
            '<span class="order-id">' + order.id + '</span>' +
            '<span class="order-date"> &middot; ' + dateStr + '</span>' +
          '</div>' +
          '<span class="order-status ' + statusClass + '">' + order.status + '</span>' +
        '</div>' +
        '<div class="order-card-body">' +
          '<div class="order-card-items">' + itemsHTML + '</div>' +
          '<div class="order-card-footer">' +
            '<span>Payment: ' + (order.payment === 'cod' ? 'Cash on Delivery' : order.payment === 'card' ? 'Credit/Debit Card' : 'UPI') + '</span>' +
            '<span class="order-total">Total: ' + formatPrice(order.total) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  });

  container.innerHTML = html;
}

/* ---------- Init Page-Specific Logic ---------- */
function initPageLogic() {
  const body = document.body;

  if (body.classList.contains("page-cart")) {
    renderCartPage();
  } else if (body.classList.contains("page-wishlist")) {
    renderWishlistPage();
  } else if (body.classList.contains("page-checkout")) {
    renderCheckoutSummary();
  } else if (body.classList.contains("page-orders")) {
    renderOrdersPage();
  }
}

document.addEventListener("DOMContentLoaded", initPageLogic);
