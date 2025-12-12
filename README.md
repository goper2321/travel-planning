# TripBoost: Google Maps Superpowers

## Core Idea
A browser extension (for Chrome, Edge, and Firefox) that enhances Google Maps with trip-planning superpowers, helping users research destinations, organize itineraries, and save travel info directly from the map.

## 💡 Feature Brainstorm

### Smart Itinerary Builder (Inside Google Maps)
- **Add to Trip:** An "Add to Trip" button is injected directly into the Google Maps UI for any highlighted location.
- **Itinerary Timeline:** A drag-and-drop timeline to easily visualize and organize your trip.
- **Automated Travel Times:** Automatically calculates travel times between each stop in your itinerary.
- **Route Optimization:** Suggests the most efficient order for your stops.

### Travel Notes & Organization
- **Rich Attachments:** Click any place to attach notes, tags, photos, and to-do lists.
- **Quick Categories:** Use categories like "Food", "Hotels", "Museums", or "Hikes" for easy filtering.
- **Cloud Sync:** Save your trip to a cloud account and access it from any device.

### Travel Moodboards / Bucket Lists
- **Visual Planning:** Build a Pinterest-style visual board with all your saved spots.
- **Sync & Export:** Sync with your existing Google Maps lists or export your creations to Google My Maps.

### Real-Time Travel Information
- **Weather Overlay:** See the current and forecasted weather directly on the map.
- **Peak Times:** Get suggestions for avoiding crowds using Google's Popular Times data.
- **Transit Info:** View local transit options and estimated costs.

### Trip Sharing & Collaboration
- **Share with Friends:** Share a read-only version of your trip or invite friends to collaborate.
- **Group Polls:** Make group decisions easier with polls (e.g., "Which hotel should we pick?").

### Integrations
- **Booking:** Deep-links to Booking.com or Airbnb for saved accommodations.
- **Flights:** Integration with flight search APIs.
- **Export:** Export your final itinerary to a PDF.

## 🏗️ Architecture Blueprint

### Core Architecture
- **Frontend:** The browser extension UI and the overlay panel injected into the Google Maps page will be built with a lightweight framework like **React** or **Svelte**.
- **Backend (Future):** A SaaS backend will be developed using **Node.js, Python, or Firebase**.
- **Database:** Itinerary data, user notes, and preferences will be stored in a NoSQL or SQL database like **Firestore, Supabase, or MongoDB**.
- **Authentication:** Users will sign in via **Google OAuth**.

### Browser Extension Setup
- **Manifest V3:** The extension is built using the modern Chrome Extensions Manifest V3 standard.
- **Content Scripts:** These scripts are responsible for injecting the UI and custom buttons into `maps.google.com`.
- **Background Script:** A service worker manages API calls, storage, and authentication in the background.

### How It Works
1.  A **content script** waits for the Google Maps page to load and then injects a floating UI panel.
2.  It adds event listeners to detect when a user clicks on a location card in Maps, then inserts the custom **“Add to Trip”** button.
3.  Place data (name, rating, coordinates) is scraped from the DOM or, preferably, fetched from the **Google Places API** for more stable and detailed information.
4.  The **Itinerary Engine** manages the list of stops, using the **Google Directions API** to calculate travel times and suggest an optimized route order.
5.  All user data is synced with a **Firebase** or **Supabase** backend to enable real-time collaboration and multi-device access.

## 🚀 Getting Started (Development)

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Load the Extension in Chrome/Edge:**
    - Open your browser and navigate to `chrome://extensions` (for Chrome) or `edge://extensions` (for Edge).
    - Enable **"Developer mode"** using the toggle switch.
    - Click the **"Load unpacked"** button.
    - Select the cloned repository's directory.
3.  The Trip Planner icon will appear in your browser's extension toolbar.
