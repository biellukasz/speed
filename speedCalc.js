let startTimeAgo = document.getElementById("start").value;
let releasingTime = new Date().getTime() / (1000 * 60) - startTimeAgo;
let distance = document.getElementById("distance").value;

let speed = 0;
function start() {
    startTimeAgo = document.getElementById("start").value;
    releasingTime = new Date().getTime() / (1000 * 60) - startTimeAgo;
    distance = document.getElementById("distance").value;
    setInterval(calculateSpeed, 2000);  //calls calculateSpeed function every second
}


function calculateSpeed() {
     // getting value of start time from input field
    console.log("start time: " + startTimeAgo);
    console.log("releasing time: " + releasingTime);
    console.log("distance: " + distance);
    if(speed === 0) {
    speed = distance / startTimeAgo; // calculate speed
    } else {
        let currentTime = new Date().getTime() / (1000 * 60);
        let time = currentTime - releasingTime;
        speed = distance / time;

    }
    document.getElementById("speedDisplay").innerHTML = speed + " m/min";
}
