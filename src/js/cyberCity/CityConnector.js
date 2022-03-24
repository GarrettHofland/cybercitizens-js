var accessGranted = false;
var ConectedAddress;
var script = document.createElement("script"); script.type = "module"; script.src = "../js/cyberCity/CyberCity.js";
var hasApt = true; //Should be false
var AptInfo = [];


window.onload = function(){ 

    loadGameInfo();
}   

const loadGameInfo = async () => {
    await ergo_request_read_access();
    ergo_check_read_access();
  
    if(ergo_check_read_access()){
      ConectedAddress = await ergo.get_change_address();
      //ConectedAddress = "9hJJksEkDcAznbezGWZ8qjNnqq46HNWHMyuj18BQpavatKJqRFY";
      LoadAvailableBuildings();
    }
    else {
      ConectedAddress = "N/A";
    }
  
  }

export {ConectedAddress , hasApt , AptInfo};

function addPhaser() {   
    document.getElementById("city-game").appendChild(script);
    document.getElementById("loading-message").style.display = "none";
}

//############################################## Json Loading ###############################################################
var Myjson;
var explorerApi = 'https://api.ergoplatform.com/api/v0'
var explorerApiV1 = 'https://api.ergoplatform.com/api/v1'
var auctionsRaw;

//Checks the users wallet and sets correct buidings available
function LoadAvailableBuildings()
{
    //Get JSON Info
    $.getJSON("../data/Apartments.json", function (json) {
        var Myjson = [];
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var item = json[key];
                Myjson.push({
                    AptNumber: item.AptNumber,
                    ID: item.ID,
                    Size: item.Size
                });            
            }
        }
        AptInfo.push(Myjson[0]); // ------------------------------ For Testing Only ----------------------------------
        getAuctionsRaw(ConectedAddress , Myjson);
    });
}

// Get every NFT able to be auctioned from the wallet 
function getAuctionsRaw(walletAddress , arraya) {
    getActiveAuctions(walletAddress)
    .then(res => {
      auctionsRaw = res;
      buildAuctions(arraya);
    });
}

// Get active auctions from supplied address
function getActiveAuctions(addr) {
    return getRequest(`/boxes/unspent/byAddress/${addr}?limit=500`, explorerApiV1)
        .then(res => res.items)
        .then((boxes) => boxes.filter((box) => box.assets.length > 0));
}

// Function for appending requests to the exploreAPI URL
function getRequest(url, api = explorerApi) {
    return fetch(api + url).then(res => res.json())
}

// Build the list of NFTs currently able to be auctioned from the wallet, from the raw wallet data
function buildAuctions(arraya) {
    for(let i = 0; i < auctionsRaw.length; i++){
            auctionsRaw[i].assets.forEach((i) => {
                //console.log("Token is: " + i.tokenId);
                CheckAptAvailable(i.tokenId, arraya);
                //Check Available characters here
            });
        }        
    addPhaser();
}

function CheckAptAvailable(tokenId, arraya){
    var FoundSkin = arraya.find(element => element.ID == tokenId);
    if (FoundSkin != null){
        hasApt = true;     
        //Add Data on apt here
        AptInfo.push(FoundSkin);
    }   
 }