import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const db = getFirestore(app);
const storage = getStorage(app);

// Function to monitor authentication state
export function checkAuth(callback) {
  onAuthStateChanged(auth, callback);
}

// User authentication functions
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
}

export function logoutUser() {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch(error => {
      console.error("Logout error:", error);
    });
}

// Firestore functions
export async function saveMealPlan(userId, mealPlan) {
  try {
    const docRef = await addDoc(collection(db, "mealPlans"), {
      userId,
      mealPlan,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving meal plan:", error);
    throw error;
  }
}

export async function getMealPlans(userId) {
  try {
    const querySnapshot = await getDocs(collection(db, "mealPlans"));
    return querySnapshot.docs
      .filter(doc => doc.data().userId === userId)
      .map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    throw error;
  }
}

// Function to get the current user's ID
export function getUserId() {
  return auth.currentUser ? auth.currentUser.uid : null;
}

export { auth, db, storage };
