// The key for the list of stops in chrome.storage.
const STOPS_STORAGE_KEY = 'stops';
const CURRENT_LOCATION_KEY = 'currentLocation';

// This function adds a new stop to the list in storage.
async function addStop(newStop) {
  const { stops = [] } = await chrome.storage.sync.get(STOPS_STORAGE_KEY);

  // Check for duplicates based on name and coordinates.
  const isDuplicate = stops.some(stop =>
    stop.name === newStop.name &&
    stop.coordinates.lat === newStop.coordinates.lat &&
    stop.coordinates.lng === newStop.coordinates.lng
  );

  if (!isDuplicate) {
    const stopWithId = {
      id: Date.now().toString(), // Simple unique ID
      ...newStop,
    };
    stops.push(stopWithId);
    await chrome.storage.sync.set({ [STOPS_STORAGE_KEY]: stops });
  }
}

// Listen for messages from the content script and popup.
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'NEW_LOCATION') {
    // Store the current location object.
    await chrome.storage.local.set({ [CURRENT_LOCATION_KEY]: message.payload });
  } else if (message.type === 'GET_STOPS') {
    // Send the current list of stop objects to the popup.
    const { stops = [] } = await chrome.storage.sync.get(STOPS_STORAGE_KEY);
    sendResponse(stops);
  } else if (message.type === 'ADD_STOP') {
    // Add a new stop object to the list.
    await addStop(message.payload);
  } else if (message.type === 'GET_CURRENT_LOCATION') {
    // Send the current location object to the popup.
    const { currentLocation } = await chrome.storage.local.get(CURRENT_LOCATION_KEY);
    sendResponse(currentLocation);
  }
});
