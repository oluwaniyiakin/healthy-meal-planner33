import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDSVRX667OI36j0n37JwgnARs635B4y30",
  authDomain: "mealplan2-53c7b.firebaseapp.com",
  projectId: "mealplan2-53c7b",
  storageBucket: "mealplan2-53c7b.appspot.com",
  messagingSenderId: "779303908945",
  appId: "1:779303908945:web:39f49081666850d1032a70",
  measurementId: "G-P3TF8LTS9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Handle authentication-related actions once the page loads
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signUpForm = document.getElementById("signup-form");
  const logoutButton = document.getElementById("logout-btn");

  // Sign-up functionality
  if (signUpForm) {
    signUpForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date().toISOString()
        });

        console.log("Sign-up successful:", user);
        window.location.href = "dashboard.html"; // Redirect after sign-up
      } catch (error) {
        alert("Sign-up failed: " + error.message);
      }
    });
  }

  // Login functionality
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          alert("No account found. Please sign up first.");
          return;
        }

        console.log("Login successful:", user);
        window.location.href = "dashboard.html"; // Redirect to dashboard
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    });
  }

  // Logout functionality
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "login.html"; // Redirect to login after logout
    });
  }

  // Redirect logged-in users away from login page
  onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes("login.html")) {
      window.location.href = "dashboard.html"; // Redirect logged-in users
    }
  });
});
