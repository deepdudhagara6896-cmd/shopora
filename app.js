/* ============================================
   SHOPORA - Main App Logic
   Navigation, Search, Dark Mode, Utilities
   ============================================ */

/* ---------- Dark Mode ---------- */
function initDarkMode() {
  const saved = localStorage.getItem("shopora-dark-mode");
  if (saved === "true") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("shopora-dark-mode", "false");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("shopora-dark-mode", "true");
  }
  updateDarkToggleIcon();
}

function updateDarkToggleIcon() {
  const btn = document.querySelector(".dark-toggle");
  if (!btn) return;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.innerHTML = isDark ? "&#9728;&#65039;" : "&#127769;";
  btn.title = isDark ? "Light Mode" : "Dark Mode";
}

/* ---------- Mobile Menu ---------- */
function openMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.add("active");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.remove("active");
}

/* ---------- Search ---------- */
function handleSearch(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("searchInput") || document.getElementById("mobileSearchInput");
  const query = input ? input.value.trim() : "";
  if (query) {
    const base = getBasePath();
    window.location.href = base + "pages/products.html?search=" + encodeURIComponent(query);
  }
}

/* ---------- Stars Helper ---------- */
function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3 ? 1 : 0;
  const empty = 5 - full - half;
  return "&#9733;".repeat(full) + (half ? "&#9734;" : "") + "&#9734;".repeat(empty);
}

/* ---------- Format Price ---------- */
function formatPrice(price) {
  return "$" + price.toFixed(2);
}

/* ---------- Toast Notification ---------- */
function showToast(message, type) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast " + (type || "success");
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ---------- Wishlist Count Update ---------- */
function getWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("shopora-wishlist") || "[]");
  return wishlist.length;
}

function updateWishlistBadges() {
  const count = getWishlistCount();
  document.querySelectorAll(".wishlist-count").forEach(badge => {
    badge.textContent = count || "";
    badge.style.display = count ? "flex" : "none";
  });
}

/* ---------- Cart Count Update ---------- */
function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("shopora-cart") || "[]");
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll(".cart-count").forEach(badge => {
    badge.textContent = count || "";
    badge.style.display = count ? "flex" : "none";
  });
}

/* ---------- Product Card HTML Builder ---------- */
function buildProductCard(product) {
  const wishlist = JSON.parse(localStorage.getItem("shopora-wishlist") || "[]");
  const isWishlisted = wishlist.includes(product.id);
  const imgSrc = product.image || "https://via.placeholder.com/400x400?text=No+Image";

  return '<div class="product-card" data-id="' + product.id + '">' +
    '<div class="product-card-image">' +
      '<a href="' + getProductURL(product.id) + '">' +
        '<img src="' + imgSrc + '" alt="' + product.name + '" loading="lazy">' +
      '</a>' +
      (product.discount ? '<div class="product-badge">-' + product.discount + '%</div>' : '') +
      '<div class="product-card-actions">' +
        '<button onclick="toggleWishlist(' + product.id + ', this)" class="' + (isWishlisted ? 'wishlisted' : '') + '" title="Wishlist">&#9829;</button>' +
        '<button onclick="addToCart(' + product.id + ')" title="Add to Cart">&#128722;</button>' +
      '</div>' +
    '</div>' +
    '<div class="product-card-info">' +
      '<div class="product-card-category">' + product.category + '</div>' +
      '<h3 class="product-card-name"><a href="' + getProductURL(product.id) + '">' + product.name + '</a></h3>' +
      '<div class="product-card-rating">' +
        '<span class="stars">' + getStars(product.rating) + '</span>' +
        '<span class="rating-count">(' + product.reviews.toLocaleString() + ')</span>' +
      '</div>' +
      '<div class="product-card-price">' +
        '<span class="current-price">' + formatPrice(product.price) + '</span>' +
        '<span class="original-price">' + formatPrice(product.oldPrice) + '</span>' +
        '<span class="discount-tag">-' + product.discount + '%</span>' +
      '</div>' +
      '<button class="btn btn-primary btn-sm" onclick="addToCart(' + product.id + ')">Add to Cart</button>' +
    '</div>' +
  '</div>';
}

/* ---------- Quick Add to Cart ---------- */
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("shopora-cart") || "[]");
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem("shopora-cart", JSON.stringify(cart));
  updateCartBadges();
  showToast("Added to cart!", "success");
}

/* ---------- Toggle Wishlist ---------- */
function toggleWishlist(productId, btnEl) {
  let wishlist = JSON.parse(localStorage.getItem("shopora-wishlist") || "[]");
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    if (btnEl) {
      btnEl.classList.remove("wishlisted");
    }
    showToast("Removed from wishlist", "error");
  } else {
    wishlist.push(productId);
    if (btnEl) {
      btnEl.classList.add("wishlisted");
    }
    showToast("Added to wishlist!", "success");
  }
  localStorage.setItem("shopora-wishlist", JSON.stringify(wishlist));
  updateWishlistBadges();
}

/* ---------- Get Product By ID ---------- */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

/* ---------- Flash Sale Timer ---------- */
function startFlashTimer() {
  const timerEl = document.getElementById("flashTimer");
  if (!timerEl) return;

  let totalSeconds = 12 * 3600 + 45 * 60 + 30; // 12h 45m 30s

  function updateTimer() {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    timerEl.innerHTML =
      '<span class="timer-box">' + String(h).padStart(2, '0') + '</span>' +
      '<span class="timer-box">' + String(m).padStart(2, '0') + '</span>' +
      '<span class="timer-box">' + String(s).padStart(2, '0') + '</span>';

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 12 * 3600;
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ---------- Render Navbar (used on every page) ---------- */
function renderNavbar() {
  const cartCount = getCartCount();
  const wishCount = getWishlistCount();

  return '' +
    '<div class="announcement-bar">' +
      'Free shipping on orders over $50! Use code <a href="' + getProductsURL() + '">SHOPORA2026</a> for 20% off' +
    '</div>' +
    '<nav class="navbar">' +
      '<div class="container">' +
        '<a href="' + getHomeURL() + '" class="logo">Shop<span>ora</span></a>' +
        '<div class="nav-search">' +
          '<form onsubmit="handleSearch(event)">' +
            '<input type="text" id="searchInput" placeholder="Search products, categories...">' +
            '<button type="submit">&#128269;</button>' +
          '</form>' +
        '</div>' +
        '<div class="nav-actions">' +
          '<button class="dark-toggle" onclick="toggleDarkMode()" title="Toggle Dark Mode">&#127769;</button>' +
          '<a href="' + getWishlistURL() + '" title="Wishlist">' +
            '&#9829;<span class="badge wishlist-count" style="' + (wishCount ? '' : 'display:none') + '">' + wishCount + '</span>' +
          '</a>' +
          '<a href="' + getCartURL() + '" title="Cart">' +
            '&#128722;<span class="badge cart-count" style="' + (cartCount ? '' : 'display:none') + '">' + cartCount + '</span>' +
          '</a>' +
          '<a href="' + getLoginURL() + '" title="Account">&#128100;</a>' +
          '<button class="hamburger" onclick="openMobileMenu()" aria-label="Menu">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</nav>' +
    '<div class="category-nav">' +
      '<div class="container">' +
        '<a href="' + getProductsURL() + '">All Products</a>' +
        '<a href="' + getProductsURL() + '?category=Electronics">Electronics</a>' +
        '<a href="' + getProductsURL() + '?category=Fashion">Fashion</a>' +
        '<a href="' + getProductsURL() + '?category=Shoes">Shoes</a>' +
        '<a href="' + getProductsURL() + '?category=Accessories">Accessories</a>' +
        '<a href="' + getProductsURL() + '?category=Home">Home</a>' +
        '<a href="' + getProductsURL() + '?category=Beauty">Beauty</a>' +
      '</div>' +
    '</div>' +
    '<div class="mobile-menu" id="mobileMenu">' +
      '<div class="mobile-menu-content">' +
        '<div class="mobile-menu-header">' +
          '<a href="' + getHomeURL() + '" class="logo">Shop<span>ora</span></a>' +
          '<button class="mobile-close" onclick="closeMobileMenu()">&#10005;</button>' +
        '</div>' +
        '<div class="mobile-menu-links">' +
          '<a href="' + getHomeURL() + '">Home</a>' +
          '<a href="' + getProductsURL() + '">All Products</a>' +
          '<a href="' + getProductsURL() + '?category=Electronics">Electronics</a>' +
          '<a href="' + getProductsURL() + '?category=Fashion">Fashion</a>' +
          '<a href="' + getProductsURL() + '?category=Shoes">Shoes</a>' +
          '<a href="' + getProductsURL() + '?category=Accessories">Accessories</a>' +
          '<a href="' + getProductsURL() + '?category=Home">Home & Living</a>' +
          '<a href="' + getProductsURL() + '?category=Beauty">Beauty</a>' +
          '<a href="' + getWishlistURL() + '">My Wishlist</a>' +
          '<a href="' + getCartURL() + '">My Cart</a>' +
          '<a href="' + getOrdersURL() + '">My Orders</a>' +
          '<a href="' + getLoginURL() + '">Login / Register</a>' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ---------- Render Footer (used on every page) ---------- */
function renderFooter() {
  return '' +
    '<footer class="footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<div class="logo">Shop<span>ora</span></div>' +
            '<p>Your one-stop destination for premium products at unbeatable prices. Quality guaranteed with every purchase.</p>' +
            '<div class="footer-social">' +
              '<a href="#" title="Facebook">f</a>' +
              '<a href="#" title="Twitter">X</a>' +
              '<a href="#" title="Instagram">&#9737;</a>' +
              '<a href="#" title="YouTube">&#9654;</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-column">' +
            '<h3>Quick Links</h3>' +
            '<a href="' + getHomeURL() + '">Home</a>' +
            '<a href="' + getProductsURL() + '">Products</a>' +
            '<a href="' + getCartURL() + '">Cart</a>' +
            '<a href="' + getWishlistURL() + '">Wishlist</a>' +
            '<a href="' + getOrdersURL() + '">Orders</a>' +
          '</div>' +
          '<div class="footer-column">' +
            '<h3>Categories</h3>' +
            '<a href="' + getProductsURL() + '?category=Electronics">Electronics</a>' +
            '<a href="' + getProductsURL() + '?category=Fashion">Fashion</a>' +
            '<a href="' + getProductsURL() + '?category=Shoes">Shoes</a>' +
            '<a href="' + getProductsURL() + '?category=Accessories">Accessories</a>' +
            '<a href="' + getProductsURL() + '?category=Home">Home</a>' +
          '</div>' +
          '<div class="footer-column">' +
            '<h3>Support</h3>' +
            '<a href="#">Help Center</a>' +
            '<a href="#">Returns Policy</a>' +
            '<a href="#">Shipping Info</a>' +
            '<a href="#">Privacy Policy</a>' +
            '<a href="#">Terms of Service</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>&copy; 2026 Shopora. All rights reserved.</span>' +
          '<span>Made with &#10084; for great shopping</span>' +
        '</div>' +
      '</div>' +
    '</footer>';
}

/* ---------- Initialize Common Elements ---------- */
function initApp() {
  initDarkMode();
  updateDarkToggleIcon();
  updateCartBadges();
  updateWishlistBadges();
  startFlashTimer();

  // Render navbar & footer if placeholders exist
  const navPlaceholder = document.getElementById("navbar-placeholder");
  if (navPlaceholder) navPlaceholder.innerHTML = renderNavbar();

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) footerPlaceholder.innerHTML = renderFooter();

  // Close mobile menu when clicking overlay
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("mobile-menu") && e.target.id === "mobileMenu") {
      closeMobileMenu();
    }
  });
}

// Auto-init
document.addEventListener("DOMContentLoaded", initApp);
