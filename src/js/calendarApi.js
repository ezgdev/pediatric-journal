// Google Calendar API integration
const CLIENT_ID = "703078067307-qm6g9kd3b3fh2h3p5brg9d96ricjm0h0.apps.googleusercontent.com";
const API_KEY = "AIzaSyCjxu-qVeKCV4eITOeVTnA2nTRQElV3aKw";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let tokenClient;
let gapiLoaded = false;
let accessToken = null;

// Load the Google API client library
function loadGapiClient() {
    return new Promise((resolve, reject) => {
        gapi.load("client", async () => {
            try {
                await gapi.client.init({
                    apiKey: API_KEY,
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                });
                gapiLoaded = true;
                resolve();
            } catch (error) {
                console.error("Error loading Google API:", error);
                reject(error);
            }
        });
    });
}

// Initialize OAuth authentication
function initializeAuth() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
            if (response.error) {
                console.error("Authentication error:", response);
                return;
            }
            accessToken = response.access_token;
            localStorage.setItem("accessToken", accessToken); // Save the token to localStorage
            localStorage.setItem("isLoggedIn", "true");
            updateSigninStatus(true);
        },
    });
}

// Handle the loading of the Google API client and authentication
async function handleClientLoad() {
    try {
        await loadGapiClient();  // Wait for the API to load completely
        initializeAuth(); // Initialize authentication only after the API has loaded

        const savedToken = localStorage.getItem("accessToken");
        const wasLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (savedToken && wasLoggedIn) {
            accessToken = savedToken;
            gapi.client.setToken({ access_token: accessToken });
            updateSigninStatus(true); // Update the UI to show that the user is logged in
        }

    } catch (error) {
        console.error("Could not load Google API:", error);
    }
}

// Authenticate the user
window.authenticate = function () {
    if (!gapiLoaded || !tokenClient) {
        console.error("Error: Google API has not finished loading");
        alert("Please wait for the Google API to fully load.");
        return;
    }
    tokenClient.requestAccessToken();
};

// Sign out the user
window.signOut = function () {
    if (accessToken) {
        google.accounts.oauth2.revoke(accessToken, () => {
            accessToken = null;
            localStorage.removeItem("isLoggedIn");
            updateSigninStatus(false);
        });
    }
};

// Update the interface according to the session state
function updateSigninStatus(isSignedIn) {
    document.getElementById("loginButton").style.display = isSignedIn ? "none" : "flex";
    document.getElementById("logoutButton").style.display = isSignedIn ? "flex" : "none";
}

// Add an event to the calendar
function showModal(message) {
    const modal = document.getElementById('notification-modal');
    const messageEl = document.getElementById('modal-message');

    messageEl.textContent = message;
    modal.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 1500);
}

// Add an event to the calendar
window.addEvent = function () {
    if (!accessToken) {
        showModal("Please Sign In to add events to your calendar");
        return;
    }
    // Check if the user is logged in
    const eventTitle = document.getElementById("eventTitle")?.value.trim();
    const eventDate = document.getElementById("eventDate")?.value;

    if (!eventTitle || !eventDate) {
        showModal("Please complete all fields");
        return;
    }

    // Validate the date format (YYYY-MM-DD)
    const event = {
        summary: eventTitle,
        start: { dateTime: new Date(eventDate).toISOString(), timeZone: "America/Argentina/Buenos_Aires" },
        end: { dateTime: new Date(new Date(eventDate).getTime() + 60 * 60 * 1000).toISOString(), timeZone: "America/Argentina/Buenos_Aires" }
    };

    // Set the time zone to the user's local time zone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    event.start.timeZone = userTimeZone;
    event.end.timeZone = userTimeZone;

    // Set the event start and end times
    gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event
    }).then(response => {
        showModal("Event added to calendar successfully!");
        document.getElementById("eventTitle").value = "";
        document.getElementById("eventDate").value = "";
    }).catch(error => {
        console.error("Error adding event:", error);
    });
}

// Load the API on page load
window.onload = handleClientLoad;
window.onload = handleClientLoad;
