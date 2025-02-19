import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Select UI elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Handle Login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");
    window.location.href = "meal-plan.html"; // Redirect after login
  } catch (error) {
    alert("Login Failed: " + error.message);
  }
});

// Handle Signup
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup Successful! Please log in.");
    window.location.href = "login.html";
  } catch (error) {
    alert("Signup Failed: " + error.message);
  }
});
