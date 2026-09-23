const galleryIcon = document.getElementById("gallery");
const galleryApp = document.getElementById("gallery_app");
const galleryDragzone = document.getElementById("gallery_dragzone");

galleryIcon.onclick = () => {
    galleryApp.style.display = "block";

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    galleryDragzone.addEventListener('mousedown', (e) => {
        isDragging = true;

        offsetX = e.clientX - galleryApp.offsetLeft;
        offsetY = e.clientY - galleryApp.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        galleryApp.style.left = `${e.clientX - offsetX}px`;
        galleryApp.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.getElementById("close_gallery").onclick = () => {
        galleryApp.style.display = "none";
    }

    // Downloading photos
    const downloadBtn = document.querySelectorAll('.download_photo');

    async function downloadImage(imgSrc, fileName) {
        const response = await fetch(imgSrc);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    downloadBtn.forEach(button => {
        button.addEventListener('click', async (e) => {
            let image = e.target.parentElement.querySelector('img');
            if (image) {
                const filename = image.src.split('/').pop() || 'photo_wwos.png';
                await downloadImage(image.src, filename);
            }
        });
    });

    // Custom photo upload
    const customPhotosElem = document.getElementById('custom_photos');
    const uploadElem = document.getElementById('photo_upload');

    uploadElem.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let imageName = e.target.files[0].name;
            let newImage = URL.createObjectURL(e.target.files[0]);

            let newLi = `<li>
                            <img src="${newImage}" alt="custom_image">
                            <span>${imageName}</span>
                            <button class="delete_custom_image">❌</button>
                        </li>`
            customPhotosElem.insertAdjacentHTML('beforeend', newLi);
        }

        document.querySelectorAll('.delete_custom_image').forEach(button => {
            button.addEventListener('click', (e) => {
                let clickedImg = e.target;
                clickedImg.closest('li').remove();
            });
        });
    });
}