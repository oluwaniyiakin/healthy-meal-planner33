// Utility function to add an event listener to an element
export function addEventListenerToElement(selector, eventType, callback) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener(eventType, callback);
    }
}

// Utility function to add an event listener to multiple elements
export function addEventListenersToElements(selector, eventType, callback) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        element.addEventListener(eventType, callback);
    });
}

// Utility function to remove an event listener
export function removeEventListenerFromElement(selector, eventType, callback) {
    const element = document.querySelector(selector);
    if (element) {
        element.removeEventListener(eventType, callback);
    }
}
