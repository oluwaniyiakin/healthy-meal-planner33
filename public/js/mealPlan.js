// Import Firebase App & Services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js"; 
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// ✅ Import Firebase Configuration
import firebaseConfig from "../auth/firebaseConfig.js"; 

// ✅ Initialize Firebase App using the imported config
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ API Configuration (Replace API key with environment variables in production)
const SPOONACULAR_API_KEY = "c4203a13daf3424886c5349745ea5d8c";
const API_URL = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${SPOONACULAR_API_KEY}`;

document.addEventListener("DOMContentLoaded", () => {
    const generateMealBtn = document.getElementById("generateMealPlan");
    const saveMealBtn = document.getElementById("saveMealPlan");
    const mealPlanContainer = document.getElementById("meal-plan-container");
    const statusMessage = document.getElementById("status-message");

    // ✅ Ensure User is Authenticated
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "login.html"; // Redirect if not authenticated
        }
    });

    // ✅ Function to Fetch Meal Plan from API
    async function fetchMealPlan() {
        try {
            statusMessage.textContent = "Generating meal plan...";
            generateMealBtn.disabled = true;
            saveMealBtn.disabled = true;

            const response = await fetch(API_URL);
            const data = await response.json();

            if (!data.meals || data.meals.length === 0) {
                statusMessage.textContent = "Error generating meal plan. Please try again.";
                generateMealBtn.disabled = false;
                return;
            }

            // ✅ Display Meals Dynamically
            mealPlanContainer.innerHTML = data.meals.map(meal => `
                <div class="meal-card">
                    <h3>${meal.title}</h3>
                    <p>Ready in: ${meal.readyInMinutes} mins</p>
                    <a href="${meal.sourceUrl}" target="_blank">View Recipe</a>
                </div>
            `).join("");

            statusMessage.textContent = "Meal plan generated successfully!";
            saveMealBtn.disabled = false; // Enable save button

            // ✅ Redirect to detailed meal plan page after a short delay
            setTimeout(() => {
                window.location.href = "detailed-meal-plan.html";
            }, 1500);
            
        } catch (error) {
            console.error("Error fetching meal plan:", error);
            statusMessage.textContent = "Error fetching meal plan.";
        } finally {
            generateMealBtn.disabled = false;
        }
    }

    // ✅ Function to Save Meal Plan to Firebase Firestore
    async function saveMealPlan() {
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to save a meal plan.");
            return;
        }

        if (!mealPlanContainer.innerHTML) {
            alert("No meal plan to save.");
            return;
        }

        const mealPlan = {
            userId: user.uid,
            date: new Date().toISOString(),
            meals: mealPlanContainer.innerHTML // Store rendered meals
        };

        try {
            await addDoc(collection(db, "mealPlans"), mealPlan);
            alert("Meal Plan saved successfully!");
        } catch (error) {
            console.error("Error saving meal plan:", error);
            alert("Failed to save meal plan. Try again.");
        }
    }

    // ✅ Event Listeners for Buttons
    generateMealBtn.addEventListener("click", fetchMealPlan);
    saveMealBtn.addEventListener("click", saveMealPlan);
});
