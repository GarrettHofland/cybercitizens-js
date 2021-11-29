const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const menu = document.getElementsByClassName("navLinks");

var images = ["assets/cybercitizens/086.png", "assets/cybercitizens/108.png", "assets/cybercitizens/173.png", "assets/cybercitizens/206.png"];
var x = 0;

if(document.querySelector("#ergopixel-img")){
    setInterval(displayNextImage, 3000);
}

document.querySelector(".up-button").onclick = function(event) {
    window.scrollTo(0, 0);
}

if(document.querySelector("#explorer")){
    document.querySelector("#explorer").onclick = function(event) {
        window.location = "pages/explore.html";
    }
}

function exitMenuOnLinkClick() {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });
};

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });
    links.forEach(link => {
        link.addEventListener('click', exitMenuOnLinkClick);
    });
});

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("ergopixel-img").src = images[x];
}