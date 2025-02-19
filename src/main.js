import { createMealCard } from "./components/mealCard.js";
import { saveMealPlan, getMealPlan } from "./services/storage.js";
import { fetchMealsFromAPI } from "./api/apiHandler.js";

// DOM elements
const mealContainer = document.getElementById("meal-container");

// Function to load meals from API
async function loadMeals() {
  try {
    const meals = await fetchMealsFromAPI();
    mealContainer.innerHTML = ""; // Clear previous content
    meals.forEach((meal) => {
      const mealCard = createMealCard(meal);
      mealContainer.appendChild(mealCard);
    });
  } catch (error) {
    console.error("Error loading meals:", error);
  }
}

// Load saved meal plan (offline support)
function loadSavedMealPlan() {
  const savedMeals = getMealPlan();
  if (savedMeals.length > 0) {
    mealContainer.innerHTML = "";
    savedMeals.forEach((meal) => {
      const mealCard = createMealCard(meal);
      mealContainer.appendChild(mealCard);
    });
  }
}

// On page load, fetch meals or load saved meal plan
document.addEventListener("DOMContentLoaded", () => {
  if (navigator.onLine) {
    loadMeals();
  } else {
    loadSavedMealPlan(); // Load offline meals
  }
});
