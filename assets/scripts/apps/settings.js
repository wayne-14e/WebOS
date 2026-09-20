// SETTINGS
const settingsIcon = document.querySelectorAll('.settings');

settingsIcon.forEach(button => {
    button.addEventListener("click", () => {
        const settingsElem = document.getElementById("settings_app");
        const settingsHeader = document.getElementById("settings_dragzone");

        settingsElem.style.display = "block";

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        settingsHeader.addEventListener("mousedown", (e) => {
            isDragging = true;

            offsetX = e.clientX - settingsElem.offsetLeft;
            offsetY = e.clientY - settingsElem.offsetTop;
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            settingsElem.style.left = `${e.clientX - offsetX}px`;
            settingsElem.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });

        document.getElementById("close_settings").onclick = () => {
            settingsElem.style.display = "none";
        }

        // Theme selector
        const defaultTheme = document.getElementById("default");
        const oceanTheme = document.getElementById("ocean");
        const twilightTheme = document.getElementById("twilight");

        defaultTheme.addEventListener("click", () => {
            defaultTheme.style.outline = "1px solid var(--accent-secondary)";
            twilightTheme.style.outline = "1px dashed var(--accent-primary)";
            oceanTheme.style.outline = "1px dashed var(--accent-primary)"
            
            document.getElementById("body").style.backgroundImage = "url(./assets/media/bg.png)";
            document.documentElement.style.setProperty('--accent-secondary', '#4bfc2c')
        })

        oceanTheme.addEventListener("click", () => {
            defaultTheme.style.outline = "1px dashed var(--accent-primary)";
            twilightTheme.style.outline = "1px dashed var(--accent-primary)";
            oceanTheme.style.outline = "1px solid var(--accent-secondary)"
            
            document.getElementById("body").style.backgroundImage = "url(./assets/media/bg2.png)";
            document.documentElement.style.setProperty('--accent-secondary', '#FF5500')
        })

        twilightTheme.addEventListener("click", () => {
            defaultTheme.style.outline = "1px dashed var(--accent-primary)";
            oceanTheme.style.outline = "1px dashed var(--accent-primary)"
            twilightTheme.style.outline = "1px solid var(--accent-secondary)";
            
            document.getElementById("body").style.backgroundImage = "url(./assets/media/bg3.png)";
            document.documentElement.style.setProperty('--accent-secondary', '#00FFFF')
        })

        // Layout
        const radio1 = document.getElementById("v1");
        const radio2 = document.getElementById("v2");
        const headerElem = document.getElementById("header");
        const timeUI = document.getElementById("ui");

        document.querySelectorAll('input[name="layout"]').forEach(radio => {
            radio.addEventListener("change", () => {
                if (radio2.checked) {
                    headerElem.style.top = "auto"
                    headerElem.style.bottom = "0"
                    headerElem.style.borderBottom = "none"
                    headerElem.style.borderTop = "var(--accent-primary) 1px solid"
                    timeUI.style.bottom = "auto"
                    timeUI.style.top = "40px"
                }
                if (radio1.checked) {
                    headerElem.style.top = "0"
                    headerElem.style.bottom = "auto"
                    headerElem.style.borderTop = "none"
                    headerElem.style.borderBottom = "var(--accent-primary) 1px solid"
                    timeUI.style.top = "auto"
                    timeUI.style.bottom = "40px"
                }
            })
        });
    });
});