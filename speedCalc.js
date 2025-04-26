let intervalId = null;
let startTimeAgo = 0;
let releasingTime = 0;
let distance = 0;

function start() {
    clearInterval(intervalId); // Clear previous interval if any

    const distanceInput = document.getElementById("distance").value;
    const startInput = document.getElementById("start").value;
    const errorDisplay = document.getElementById("error");

    distance = parseFloat(distanceInput);
    startTimeAgo = parseFloat(startInput);

    if (isNaN(startTimeAgo) || isNaN(distance) || startTimeAgo < 0 || distance <= 0) {
        errorDisplay.textContent = "Please enter valid positive numbers for distance and time.";
        return;
    }

    errorDisplay.textContent = ""; // Clear error message

    releasingTime = new Date().getTime() / (1000 * 60); // Current time in minutes

    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;

    calculateSpeed(); // Immediate first calculation
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
    const currentTime = new Date().getTime() / (1000 * 60); // Current time in minutes
    const timeElapsed = currentTime - releasingTime + startTimeAgo;

    if (timeElapsed <= 0) {
        document.getElementById("speedDisplay").innerHTML = "Waiting for time to pass...";
        return;
    }

    const speed = distance / timeElapsed;

    document.getElementById("speedDisplay").innerHTML = speed.toFixed(2) + " m/min";
    document.getElementById("elapsedTime").innerHTML = `Elapsed Time: ${timeElapsed.toFixed(2)} minutes`;
}
