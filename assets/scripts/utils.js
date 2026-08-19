// [ Time Util ]
var currentTime = new Date().toLocaleTimeString();
var timeElem = document.getElementById("time");

timeElem.innerText = currentTime;

setInterval(() => {
    var currentTime = new Date().toLocaleTimeString();
    if (timeElem.innerText != currentTime)
    {
        timeElem.innerText = currentTime;
    }
}, 1000);


// [ Date Util ]
var currentDate = new Date().toDateString();

