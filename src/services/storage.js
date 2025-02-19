// Save meal plan to local storage
export function saveMealPlan(mealPlan) {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }
  
  // Retrieve meal plan from local storage
  export function getMealPlan() {
    return JSON.parse(localStorage.getItem("mealPlan")) || [];
  }
  
  // Save shopping list to local storage
  export function saveShoppingList(list) {
    localStorage.setItem("shoppingList", JSON.stringify(list));
  }
  
  // Retrieve shopping list from local storage
  export function getShoppingList() {
    return JSON.parse(localStorage.getItem("shoppingList")) || [];
  }
  
  // Clear shopping list
  export function clearShoppingList() {
    localStorage.removeItem("shoppingList");
  }
  
  // Save user preferences (e.g., dietary restrictions)
  export function saveUserPreferences(preferences) {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }
  
  // Retrieve user preferences
  export function getUserPreferences() {
    return JSON.parse(localStorage.getItem("userPreferences")) || {};
  }
  