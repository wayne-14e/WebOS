const consoleIcon = document.getElementById("console");
const consoleApp = document.getElementById("console_app");

consoleIcon.onclick = () => {
    consoleApp.style.display = "block";
}

document.getElementById("close_console").onclick = () => {
    consoleApp.style.display = "none";
}

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

document.getElementById("console_dragzone").addEventListener('mousedown', (e) => {
    isDragging = true;

    offsetX = e.clientX - consoleApp.offsetLeft;
    offsetY = e.clientY - consoleApp.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    consoleApp.style.left = `${e.clientX - offsetX}px`;
    consoleApp.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

const consoleInput = document.getElementById("console_input");
const consoleMain = document.getElementById("console_main");
const userInput = document.getElementById("user_input");

consoleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let command = consoleInput.value;
        let result = '';
        if (command == 'clear' || command == 'CLEAR') {
            document.querySelectorAll('.console_output').forEach(el => el.remove());
        } else if (command == 'help' || command == 'HELP') {
            result = "Available Commands: help, clear, echo, date.";
        } else if (command.startsWith('echo ') || command.startsWith('ECHO ')) {
            result = consoleInput.value.slice(5);
        } else if (command == 'date' || command == 'DATE') {
            result = new Date().toString();
        }
        else {
            result = `Unknown command: ${command}`;
        }

        let output = `<span class="console_output">${result}</span>`;
        consoleMain.insertAdjacentHTML('beforeend', output);
        consoleMain.appendChild(userInput);
        consoleInput.value = '';
    }
});