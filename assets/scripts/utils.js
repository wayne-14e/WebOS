// [ Time ]
const timeElem = document.getElementById("time");
let currentTime = new Date().toLocaleTimeString();

timeElem.innerText = "⌚ " + currentTime;

setInterval(() => {
    let currentTime = new Date().toLocaleTimeString();
    timeElem.innerText = "⌚ " + currentTime;
}, 1000);


// [ Date ]

const dateElem = document.getElementById("date");
let currentDate = new Date().toDateString();

dateElem.innerText = "📆 " + currentDate;


// [ Battery ]

const batteryElem = document.getElementById("battery");

function updateBatteryUI(battery) {
    const batteryLevel = Math.round(battery.level * 100);
    const isCharging = battery.charging;

    const batteryIcon = batteryLevel > 40 ? '🔋' : '🪫';
    const chargingIcon = isCharging ? '⚡' : '';

    batteryElem.innerText = batteryIcon + batteryLevel + '%' + chargingIcon;
}

navigator.getBattery().then((battery) => {
    updateBatteryUI(battery);

    battery.addEventListener('levelchange', () => {
        updateBatteryUI(battery);
    });

    battery.addEventListener('chargingchange', () => {
        updateBatteryUI(battery);
    });
});


// [ Security ]
const securityElem = document.getElementById("security");
const isSecure = window.isSecureContext;

securityElem.innerText = isSecure ? "🛡️☑️" : "🛡️❌";
