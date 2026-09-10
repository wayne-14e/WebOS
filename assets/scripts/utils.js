// [ Time ]
var currentTime = new Date().toLocaleTimeString();
var timeElem = document.getElementById("time");

timeElem.innerText = "⌚ " + currentTime;

setInterval(() => {
    var currentTime = new Date().toLocaleTimeString();
    if (timeElem.innerText != currentTime)
    {
        timeElem.innerText = "⌚ " + currentTime;
    }
}, 1000);


// [ Date ]

var currentDate = new Date().toDateString();
var dateElem = document.getElementById("date");

dateElem.innerText = "📆 " + currentDate;


// [ Battery ]



setInterval(() => {
    var batteryElem = document.getElementById("battery");
    navigator.getBattery().then((battery) => {
        const batteryLevel = battery.level * 100;
        var isCharging = battery.charging;
    
        if (batteryLevel > 40) {
            var batteryIcon = '🔋';
        } else {
            var batteryIcon = '🪫';
        }
    
        if (isCharging) {
            var chargingIcon = "⚡";
        } else {
            var chargingIcon = '';
        }
    
        batteryElem.innerText = batteryIcon + batteryLevel + chargingIcon;
    })    
}, 1000);



// [ Security ]

setInterval(() => {
    var securityElem = document.getElementById("security");
    
    const isSecure = window.isSecureContext;
    
    if (isSecure) {
        securityElem.innerText = "🛡️☑️"
    } else {
        securityElem.innerText = "🛡️❌"
    }
}, 1000)
