import('./utils.js');



// [ Welcome ]

const startBtn = document.getElementById("start").onclick = () => {
    const darkElem = document.getElementById("dark");
    const welcomeScreen = document.getElementById("welcome");

    darkElem.style.display = "none";
    welcomeScreen.style.display = "none";
}


//  [ Apps ]

// to_do

const toDoIcon = document.getElementById("todo").onclick = () => {
    const toDoElem = document.getElementById("to_do_app");
    const toDoHeader = document.getElementById("dragzone");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    toDoElem.style.display = "block";

    toDoHeader.addEventListener("mousedown", (e) => {
        isDragging = true;

        offsetX = e.clientX - toDoElem.offsetLeft;
        offsetY = e.clientY - toDoElem.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        toDoElem.style.left = `${e.clientX - offsetX}px`;
        toDoElem.style.top = `${e.clientY - offsetY}px`;
    })

    document.addEventListener("mouseup", () => {
        isDragging = false;
    })

    document.getElementById("close_to_do").onclick = () => {
        toDoElem.style.display = "none";
    }

    // Main Funtionality

    const inputElem = document.getElementById("to_do_input");
    const addTask = document.getElementById("add_task");
    const tasksBox = document.getElementById("tasks");

    addTask.onclick = () => {
        if (inputElem.value != "") {
            let task = `<li class="task"><span class="task_text">${inputElem.value}</span><div><button id="task_done">✔️</button><button id="delete_task">❌</button></div></li>`;
            tasksBox.insertAdjacentHTML('beforeend', task);
        }
        inputElem.value = "";
    }

    tasksBox.addEventListener("click", (event) => {
        const clickedElem = event.target;

        if (clickedElem.id == "delete_task") {
            clickedElem.closest("li").remove();
        }
        if (clickedElem.id == "task_done") {
            var taskText = clickedElem.closest("li").querySelector(".task_text");
            if (taskText.style.textDecoration == "line-through") {
                taskText.style.textDecoration = "none";
            } else {
                taskText.style.textDecoration = "line-through";
            }
        }
    });
}

