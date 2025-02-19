document.addEventListener("DOMContentLoaded", () => {
    const mealImage = document.getElementById("meal-image");
    const mealTitle = document.getElementById("meal-title");
    const mealDescription = document.getElementById("meal-description");
    const mealCalories = document.getElementById("meal-calories");
    const mealProtein = document.getElementById("meal-protein");
    const mealCarbs = document.getElementById("meal-carbs");
    const mealFats = document.getElementById("meal-fats");
    const ingredientsList = document.getElementById("ingredients-list");
    const instructionsList = document.getElementById("instructions-list");

    const saveMealBtn = document.getElementById("save-meal");
    const backToMealPlanBtn = document.getElementById("back-to-meal-plan");

    // Retrieve meal data from localStorage or URL params
    const mealData = JSON.parse(localStorage.getItem("selectedMeal"));

    if (mealData) {
        mealImage.src = mealData.image || "images/placeholder.jpg";
        mealTitle.textContent = mealData.title;
        mealDescription.textContent = mealData.description || "No description available.";
        mealCalories.textContent = mealData.nutrition.calories || "N/A";
        mealProtein.textContent = mealData.nutrition.protein || "N/A";
        mealCarbs.textContent = mealData.nutrition.carbs || "N/A";
        mealFats.textContent = mealData.nutrition.fats || "N/A";

        // Populate ingredients
        ingredientsList.innerHTML = mealData.ingredients.map(ingredient =>
            `<li><input type="checkbox"> ${ingredient}</li>`).join("");

        // Populate instructions
        instructionsList.innerHTML = mealData.instructions.map(step =>
            `<li>${step}</li>`).join("");
    }

    // Save meal to local storage
    saveMealBtn.addEventListener("click", () => {
        let savedMeals = JSON.parse(localStorage.getItem("savedMeals")) || [];
        savedMeals.push(mealData);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        alert("Meal saved successfully!");
    });

    // Navigate back to meal plan
    backToMealPlanBtn.addEventListener("click", () => {
        window.location.href = "meal-plan.html";
    });
});
