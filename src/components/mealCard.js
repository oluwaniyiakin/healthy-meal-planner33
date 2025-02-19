export function createMealCard(meal) {
    // Create main card container
    const card = document.createElement("div");
    card.classList.add("meal-card");
  
    // Meal Image
    const img = document.createElement("img");
    img.src = meal.image || "public/images/placeholder.jpg"; // Default image if none provided
    img.alt = meal.title || "Meal Image";
    img.classList.add("meal-image");
  
    // Meal Title
    const title = document.createElement("h3");
    title.textContent = meal.title;
    title.classList.add("meal-title");
  
    // Meal Details (Calories, Time)
    const details = document.createElement("p");
    details.textContent = `Calories: ${meal.calories || "N/A"} | Time: ${meal.time || "N/A"} min`;
    details.classList.add("meal-details");
  
    // Add to Shopping List Button
    const addToListBtn = document.createElement("button");
    addToListBtn.textContent = "Add to Shopping List";
    addToListBtn.classList.add("add-to-list-btn");
  
    addToListBtn.addEventListener("click", () => {
      const shoppingItem = {
        title: meal.title,
        ingredients: meal.ingredients || [],
      };
      saveToShoppingList(shoppingItem);
      alert(`${meal.title} added to shopping list!`);
    });
  
    // Append elements to card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(details);
    card.appendChild(addToListBtn);
  
    return card;
  }
  
  // Function to save items to shopping list in local storage
  function saveToShoppingList(item) {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    shoppingList.push(item);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }
  