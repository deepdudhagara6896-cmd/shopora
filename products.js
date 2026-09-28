/* ============================================
   SHOPORA - Product Data
   All 24 demo products with public image URLs
   ============================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 79.99,
    oldPrice: 129.99,
    discount: 38,
    rating: 4.7,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for travel, work, or relaxation."
  },
  {
    id: 2,
    name: "Smart Fitness Watch Pro",
    category: "Electronics",
    price: 199.99,
    oldPrice: 299.99,
    discount: 33,
    rating: 4.5,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water-resistant up to 50 meters."
  },
  {
    id: 3,
    name: "Slim Fit Denim Jacket",
    category: "Fashion",
    price: 59.99,
    oldPrice: 89.99,
    discount: 33,
    rating: 4.3,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    description: "Classic slim-fit denim jacket made from premium cotton. Features button closure, chest pockets, and a comfortable relaxed fit."
  },
  {
    id: 4,
    name: "Running Shoes Ultra Boost",
    category: "Shoes",
    price: 119.99,
    oldPrice: 179.99,
    discount: 33,
    rating: 4.8,
    reviews: 3214,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "High-performance running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole. Ideal for daily training and marathons."
  },
  {
    id: 5,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    price: 49.99,
    oldPrice: 79.99,
    discount: 37,
    rating: 4.4,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    description: "Elegant genuine leather crossbody bag with adjustable strap, multiple compartments, and gold-tone hardware. Perfect for everyday use."
  },
  {
    id: 6,
    name: "Minimalist Desk Lamp",
    category: "Home",
    price: 34.99,
    oldPrice: 54.99,
    discount: 36,
    rating: 4.6,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop",
    description: "Modern LED desk lamp with adjustable brightness, touch control, and flexible arm. Energy-efficient with a sleek minimalist design."
  },
  {
    id: 7,
    name: "Organic Face Serum",
    category: "Beauty",
    price: 29.99,
    oldPrice: 44.99,
    discount: 33,
    rating: 4.7,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    description: "Natural organic face serum with vitamin C and hyaluronic acid. Reduces fine lines, brightens skin, and provides deep hydration."
  },
  {
    id: 8,
    name: "Bluetooth Portable Speaker",
    category: "Electronics",
    price: 44.99,
    oldPrice: 69.99,
    discount: 36,
    rating: 4.4,
    reviews: 1432,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description: "Compact waterproof Bluetooth speaker with 360-degree sound, 12-hour battery life, and built-in microphone for hands-free calls."
  },
  {
    id: 9,
    name: "Classic Aviator Sunglasses",
    category: "Accessories",
    price: 24.99,
    oldPrice: 39.99,
    discount: 38,
    rating: 4.2,
    reviews: 756,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    description: "Timeless aviator sunglasses with UV400 protection, polarized lenses, and lightweight metal frame. Includes protective case."
  },
  {
    id: 10,
    name: "Cotton Casual T-Shirt",
    category: "Fashion",
    price: 19.99,
    oldPrice: 29.99,
    discount: 33,
    rating: 4.1,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    description: "Premium 100% cotton casual t-shirt with a comfortable regular fit. Available in multiple colors. Machine washable and durable."
  },
  {
    id: 11,
    name: "Ceramic Plant Pots Set",
    category: "Home",
    price: 39.99,
    oldPrice: 59.99,
    discount: 33,
    rating: 4.5,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    description: "Set of 3 minimalist ceramic plant pots in graduating sizes. Drainage holes included. Perfect for indoor plants and succulents."
  },
  {
    id: 12,
    name: "Luxury Perfume Essence",
    category: "Beauty",
    price: 69.99,
    oldPrice: 99.99,
    discount: 30,
    rating: 4.8,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    description: "Elegant long-lasting fragrance with notes of jasmine, vanilla, and sandalwood. A sophisticated scent for any occasion."
  },
  {
    id: 13,
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 24.99,
    oldPrice: 39.99,
    discount: 38,
    rating: 4.3,
    reviews: 2567,
    image: "https://images.unsplash.com/photo-1615526675159-e04fbae52a4b?w=400&h=400&fit=crop",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Slim design with LED indicator and anti-slip surface."
  },
  {
    id: 14,
    name: "Canvas Sneakers Classic",
    category: "Shoes",
    price: 39.99,
    oldPrice: 59.99,
    discount: 33,
    rating: 4.4,
    reviews: 1789,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Classic canvas sneakers with vulcanized rubber sole. Comfortable, lightweight, and versatile for any casual outfit."
  },
  {
    id: 15,
    name: "Stainless Steel Water Bottle",
    category: "Home",
    price: 17.99,
    oldPrice: 27.99,
    discount: 36,
    rating: 4.6,
    reviews: 4321,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    description: "Double-walled insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly."
  },
  {
    id: 16,
    name: "Analog Wrist Watch",
    category: "Accessories",
    price: 89.99,
    oldPrice: 139.99,
    discount: 36,
    rating: 4.7,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    description: "Elegant analog wristwatch with Japanese quartz movement, genuine leather strap, and scratch-resistant sapphire crystal glass."
  },
  {
    id: 17,
    name: "Yoga Mat Premium",
    category: "Home",
    price: 34.99,
    oldPrice: 54.99,
    discount: 36,
    rating: 4.5,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    description: "Non-slip premium yoga mat with alignment lines. Extra thick for comfort, lightweight for portability. Includes carrying strap."
  },
  {
    id: 18,
    name: "Designer Hand Cream Set",
    category: "Beauty",
    price: 22.99,
    oldPrice: 34.99,
    discount: 34,
    rating: 4.3,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    description: "Luxurious set of 3 hand creams with shea butter and essential oils. Nourishing, moisturizing, and beautifully scented."
  },
  {
    id: 19,
    name: "Laptop Backpack Waterproof",
    category: "Accessories",
    price: 44.99,
    oldPrice: 69.99,
    discount: 36,
    rating: 4.6,
    reviews: 2345,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Waterproof laptop backpack with USB charging port, anti-theft design, and padded compartment. Fits up to 15.6-inch laptops."
  },
  {
    id: 20,
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 69.99,
    oldPrice: 109.99,
    discount: 36,
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    description: "RGB backlit mechanical keyboard with hot-swappable switches, N-key rollover, and premium PBT keycaps. Ideal for gaming and typing."
  },
  {
    id: 21,
    name: "Floral Summer Dress",
    category: "Fashion",
    price: 44.99,
    oldPrice: 69.99,
    discount: 36,
    rating: 4.4,
    reviews: 1098,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    description: "Beautiful floral print summer dress with a flattering A-line silhouette. Lightweight fabric perfect for warm weather."
  },
  {
    id: 22,
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 59.99,
    oldPrice: 99.99,
    discount: 40,
    rating: 4.6,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop",
    description: "True wireless earbuds with active noise cancellation, transparency mode, and 30-hour total battery life with charging case."
  },
  {
    id: 23,
    name: "Smart LED Bulb Pack",
    category: "Home",
    price: 27.99,
    oldPrice: 44.99,
    discount: 38,
    rating: 4.3,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    description: "Pack of 4 smart LED bulbs with 16 million colors, voice control, and scheduling. Works with Alexa and Google Assistant."
  },
  {
    id: 24,
    name: "Precision Screwdriver Set",
    category: "Electronics",
    price: 19.99,
    oldPrice: 32.99,
    discount: 39,
    rating: 4.5,
    reviews: 2109,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop",
    description: "60-piece precision screwdriver set with magnetic tips, anti-static tweezers, and durable carrying case. Perfect for electronics repair."
  }
];

/* ============================================
   Helper: Get base path based on current page
   ============================================ */
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes("/pages/")) {
    return "../";
  }
  return "";
}

/* Helper to build page URLs */
function getPageURL(page) {
  const base = getBasePath();
  return base + page;
}

function getProductURL(id) {
  const base = getBasePath();
  return base + "pages/product-details.html?id=" + id;
}

function getProductsURL() {
  const base = getBasePath();
  return base + "pages/products.html";
}

function getCartURL() {
  const base = getBasePath();
  return base + "pages/cart.html";
}

function getWishlistURL() {
  const base = getBasePath();
  return base + "pages/wishlist.html";
}

function getCheckoutURL() {
  const base = getBasePath();
  return base + "pages/checkout.html";
}

function getLoginURL() {
  const base = getBasePath();
  return base + "pages/login.html";
}

function getRegisterURL() {
  const base = getBasePath();
  return base + "pages/register.html";
}

function getOrdersURL() {
  const base = getBasePath();
  return base + "pages/orders.html";
}

function getHomeURL() {
  const base = getBasePath();
  return base + "index.html";
}

function getCSSPath() {
  const base = getBasePath();
  return base + "css/style.css";
}

function getResponsiveCSSPath() {
  const base = getBasePath();
  return base + "css/responsive.css";
}

function getProductsJSPath() {
  const base = getBasePath();
  return base + "js/products.js";
}

function getAppJSPath() {
  const base = getBasePath();
  return base + "js/app.js";
}

function getCartJSPath() {
  const base = getBasePath();
  return base + "js/cart.js";
}

function getAuthJSPath() {
  const base = getBasePath();
  return base + "js/auth.js";
}
