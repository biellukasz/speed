let intervalId = null;
let releaseTimestamp = 0;
let distance = 0;

function start() {
    clearInterval(intervalId); // Clear previous interval if any

    const distanceInput = parseFloat(document.getElementById("distance").value);
    const releaseTimeInput = document.getElementById("releaseTime").value;
    const errorDisplay = document.getElementById("error");

    if (!releaseTimeInput || isNaN(distanceInput) || distanceInput <= 0) {
        errorDisplay.textContent = "Please enter a valid distance and release time.";
        return;
    }

    errorDisplay.textContent = ""; // Clear error

    releaseTimestamp = new Date(releaseTimeInput).getTime(); // Release time in ms
    distance = distanceInput;

    if (releaseTimestamp >= Date.now()) {
        errorDisplay.textContent = "Release time must be in the past.";
        return;
    }

    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;

    calculateSpeed(); // Immediate calculation
    intervalId = setInterval(calculateSpeed, 2000); // Update every 2 seconds
}

function stop() {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById("speedDisplay").innerHTML = "0 km/h";
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

    const timeElapsedHours = timeElapsedMs / (1000 * 60 * 60); // Convert ms to hours
    const speed = distance / timeElapsedHours;

    document.getElementById("speedDisplay").innerHTML = speed.toFixed(2) + " km/h";
    document.getElementById("elapsedTime").innerHTML = `Elapsed Time: ${timeElapsedHours.toFixed(2)} hours`;
}