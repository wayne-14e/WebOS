// BROWSER
const browserIcon = document.querySelectorAll(".browser");

browserIcon.forEach(button => {
    button.addEventListener("click", () => {
        const browserElem = document.getElementById("browser_app");
        const browserHeader = document.getElementById("browser_dragzone");

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        browserElem.style.display = "block";

        browserHeader.addEventListener("mousedown", (e) => {
            isDragging = true;

            offsetX = e.clientX - browserElem.offsetLeft;
            offsetY = e.clientY - browserElem.offsetTop;
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            browserElem.style.left = `${e.clientX - offsetX}px`;
            browserElem.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        })
        
        document.getElementById("close_browser").onclick = () => {
            browserElem.style.display = "none";
        }
    });
});