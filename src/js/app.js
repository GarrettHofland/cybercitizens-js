const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const menu = document.getElementsByClassName("navLinks");
const scrollUp = document.getElementById("scrollTop");
const images = ["assets/cybercitizens/0.png",
 "assets/cybercitizens/3.png",
 "assets/cybercitizens/590.png", 
 "assets/cybercitizens/1873.png",
 "assets/cybercitizens/1852.png",
 "assets/cybercitizens/3.png",
 "assets/cybercitizens/7.png",
 "assets/cybercitizens/590.png",
];

let x = 0;

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

if(document.getElementById("unsold")) {
    getUnsold();
}

// if(document.getElementById("dino-desktop") && document.getElementById("dino-mobile")) {
//     // document.getElementById("dino-desktop").href = "javascript:void(0)";
//     // document.getElementById("dino-mobile").href = "javascript:void(0)";
// }


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