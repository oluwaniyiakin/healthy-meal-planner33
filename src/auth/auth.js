import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { saveMealPlan } from "../services/storage.js"; 
import { firebaseConfig } from "../firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to register a new user
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User registered:", userCredential.user.email);
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error registering user:", error.message);
      throw error;
    });
}

// Function to log in a user
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user.email);
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
      throw error;
    });
}

// Function to log out a user
export function logoutUser() {
  return signOut(auth)
    .then(() => {
      console.log("User logged out");
    })
    .catch((error) => {
      console.error("Logout failed:", error.message);
    });
}

// Function to monitor authentication state changes
export function monitorAuthState(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// Function to save a meal plan only if user is logged in
export function saveMealForUser(mealPlan) {
  const user = auth.currentUser;
  if (user) {
    saveMealPlan(mealPlan);
    console.log("Meal plan saved for user:", user.email);
  } else {
    alert("You must be logged in to save a meal plan.");
  }
}
