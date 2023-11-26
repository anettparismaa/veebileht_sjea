let data;
let currentIndex = 0;

// Fetch JSON file with image data
fetch('imageData.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        // Initialize the full-size image and caption
        showImage(currentIndex);
        // Create gallery
        createGallery();

        // Set up event listeners for gallery thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => showImage(index));
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));

function showImage(index) {
    const fullImage = document.getElementById('full-image');
    const nimi = document.getElementById('nimi');
    const vanus = document.getElementById('vanus');
    const omanik = document.getElementById('omanik');
    const fakt = document.getElementById('fakt');
    const kategooria = document.getElementById('kategooria');

    // Update full-size image source and caption
    fullImage.src = data[index].path;
    nimi.textContent = data[index].nimi;
    vanus.textContent = data[index].vanus;
    omanik.textContent = data[index].omanik;
    fakt.textContent = data[index].fakt;

    // Highlight selected thumbnail in gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, i) => {
        if (i === index) {
            thumbnail.style.border = '2px solid #333';
        } else {
            thumbnail.style.border = '2px solid transparent';
        }
    });

    currentIndex = index;
}

function createGallery() {
    const gallery = document.getElementById('gallery');

    // Create thumbnail for each image
    data.forEach((item, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = item.path;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.classList.add('thumbnail');
        gallery.appendChild(thumbnail);
    });
}

function prevImage() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % data.length;
    showImage(currentIndex);
}
