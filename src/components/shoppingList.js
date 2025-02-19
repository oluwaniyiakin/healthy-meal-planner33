import { getItem, setItem } from "../services/storage.js";

// Select UI elements
const shoppingListContainer = document.getElementById("shopping-list-container");
const clearShoppingListBtn = document.getElementById("clear-shopping-list");

// Retrieve shopping list from local storage
function getShoppingList() {
  return getItem("shoppingList") || [];
}

// Save shopping list to local storage
function saveShoppingList(list) {
  setItem("shoppingList", list);
}

// Display shopping list on page
function displayShoppingList() {
  const shoppingList = getShoppingList();
  shoppingListContainer.innerHTML = "";

  if (shoppingList.length === 0) {
    shoppingListContainer.innerHTML = "<p>No items in your shopping list.</p>";
    return;
  }

  shoppingList.forEach((item, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("shopping-item");
    listItem.innerHTML = `
      <h4>${item.title}</h4>
      <p>Ingredients: ${item.ingredients.join(", ")}</p>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    shoppingListContainer.appendChild(listItem);
  });

  // Attach event listeners for removing items
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", removeFromShoppingList);
  });
}

// Add item to shopping list
function addToShoppingList(event) {
  const mealCard = event.target.closest(".meal-card");
  if (!mealCard) return;

  const mealTitle = mealCard.querySelector("h3").textContent;
  const ingredients = Array.from(mealCard.querySelectorAll(".ingredient"))
    .map((el) => el.textContent);

  let shoppingList = getShoppingList();

  if (!shoppingList.some((item) => item.title === mealTitle)) {
    shoppingList.push({ title: mealTitle, ingredients });
    saveShoppingList(shoppingList);
    displayShoppingList();
  } else {
    alert("Item already in shopping list!");
  }
}

// Remove item from shopping list
function removeFromShoppingList(event) {
  const index = event.target.getAttribute("data-index");
  let shoppingList = getShoppingList();

  shoppingList.splice(index, 1);
  saveShoppingList(shoppingList);
  displayShoppingList();
}

// Clear shopping list
function clearShoppingList() {
  saveShoppingList([]);
  displayShoppingList();
}

// Attach event listeners
clearShoppingListBtn.addEventListener("click", clearShoppingList);

// Display shopping list on page load
document.addEventListener("DOMContentLoaded", displayShoppingList);
