var accessGranted = false;
var ConectedAddress;
var script = document.createElement("script"); script.type = "module"; script.src = "../js/DinoGame.js";
var LBScript = document.createElement("script"); LBScript.type = "module"; LBScript.src = "../js/LeaderBoard.js";
var DinoSkins = document.createElement("script");  DinoSkins.type = "module"; DinoSkins.src = "../js/DinoSelector.js";
let DinoContainer = document.getElementById("dino-game");


window.onload = function(){ 
  ergo_request_read_access();
    //if(getWalletAddress() != null) {
      if(ergo_check_read_access()){
        ConectedAddress = getWalletAddress();
        addPhaser();
      }
      else {
        ConectedAddress = "N/A";
        addPhaser();
      }
}   

export {ConectedAddress};

function addPhaser() {   
    document.getElementById("dino-game").appendChild(script);
    document.head.appendChild(LBScript);
    document.getElementById("dino-game").appendChild(DinoSkins);
    document.getElementById("loading-message").style.display = "none";
}

function getWalletAddress() {
    return localStorage.getItem("userWallet");
    //return "9hJJksEkDcAznbezGWZ8qjNnqq46HNWHMyuj18BQpavatKJqRFY";

}