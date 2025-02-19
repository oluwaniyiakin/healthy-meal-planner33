import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Firebase Setup
const auth = getAuth();
const db = getFirestore();

// API Keys (Replace with environment variables in production)
const SPOONACULAR_API_KEY = "c4203a13daf3424886c5349745ea5d8c";
const API_URL = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${SPOONACULAR_API_KEY}`;

document.addEventListener("DOMContentLoaded", () => {
    const generateMealBtn = document.getElementById("generate-meal-plan");
    const saveMealBtn = document.getElementById("save-meal-plan");
    const mealPlanContainer = document.getElementById("meal-plan-container");
    const statusMessage = document.getElementById("status-message");

    // Function to Fetch Meal Plan
    async function fetchMealPlan() {
        try {
            statusMessage.textContent = "Generating meal plan...";
            const response = await fetch(API_URL);
            const data = await response.json();

            if (!data.meals) {
                statusMessage.textContent = "Error generating meal plan. Please try again.";
                return;
            }

            // Display Meals
            mealPlanContainer.innerHTML = data.meals.map(meal => `
                <div class="meal-card">
                    <h3>${meal.title}</h3>
                    <p>Ready in: ${meal.readyInMinutes} mins</p>
                    <a href="${meal.sourceUrl}" target="_blank">View Recipe</a>
                </div>
            `).join("");

            statusMessage.textContent = "Meal plan generated successfully!";
        } catch (error) {
            console.error("Error fetching meal plan:", error);
            statusMessage.textContent = "Error fetching meal plan.";
        }
    }

    // Function to Save Meal Plan to Firebase
    async function saveMealPlan() {
        const user = auth.currentUser;
        if (!user) {
            statusMessage.textContent = "Please log in to save your meal plan.";
            return;
        }

        const meals = mealPlanContainer.innerHTML;
        if (!meals) {
            statusMessage.textContent = "No meal plan to save.";
            return;
        }

        try {
            const userDoc = doc(db, "mealPlans", user.uid);
            await setDoc(userDoc, { mealPlan: meals, timestamp: new Date() });

            statusMessage.textContent = "Meal plan saved successfully!";
        } catch (error) {
            console.error("Error saving meal plan:", error);
            statusMessage.textContent = "Failed to save meal plan.";
        }
    }

    // Event Listeners
    generateMealBtn.addEventListener("click", fetchMealPlan);
    saveMealBtn.addEventListener("click", saveMealPlan);

    // Ensure User is Authenticated
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "login.html"; // Redirect to login
        }
    });
});
