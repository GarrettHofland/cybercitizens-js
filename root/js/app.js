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
const scrollUp = document.getElementById("scrollTop");
let r1 = null;
let r2 = null;

if(document.querySelector(".container-r1") && document.querySelector(".container-r2")) {
    r1 = document.querySelector(".container-r1");
    r2 = document.querySelector(".container-r2");
    r2.style.display = "none";
}

if(document.getElementById("roadmap-switch")) {
    document.getElementById("roadmap-switch").addEventListener('click', switchRoadmap);
}

if(scrollUp) {
    scrollUp.addEventListener('click', () => {
        window.scrollTo(0,0);
    });
}

if(document.getElementById("mint")) {
    console.log("exists");
    document.getElementById("mint").href = "javascript:void(0)";
    console.log(document.getElementById("mint").href);
}

const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -200px 0px"
};

const appearOnScroll = new IntersectionObserver( function(
    entries,
    displayOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    });
}, 
appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

if (finish) {
    finish.disabled = true;
    finish.style.backgroundColor = "grey";
}

if(document.getElementById("unsold")) {
    getUnsold();
}

if(document.getElementById("dino-desktop") && document.getElementById("dino-mobile")) {
    // document.getElementById("dino-desktop").href = "javascript:void(0)";
    // document.getElementById("dino-mobile").href = "javascript:void(0)";
}

var images = ["assets/cybercitizens/0.png",
 "assets/cybercitizens/3.png",
 "assets/cybercitizens/590.png", 
 "assets/cybercitizens/1873.png",
 "assets/cybercitizens/1852.png",
 "assets/cybercitizens/3.png",
 "assets/cybercitizens/7.png",
 "assets/cybercitizens/590.png",
];
var x = 0;

if (document.querySelector("#ergopixel-img")) {
    setInterval(displayNextImage, 500);
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
    walletInput.addEventListener('input', validateWalletAddress);
}

if (walletButton) {
    // console.log("Wallet button exists");
    walletButton.addEventListener('click', () => {
        if (getWalletAddress() != null) {
            walletInput.value = getWalletAddress();
            walletOutput.textContent = "Wallet set."
            walletOutput.style.color = "green";
        }
        walletMenu.classList.toggle("open");
    });
}

function switchRoadmap() {
    if(r2.style.display == "none") {
        r1.style.display = "none";
        r2.style.display = "block";
        document.getElementById("roadmap-switch").innerText = "Roadmap 1.0";
    } else {
        r1.style.display = "block";
        r2.style.display = "none";
        document.getElementById("roadmap-switch").innerText = "Roadmap 2.0";
    }

    document.getElementById("roadmap").scrollIntoView();
};

async function getUnsold() {
    await fetch(`https://ergnomes-server.net/api/checkUnsold`)
    .then(res => res.json())
    .then(res => {
      document.getElementById("unsold").innerHTML = "<span>" + res["count"]  + "</span> ready to sell!";
    })
    .catch(error => {
      console.log(error);
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
    // console.log(finish.disabled);
}

function setWalletAddress() {
    localStorage.setItem("userWallet", walletInput.value);
    walletOutput.textContent = "Wallet set.";
    walletOutput.style.color = "green";
    setTimeout(window.location.reload(true), 0.5)
}

function removeWalletAddress() {
    localStorage.removeItem("userWallet");
}

function getWalletAddress() {
    return localStorage.getItem("userWallet");
}

function validateWalletAddress() {
    // console.log("Validate firing");
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