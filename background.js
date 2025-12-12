// The key for the list of stops in chrome.storage.
const STOPS_STORAGE_KEY = 'stops';
const CURRENT_LOCATION_KEY = 'currentLocation';

// This function adds a new stop to the list in storage.
async function addStop(newStop) {
  const { stops = [] } = await chrome.storage.sync.get(STOPS_STORAGE_KEY);
  if (!stops.includes(newStop)) {
    stops.push(newStop);
    await chrome.storage.sync.set({ [STOPS_STORAGE_KEY]: stops });
  }
}

// This function removes a stop from the list in storage.
async function removeStop(stopToRemove) {
  const { stops = [] } = await chrome.storage.sync.get(STOPS_STORAGE_KEY);
  const newStops = stops.filter(stop => stop !== stopToRemove);
  await chrome.storage.sync.set({ [STOPS_STORAGE_KEY]: newStops });
}

// Listen for messages from the content script and popup.
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'NEW_LOCATION') {
    // Store the current location so the popup can access it.
    await chrome.storage.local.set({ [CURRENT_LOCATION_KEY]: message.payload });
  } else if (message.type === 'GET_STOPS') {
    // Send the current list of stops to the popup.
    const { stops = [] } = await chrome.storage.sync.get(STOPS_STORAGE_KEY);
    sendResponse(stops);
  } else if (message.type === 'ADD_STOP') {
    // Add a new stop to the list.
    await addStop(message.payload);
  } else if (message.type === 'GET_CURRENT_LOCATION') {
    // Send the current location to the popup.
    const { currentLocation } = await chrome.storage.local.get(CURRENT_LOCATION_KEY);
    sendResponse(currentLocation);
  }
});
