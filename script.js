let data;
let thumbnails;
let currentIndex = 0;

//  JSON faili võtmine
fetch('loomad.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        // Gallerii tegemine
        createGallery();

        // Pildi ja pealkirja näitamine
        showImage(currentIndex);
        
        // Galerii pisipildite loomine
        thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => showImage(index));
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));
// Pildi ja teksti näitamine
function showImage(index) {
    const fullImage = document.getElementById('full-image');
    const nimi = document.getElementById('nimi');
    const vanus = document.getElementById('vanus');
    const omanik = document.getElementById('omanik');
    const fakt = document.getElementById('fakt');
    const kategooria = document.getElementById('kategooria');

    // Pildi allika ja pealkirja värskendamine
    const filteredData = data.filter(item => item.kategooria === kategooria.textContent);
        fullImage.src = filteredData[index].path;
        nimi.textContent = "Nimi: " + filteredData[index].nimi;
        vanus.textContent = filteredData[index].vanus;
        omanik.textContent = filteredData[index].omanik;
        fakt.textContent = filteredData[index].fakt;

        // Pisipildi välja toomine galeriist
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
// Galerii funktsioon
function createGallery() {
    const gallery = document.getElementById('gallery');

    const filteredData = data.filter(item => item.kategooria === kategooria.textContent);

    // Pisipiltide loomine iga pildi kohta
    filteredData.forEach((item, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = item.path;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.classList.add('thumbnail');
        gallery.appendChild(thumbnail);
    });
}



// Edasi/tagasi nuppu funktsioonid
function prevImage() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    showImage(currentIndex);
}
