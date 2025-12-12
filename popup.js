let currentLocation = null;
const addStopButton = document.getElementById('add-stop-button');
const itineraryList = document.getElementById('itinerary-list');

// This function renders the list of stops in the popup.
function renderStops(stops) {
  itineraryList.innerHTML = ''; // Clear the list first
  if (stops.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.classList.add('itinerary-item');
    emptyItem.textContent = 'No stops added yet.';
    itineraryList.appendChild(emptyItem);
  } else {
    stops.forEach(stop => {
      const listItem = document.createElement('li');
      listItem.classList.add('itinerary-item');
      listItem.textContent = stop;
      itineraryList.appendChild(listItem);
    });
  }
}

// This function handles adding a new stop.
async function handleAddStop() {
  if (currentLocation) {
    await chrome.runtime.sendMessage({
      type: 'ADD_STOP',
      payload: currentLocation,
    });
    // After adding, refresh the list.
    const updatedStops = await chrome.runtime.sendMessage({ type: 'GET_STOPS' });
    renderStops(updatedStops);
  }
}

// This is the main function that runs when the popup is opened.
async function main() {
  // Get the current list of stops and render them.
  const stops = await chrome.runtime.sendMessage({ type: 'GET_STOPS' });
  renderStops(stops);

  // Get the current location from the background script.
  currentLocation = await chrome.runtime.sendMessage({ type: 'GET_CURRENT_LOCATION' });

  // Enable the "Add Stop" button if we have a location.
  if (currentLocation) {
    addStopButton.disabled = false;
    addStopButton.textContent = `Add "${currentLocation}"`;
  } else {
    addStopButton.textContent = 'No location detected';
  }

  // Add the event listener for the button.
  addStopButton.addEventListener('click', handleAddStop);
}

// Run the main function when the document is loaded.
document.addEventListener('DOMContentLoaded', main);
