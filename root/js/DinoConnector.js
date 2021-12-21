var accessGranted = false;
var ConectedAddress;
var script = document.createElement("script"); script.type = "module"; script.src = "../js/DinoGame.js";
var LBScript = document.createElement("script"); LBScript.type = "module"; LBScript.src = "../js/LeaderBoard.js";
let DinoContainer = document.getElementById("dino-game");


window.onload = function(){ 
    if(getWalletAddress() != null) {
        ConectedAddress = getWalletAddress();
      }
      else {
        ConectedAddress = "N/A";
      }
      addPhaser();
}   

export {ConectedAddress};

function addPhaser() {   
    document.getElementById("dino-game").appendChild(script);
    document.head.appendChild(LBScript);
    document.getElementById("loading-message").style.display = "none";
}

function getWalletAddress() {
    return localStorage.getItem("userWallet");
}