// Utility function to create a DOM element with attributes and content
export function createElement(tag, attributes = {}, content = "") {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
    });

    // Set text content or inner HTML
    if (content) {
        element.innerHTML = content;
    }

    return element;
}

// Utility function to show a loading spinner
export function showLoadingSpinner(container) {
    container.innerHTML = '<div class="spinner"></div>';
}

// Utility function to clear an element's content
export function clearElement(container) {
    container.innerHTML = "";
}

// Utility function to show an error message
export function showError(container, message) {
    container.innerHTML = `<p class="error-message">${message}</p>`;
}
