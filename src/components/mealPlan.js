import { saveMealPlan, getUserId, checkAuth } from "../auth/firebaseConfig.js";
import { fetchRecipes } from "../api/apiHandler.js";

// Select UI elements
const mealPlanContainer = document.getElementById("meal-plan-container");
const generateMealPlanBtn = document.getElementById("generate-meal-plan");
const saveMealPlanBtn = document.getElementById("save-meal-plan");

// Check if user is logged in
checkAuth((user) => {
  if (!user) {
    alert("You must be logged in to save meal plans.");
    saveMealPlanBtn.style.display = "none"; // Hide button if not logged in
  } else {
    saveMealPlanBtn.style.display = "block";
  }
});

// Generate meal plan
async function generateMealPlan() {
  try {
    const meals = await fetchRecipes();
    const diet = dietSelection.value;
    displayMealPlan(meals);
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
}

// Display meal plan
function displayMealPlan(meals) {
  mealPlanContainer.innerHTML = "";

  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");

    mealCard.innerHTML = `
      <h3>${meal.title}</h3>
      <img src="${meal.image}" alt="${meal.title}">
      <p><strong>Calories:</strong> ${meal.calories} kcal</p>
      <button class="add-to-shopping-list" data-id="${meal.id}">Add to Shopping List</button>
    `;

    mealPlanContainer.appendChild(mealCard);
  });

  // Attach event listeners
  document.querySelectorAll(".add-to-shopping-list").forEach((btn) => {
    btn.addEventListener("click", addToShoppingList);
  });
}

// Save meal plan to Firebase
async function saveMealPlanToFirebase() {
  const userId = getUserId();
  if (!userId) {
    alert("You must be logged in to save meal plans.");
    return;
  }

  const mealTitles = [...document.querySelectorAll(".meal-card h3")].map((meal) => meal.textContent);
  await saveMealPlan(userId, mealTitles);
  alert("Meal Plan Saved Successfully!");
}

// Attach event listeners
generateMealPlanBtn.addEventListener("click", generateMealPlan);
saveMealPlanBtn.addEventListener("click", saveMealPlanToFirebase);
