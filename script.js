let data;
let currentIndex = 0;

// Fetch JSON file with image data
fetch('loomad.json')
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
    const filteredData = data.filter(item => item.kategooria === kategooria.textContent);
        fullImage.src = filteredData[index].path;
        nimi.textContent = "Nimi: " + filteredData[index].nimi;
        vanus.textContent = "Nimi: " +  filteredData[index].vanus;
        omanik.textContent = filteredData[index].omanik;
        fakt.textContent = filteredData[index].fakt;

        // Highlight selected thumbnail in gallery
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, i) => {
            if (i === index) {
                thumbnail.style.border = '4px solid #1B4965';
            } else {
                thumbnail.style.border = '4px solid transparent';
            }
        });

        currentIndex = index;
    
}

function createGallery() {
    const gallery = document.getElementById('gallery');

    const filteredData = data.filter(item => item.kategooria === kategooria.textContent);

    // Create thumbnail for each image
    filteredData.forEach((item, index) => {
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
