var accessGranted = false;
var ConectedAddress;
var phaserScript = document.createElement("script");
var script = document.createElement("script");
phaserScript.type = "text/javascript";
phaserScript.src = "https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js";
script.type = "module";
script.src = "../js/DinoGame.js";
let container = document.getElementById("dino-game");


window.onload = function(){  
    ergo_request_read_access().then(access => {
        if(access) {
            ergo.get_used_addresses().then(addresses => {
                    addresses.forEach(addr => {
                        ConectedAddress = addr;
                })
            }).then(addr => {
                addPhaser();
              });
        }
        else {
            console.log("Access not Granted");
        }
    });
}   

export {ConectedAddress};

function addPhaser() {    
    // var gameFrame = document.createElement('iframe');
    // gameFrame.src = "cyberdinos.html"; // Link to the CyberDinos.html
    // container.innerHTML = '<iframe src="cyberdinos.html"></iframe>';

    container.appendChild(script);
    document.getElementById("loading-message").style.display = "none";
}