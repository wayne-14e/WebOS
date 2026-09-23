import('./utils.js');
import('./apps/to_do.js');
import('./apps/browser.js');
import('./apps/settings.js');
import('./apps/notepad.js');
import('./apps/gallery.js');
import('./apps/clock.js');
import('./apps/calc.js');
import('./apps/console.js')


// [ Welcome ]

const startBtn = document.getElementById("start").onclick = () => {
    const darkElem = document.getElementById("dark");
    const welcomeScreen = document.getElementById("welcome");

    darkElem.style.display = "none";
    welcomeScreen.style.display = "none";
}

// [ Menu Window ]

const allAppsWindow = document.getElementById("all_apps_window");
const menuDragzone = document.getElementById("menu_dragzone");
const menuApp = document.getElementById("all_apps").onclick = () => {
    allAppsWindow.style.display = "block";

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;


    menuDragzone.addEventListener("mousedown", (e) => {
        isDragging = true;

        offsetX = e.clientX - allAppsWindow.offsetLeft;
        offsetY = e.clientY - allAppsWindow.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        allAppsWindow.style.left = `${e.clientX - offsetX}px`;
        allAppsWindow.style.top = `${e.clientY - offsetY}px`;
    })

    document.addEventListener("mouseup", () => {
        isDragging = false;
    })

    document.getElementById("close_menu").onclick = () => {
        allAppsWindow.style.display = "none";
    }
}
