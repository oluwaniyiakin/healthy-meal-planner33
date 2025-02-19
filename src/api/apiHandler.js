const SPOONACULAR_API_KEY = "c4203a13daf3424886c5349745ea5d8c";
const EDAMAM_APP_ID = "44af3295";
const EDAMAM_APP_KEY = "36743cbd934e386dfab3a47cd9558d83";

// Base URLs
const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";
const EDAMAM_BASE_URL = "https://api.edamam.com";

/**
 * Fetches random recipes from Spoonacular.
 * @param {number} count - Number of recipes to fetch (default: 5).
 * @returns {Promise<Array>} - Returns an array of recipe objects.
 */
export async function fetchRandomRecipes(count = 5) {
    const url = `${SPOONACULAR_BASE_URL}/recipes/random?number=${count}&apiKey=${SPOONACULAR_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch random recipes.");
        
        const data = await response.json();
        return data.recipes.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            calories: recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || "Unknown",
        }));
    } catch (error) {
        console.error("Spoonacular API Error:", error);
        alert("Failed to load recipes. Please try again later.");
        return [];
    }
}

async function fetchRecipes(diet = "") {
    const url = `https://api.spoonacular.com/recipes/random?number=5&diet=${diet}&apiKey=${SPOONACULAR_API_KEY}`;
    // API call remains the same...
  }
  
/**
 * Fetches recipes based on ingredients from Spoonacular.
 * @param {string} ingredients - Comma-separated list of ingredients.
 * @returns {Promise<Array>} - Returns an array of recipes.
 */
export async function fetchRecipesByIngredients(ingredients) {
    const url = `${SPOONACULAR_BASE_URL}/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${SPOONACULAR_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch recipes by ingredients.");
        
        return await response.json(); // Returns an array of recipes
    } catch (error) {
        console.error("Spoonacular API Error:", error);
        return [];
    }
}

/**
 * Fetches full details of a recipe from Spoonacular.
 * @param {string} recipeId - ID of the recipe.
 * @returns {Promise<Object>} - Returns the full recipe details.
 */
export async function fetchRecipeDetails(recipeId) {
    const url = `${SPOONACULAR_BASE_URL}/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch recipe details.");

        return await response.json(); // Returns full recipe details
    } catch (error) {
        console.error("Spoonacular API Error:", error);
        return null;
    }
}

/**
 * Generates a meal plan based on dietary preferences and target calories.
 * @param {string} diet - Dietary preference (optional).
 * @param {number} targetCalories - Target daily calorie intake (default: 2000).
 * @returns {Promise<Object>} - Returns a meal plan object.
 */
export async function generateMealPlan(diet = "", targetCalories = 2000) {
    const url = `${SPOONACULAR_BASE_URL}/mealplanner/generate?timeFrame=week&diet=${diet}&targetCalories=${targetCalories}&apiKey=${SPOONACULAR_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to generate meal plan.");

        return await response.json(); // Returns a meal plan object
    } catch (error) {
        console.error("Spoonacular API Error:", error);
        return null;
    }
}

/**
 * Fetches nutrition data for a single ingredient from Edamam.
 * @param {string} ingredient - Ingredient name.
 * @returns {Promise<Object>} - Returns nutrition information.
 */
export async function fetchNutrition(ingredient) {
    const url = `${EDAMAM_BASE_URL}/api/nutrition-data?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${ingredient}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch nutrition data.");

        const data = await response.json();
        return {
            calories: data.calories,
            protein: data.totalNutrients?.PROCNT?.quantity || 0,
            carbs: data.totalNutrients?.CHOCDF?.quantity || 0,
        };
    } catch (error) {
        console.error("Edamam API Error:", error);
        alert("Failed to load nutrition data.");
        return null;
    }
}

/**
 * Analyzes the nutrition details of multiple ingredients.
 * @param {Array} ingredients - Array of ingredient strings.
 * @returns {Promise<Object>} - Returns detailed nutrition analysis.
 */
export async function analyzeNutrition(ingredients) {
    const url = `${EDAMAM_BASE_URL}/api/nutrition-details?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ingr: ingredients }) // Pass array of ingredients
        });

        if (!response.ok) throw new Error("Failed to analyze nutrition.");

        return await response.json(); // Returns nutrition analysis data
    } catch (error) {
        console.error("Edamam API Error:", error);
        return null;
    }
}
