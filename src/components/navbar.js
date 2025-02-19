import { auth, logoutUser, checkAuth } from "../auth/firebaseConfig.js";

// Function to update navbar based on auth state
function updateNavbar(user) {
  const navbar = document.getElementById("navbar");
  navbar.innerHTML = `
    <a href="index.html">Home</a>
    <a href="meal-plan.html">Meal Plan</a>
    <a href="shopping-list.html">Shopping List</a>
    ${user ? `<button id="logout-btn">Logout</button>` : `<a href="login.html">Login</a>`}
  `;

  if (user) {
    document.getElementById("logout-btn").addEventListener("click", logoutUser);
  }
}

// Check authentication and update navbar
checkAuth(updateNavbar);
