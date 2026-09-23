const calcIcon = document.getElementById("calc");
const calcApp = document.getElementById("calc_app");
const calcDrag = document.getElementById("calc_dragzone");
const calcClose = document.getElementById("close_calc");

const calcInput = document.getElementById('calc_input');
const calcButtons = document.getElementsByClassName('calc_button');


calcIcon.onclick = () => {
    calcApp.style.display = "block";

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    calcDrag.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - calcApp.offsetLeft;
        offsetY = e.clientY - calcApp.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        calcApp.style.left = `${e.clientX - offsetX}px`;
        calcApp.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

calcClose.onclick = () => {
    calcApp.style.display = "none";
}

// Main functionality

document.getElementById("delete_char").onclick = () => {
    calcInput.value = calcInput.value.slice(0, -1);
};

document.getElementById("equal").onclick = () => {
    let expression = calcInput.value;

    expression = expression.replace(/[^0-9+\-*/.]/g, '');

    try {
        calcInput.value = eval(expression);
    } catch (e) {
        calcInput.value = "Error";
    }
};

Array.from(calcButtons).forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText == '=') return;
        calcInput.value += button.innerText;
    });
});
