// The heading element that displays the location name.
const LOCATION_NAME_SELECTOR = 'h1';

// A debounce timeout in milliseconds to avoid sending too many messages.
const DEBOUNCE_TIMEOUT = 500;

let debounceTimer;

// This function parses the coordinates from the current URL.
function getCoordinatesFromUrl() {
  const match = window.location.href.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  }
  return null;
}

// This function sends the location data to the background script.
function sendLocation(location) {
  chrome.runtime.sendMessage({
    type: 'NEW_LOCATION',
    payload: location,
  });
}

// This function finds the location name in the DOM and gets the coordinates.
function findLocation() {
  const locationElement = document.querySelector(LOCATION_NAME_SELECTOR);
  const coordinates = getCoordinatesFromUrl();

  if (locationElement && coordinates) {
    sendLocation({
      name: locationElement.textContent,
      coordinates: coordinates,
    });
  }
}

// We use a MutationObserver to detect when the page content changes.
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
