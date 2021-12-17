const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const menu = document.getElementsByClassName("navLinks");
const walletButton = document.getElementById("wallet");
const walletMenu = document.getElementById("wallet-connector");

var images = ["assets/cybercitizens/0.png", "assets/cybercitizens/3.png", "assets/cybercitizens/590.png", "assets/cybercitizens/1873.png"];
var x = 0;

if(document.querySelector("#ergopixel-img")){
    setInterval(displayNextImage, 3000);
}

document.querySelector(".up-button").onclick = function(event) {
    window.scrollTo(0, 0);
}

if(document.querySelector(".address")) {
    document.querySelector(".address").onclick = function() {
        copyToClipboard("9iPtqBeeTMuAX4rkQqpHti2BKyd8ZXYRUuqynWJm3ShNpoSyowT");
        alert("Address copied to clipboard!");
    }
}

if(document.querySelector("#explorer")){
    document.querySelector("#explorer").onclick = function(event) {
        window.location = "pages/explore.html";
    }
}

if(document.querySelector("#game")){
    // document.querySelector("#game").onclick = function(event) {
    //     window.location = "pages/cyberdinos-game.html";
    // }
    document.getElementById("game").disabled = "true";
    document.getElementById("game").style.color ="black";
    document.getElementById("game").style.backgroundColor ="grey";
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

walletButton.addEventListener('click', () => {
    walletMenu.classList.toggle("open");
});

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("ergopixel-img").src = images[x];
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}