// notepad

const notepadIcon = document.getElementById("notepad");
const notepadApp = document.getElementById("notepad_app");
const notepadDragzone = document.getElementById("notepad_dragzone");

notepadIcon.onclick = () => {
    notepadApp.style.display = "block"

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    notepadDragzone.addEventListener("mousedown", (e) => {
        isDragging = true;

        offsetX = e.clientX - notepadApp.offsetLeft;
        offsetY = e.clientY - notepadApp.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        notepadApp.style.left = `${e.clientX - offsetX}px`;
        notepadApp.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.getElementById("close_notepad").onclick = () => {
        notepadApp.style.display = "none";
    }

    // Main Functionality

    const downloadBtn = document.getElementById("download_notepad");
    const clearText = document.getElementById("clear_notepad");
    const boldText = document.getElementById("text_bold");
    const italicText = document.getElementById("text_italic");
    const underlineText = document.getElementById("text_underline");
    const strikethroughText = document.getElementById("text_strikethrough");
    const textArea = document.getElementById("write_field");
    const renameBtn = document.getElementById("rename");
    const title = document.getElementById("notepad_title");

    const quill = new Quill('#write_field', {
        theme: 'snow',
        modules: {
            toolbar: false
        },
        formats: ['bold', 'italic', 'underline', 'strike']
    })

    downloadBtn.addEventListener("click", () => {
        let text = textArea.innerHTML
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url
        a.download = `${title.innerHTML}_wwos.html`
        document.body.appendChild(a)
        a.click();
        document.body.removeChild(a)
        URL.revokeObjectURL(url);
    });

    clearText.addEventListener("click", () => {
        quill.setContents([]);
        boldText.classList.remove('active');
        italicText.classList.remove('active');
        underlineText.classList.remove('active');
        strikethroughText.classList.remove('active');
    });

    function toggleFormat(formatName, btnElement) {
        const range = quill.getSelection();
        if (range) {
            const currentFormat = quill.getFormat(range)
            quill.format(formatName, !currentFormat[formatName])

            btnElement.classList.toggle('active')
        }
    }

    boldText.onclick = () => { toggleFormat('bold', boldText) };
    italicText.onclick = () => { toggleFormat('italic', italicText) };
    underlineText.onclick = () => { toggleFormat('underline', underlineText) };
    strikethroughText.onclick = () => { toggleFormat('strike', strikethroughText) };

    renameBtn.onclick = () => {
        let name = title.innerHTML
        let inputName = `<input type="text" value="${name}" id="new_title">`
        title.innerHTML = inputName

        let inputElem = document.getElementById("new_title");

        inputElem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                name = inputElem.value
                title.innerHTML = name;
            }
        });
        document.addEventListener('mousedown', (e) => {
            if (inputElem !== e.target && !inputElem.contains(e.target) && document.activeElement === inputElem) {
                name = inputElem.value
                title.innerHTML = name;
            }
        })
    }
}