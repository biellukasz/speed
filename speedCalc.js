let intervalId = null;
let releaseTimestamp = 0;
let distanceInMeters = 0;

function start() {
    clearInterval(intervalId); // Clear any previous interval

    const distanceInput = parseFloat(document.getElementById("distance").value);
    const releaseTimeInput = document.getElementById("releaseTime").value;
    const errorDisplay = document.getElementById("error");

    if (!releaseTimeInput || isNaN(distanceInput) || distanceInput <= 0) {
        errorDisplay.textContent = "Please enter a valid distance and release time.";
        return;
    }

    errorDisplay.textContent = ""; // Clear error message

    releaseTimestamp = new Date(releaseTimeInput).getTime(); // Release time in ms
    distanceInMeters = distanceInput * 1000; // Convert km to meters

    if (releaseTimestamp >= Date.now()) {
        errorDisplay.textContent = "Release time must be in the past.";
        return;
    }

    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;

    calculateSpeed(); // First calculation immediately
    intervalId = setInterval(calculateSpeed, 2000); // Update every 2 seconds
}

function stop() {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById("speedDisplay").innerHTML = "0 m/min";
    document.getElementById("elapsedTime").innerHTML = "";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
}

function calculateSpeed() {
    const now = Date.now();
    const timeElapsedMs = now - releaseTimestamp;

    if (timeElapsedMs <= 0) {
        document.getElementById("speedDisplay").innerHTML = "Waiting for time to pass...";
        return;
    }

    const timeElapsedMinutes = timeElapsedMs / (1000 * 60); // Convert ms to minutes
    const speed = distanceInMeters / timeElapsedMinutes; // m/min

    document.getElementById("speedDisplay").innerHTML = speed.toFixed(2) + " m/min";
    document.getElementById("elapsedTime").innerHTML = `Elapsed Time: ${timeElapsedMinutes.toFixed(2)} minutes`;
}