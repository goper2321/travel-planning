// The heading element that displays the location name.
const LOCATION_NAME_SELECTOR = 'h1';

// A debounce timeout in milliseconds to avoid sending too many messages.
const DEBOUNCE_TIMEOUT = 500;

let debounceTimer;

// This function sends the location name to the background script.
function sendLocation(locationName) {
  chrome.runtime.sendMessage({
    type: 'NEW_LOCATION',
    payload: locationName,
  });
}

// This function finds the location name in the DOM.
function findLocation() {
  const locationElement = document.querySelector(LOCATION_NAME_SELECTOR);
  if (locationElement) {
    sendLocation(locationElement.textContent);
  }
}

// We use a MutationObserver to detect when the location name changes.
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(findLocation, DEBOUNCE_TIMEOUT);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// We also run the function once on load.
findLocation();
