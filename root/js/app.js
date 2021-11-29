const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const menu = document.getElementsByClassName("navLinks");

document.querySelector(".up-button").onclick = function(event) {
    window.scrollTo(0, 0);
}

document.querySelector("#explorer").onclick = function(event) {
    window.location = "pages/explore.html";
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