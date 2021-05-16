const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "q8_M4UXSLhTxwfcgqfpImELC8Hq0xhQrSV6a4PCC1A4"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=landscape`;

// Check if all the images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Get Images from Unsplash API
async function getImages (){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json()
        displayImages();
    } catch (err){
        console.log(err)
    }
}

// Helper Function for set Attributes

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


// Create Elements to display the images on the UI
function displayImages(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(totalImages)
    photosArray.forEach((image) => {
        // Create a <a> link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:image.links.html,
            target:"_blank"
        })
        // Create a <img>
        const img = document.createElement('img');
        setAttributes(img, {
            src:image.urls.regular,
            alt:image.alt_description,
            title:image.alt_description
        })

        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then both to the image container Element
        item.appendChild(img)
        imageContainer.appendChild(item)
    });
}

// Check to see if Scrolling near bottom of the page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 && ready){
        ready=false
        getImages()
    }
})
// On Load
getImages()