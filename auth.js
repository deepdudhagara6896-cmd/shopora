/* ============================================
   SHOPORA - Authentication (Demo)
   Login / Register with LocalStorage
   ============================================ */

function getUsers() {
  return JSON.parse(localStorage.getItem("shopora-users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("shopora-users", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("shopora-current-user") || "null");
}

function setCurrentUser(user) {
  localStorage.setItem("shopora-current-user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("shopora-current-user");
  showToast("Logged out successfully", "success");
  setTimeout(function() {
    window.location.href = getHomeURL();
  }, 800);
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function handleRegister(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const password = form.querySelector('[name="password"]').value;
  const confirmPassword = form.querySelector('[name="confirmPassword"]').value;

  if (!name || !email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters", "error");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match", "error");
    return;
  }

  let users = getUsers();

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    showToast("An account with this email already exists", "error");
    return;
  }

  // Create user (storing only demo data, NOT secure for production)
  const user = {
    name: name,
    email: email,
    password: btoa(password), // Basic encoding, NOT encryption
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);

  // Auto login
  setCurrentUser({ name: name, email: email });

  showToast("Account created successfully!", "success");
  setTimeout(function() {
    window.location.href = getHomeURL();
  }, 1000);
}

function handleLogin(e) {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector('[name="email"]').value.trim();
  const password = form.querySelector('[name="password"]').value;

  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === btoa(password));

  if (!user) {
    showToast("Invalid email or password", "error");
    return;
  }

  setCurrentUser({ name: user.name, email: user.email });

  showToast("Welcome back, " + user.name + "!", "success");
  setTimeout(function() {
    window.location.href = getHomeURL();
  }, 1000);
}

/* Update UI based on login state */
function updateAuthUI() {
  const user = getCurrentUser();
  const authLinks = document.querySelectorAll(".auth-link");
  const userLinks = document.querySelectorAll(".user-link");

  if (user) {
    authLinks.forEach(el => el.style.display = "none");
    userLinks.forEach(el => el.style.display = "");
    document.querySelectorAll(".user-name").forEach(el => {
      el.textContent = user.name;
    });
  } else {
    authLinks.forEach(el => el.style.display = "");
    userLinks.forEach(el => el.style.display = "none");
  }
}

document.addEventListener("DOMContentLoaded", updateAuthUI);
