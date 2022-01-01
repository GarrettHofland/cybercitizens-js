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
const walletInput = document.getElementById("user-address");

if (finish) {
    finish.disabled = true;
    finish.style.backgroundColor = "grey";
}

var images = ["assets/cybercitizens/0.png", "assets/cybercitizens/3.png", "assets/cybercitizens/590.png", "assets/cybercitizens/1873.png"];
var x = 0;

if (document.querySelector("#ergopixel-img")) {
    setInterval(displayNextImage, 3000);
}

document.querySelector(".up-button").onclick = function (event) {
    window.scrollTo(0, 0);
}

if (document.querySelector(".address")) {
    document.querySelector(".address").onclick = function () {
        copyToClipboard("9hfNCyqJsCSku8HXrV17Y6AaQciCAwkwx4M49imdWjRaTX22Mvz");
        alert("Address copied to clipboard!");
    }
}

if (document.querySelector("#explorer")) {
    document.querySelector("#explorer").onclick = function (event) {
        window.location = "pages/explore.html";
    }
}

if (document.querySelector("#game")) {
    document.getElementById("game").disabled = "true";
    document.getElementById("game").style.color = "black";
    document.getElementById("game").style.backgroundColor = "grey";
    //     document.querySelector("#game").onclick = function (event) {
    //     window.location = "pages/cyberdinos-game.html";
    // }
}

if (exit && clear && finish && wallet) {
    exit.addEventListener('click', closeWalletMenu);
    clear.addEventListener('click', clearWalletAddress);
    finish.addEventListener('click', setWalletAddress);
    walletInput.addEventListener('change', validateWalletAddress);
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

if (walletButton) {
    walletButton.addEventListener('click', () => {
        console.log(getWalletAddress());
        if (getWalletAddress() != null) {
            walletInput.value = getWalletAddress();
            walletOutput.textContent = "Wallet set."
            walletOutput.style.color = "green";
        }
        walletMenu.classList.toggle("open");
    });
}

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
    if (getWalletAddress() == null) {
        walletOutput.textContent = "Invalid wallet address.";
        walletOutput.style.color = "red";
        walletInput.value = "";
    }
}

function clearWalletAddress() {
    removeWalletAddress();
    walletOutput.textContent = "Wallet information cleared.";
    walletOutput.style.color = "green";
    walletInput.value = "";
    finish.disabled = true;
    finish.style.backgroundColor = "grey";
    console.log(finish.disabled);
}

function setWalletAddress() {
    localStorage.setItem("userWallet", walletInput.value);
    walletOutput.textContent = "Wallet set.";
    walletOutput.style.color = "green";
}

function removeWalletAddress() {
    localStorage.removeItem("userWallet");
}

function getWalletAddress() {
    return localStorage.getItem("userWallet");
}

function validateWalletAddress() {
    console.log("Validate firing");
    if (walletInput.value.match(/^9[A-Za-z0-9]{50}/)) {
        walletOutput.textContent = "Wallet address valid.";
        walletOutput.style.color = "green";
        finish.disabled = false;
        finish.style.backgroundColor = "#258ae8";
    } else {
        walletOutput.textContent = "Invalid wallet address.";
        walletOutput.style.color = "red";
        finish.disabled = true;
        finish.style.backgroundColor = "grey";
    }
}