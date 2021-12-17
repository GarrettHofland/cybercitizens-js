const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const menu = document.getElementsByClassName("navLinks");
const walletButton = document.getElementById("wallet");
const walletMenu = document.getElementById("wallet-connector");
const walletOutput = document.getElementById("wallet-output");
const exit = document.getElementById("exit");
const clear = document.getElementById("clear");
const finish = document.getElementById("finish");

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
    document.getElementById("game").disabled = "true";
    document.getElementById("game").style.color ="black";
    document.getElementById("game").style.backgroundColor ="grey";
}

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });
    links.forEach(link => {
        link.addEventListener('click', exitMenuOnLinkClick);
    });
});

exit.addEventListener('click', closeWalletMenu);
clear.addEventListener('click', clearWalletAddress);

walletButton.addEventListener('click', () => {
    walletMenu.classList.toggle("open");
});

function exitMenuOnLinkClick() {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });
};

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("ergopixel-img").src = images[x];
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function closeWalletMenu() {
    walletMenu.classList.toggle("open");
    walletOutput.textContent = "Invalid wallet address.";
    walletOutput.style.color = "red";
}

function clearWalletAddress() {
    walletOutput.textContent = "Wallet information cleared.";
    walletOutput.style.color = "green";
}