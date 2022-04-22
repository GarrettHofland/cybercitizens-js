var accessGranted = false;
var ConectedAddress;
var script = document.createElement("script"); script.type = "module"; script.src = "../js/cyberCity/CyberCity.js";
var Info = {
    hasApt: false,
    AptInfo: [],
    CitizenInfo: [],
    FurnitureInfo: []
}

window.onload = function(){ 
    addPhaser();
    loadGameInfo();
}   

const loadGameInfo = async () => {
    await ergo_request_read_access();
    ergo_check_read_access();
  
    if(ergo_check_read_access()){
      ConectedAddress = await ergo.get_change_address();
      //ConectedAddress = "9hJJksEkDcAznbezGWZ8qjNnqq46HNWHMyuj18BQpavatKJqRFY";
      LoadAvailableFurniture();
      LoadAvailableBuildings();
      LoadAvailableCitizens();
    }
    else {
      ConectedAddress = "N/A";
    }
  
  }

//export {ConectedAddress , hasApt , AptInfo};
export {ConectedAddress , Info};

const addPhaser = async () => {   
    document.getElementById("city-game").appendChild(script);
    document.getElementById("loading-message").style.display = "none";
}

//############################################## Json Loading ###############################################################
var Myjson;
var explorerApi = 'https://api.ergoplatform.com/api/v0'
var explorerApiV1 = 'https://api.ergoplatform.com/api/v1'
var auctionsRaw;

//checks the users wallet and sets correct furniture available
const LoadAvailableFurniture = async () =>{
    //Get JSON Info
    $.getJSON("../data/Furniture.json", function (json) {
        var Myjson = [];
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var item = json[key];
                Myjson.push({
                    ID: item.ID,
                    Type: item.Type,
                    Room: item.Room,
                    Path: item.Path,
                    Icon: item.Icon
                });            
            }
        }
        for(var i = 0; i < Myjson.length; i++){
            Info.FurnitureInfo.push(Myjson[i]);// ------------------------------ For Testing Only ----------------------------------
        }
        getAuctionsRawFur(ConectedAddress , Myjson);
    });
}

//Checks the users wallet and sets correct buidings available
const LoadAvailableBuildings = async () =>{
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
        Info.AptInfo.push(Myjson[0]); Info.hasApt = true;// ------------------------------ For Testing Only ----------------------------------
        getAuctionsRawApt(ConectedAddress , Myjson);
    });
}

//Checks the users wallet and sets correct buidings available
const LoadAvailableCitizens = async () =>{
    //Get JSON Info
    $.getJSON("../data/Characters.json", function (json) {
        var Myjson = [];
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var item = json[key];
                Myjson.push({
                    ID: item.ID,
                    Path: item.Path,
                    Icon: item.Icon
                });            
            }
        }
        //Info.CitizenInfo.push(Myjson[0]);  //-- For Testing Only
        getAuctionsRawCtz(ConectedAddress , Myjson);
    });
}

// Get every NFT able to be auctioned from the wallet 
const getAuctionsRawFur = async (walletAddress , arraya)  => {
    getActiveAuctions(walletAddress)
    .then(res => {
      auctionsRaw = res;
      buildAuctionsFur(arraya);
    });
}


// Get every NFT able to be auctioned from the wallet 
const getAuctionsRawApt = async (walletAddress , arraya)  => {
    getActiveAuctions(walletAddress)
    .then(res => {
      auctionsRaw = res;
      buildAuctionsApt(arraya);
    });
}

// Get every NFT able to be auctioned from the wallet 
const getAuctionsRawCtz = async (walletAddress , arraya)  => {
    getActiveAuctions(walletAddress)
    .then(res => {
      auctionsRaw = res;
      buildAuctionsCtz(arraya);
    });
}

// Build the list of NFTs currently able to be auctioned from the wallet, from the raw wallet data
const buildAuctionsFur = async (arraya) => {
    for(let i = 0; i < auctionsRaw.length; i++){
            auctionsRaw[i].assets.forEach((i) => {
                //console.log("Token is: " + i.tokenId);
                CheckFurAvailable(i.tokenId, arraya);               
            });
        }       
        console.log("Checked for Furniture");    
}

// Build the list of NFTs currently able to be auctioned from the wallet, from the raw wallet data
const buildAuctionsApt = async (arraya) => {
    for(let i = 0; i < auctionsRaw.length; i++){
            auctionsRaw[i].assets.forEach((i) => {
                //console.log("Token is: " + i.tokenId);
                CheckAptAvailable(i.tokenId, arraya);               
            });
        }       
        console.log("Checked for apt");    
}

// Build the list of NFTs currently able to be auctioned from the wallet, from the raw wallet data
const buildAuctionsCtz = async (arraya) => {
    for(let i = 0; i < auctionsRaw.length; i++){
            auctionsRaw[i].assets.forEach((i) => {
                //console.log("Token is: " + i.tokenId);
                CheckCtzAvailable(i.tokenId, arraya);               
            });
        }   
        console.log("Checked for Ctz");    
}

//Checks if the Appartment Token is available in the array
const CheckFurAvailable = async (tokenId, arraya) =>{
    var FoundSkin = arraya.find(element => element.ID == tokenId);
    if (FoundSkin != null){
        Info.hasApt = true;     
        //Add Data on Furniture here
        Info.FurnitureInfo.push(FoundSkin);
    } 
 }

//Checks if the Appartment Token is available in the array
const CheckAptAvailable = async (tokenId, arraya) =>{
    var FoundSkin = arraya.find(element => element.ID == tokenId);
    if (FoundSkin != null){
        Info.hasApt = true;     
        //Add Data on apt here
        Info.AptInfo.push(FoundSkin);
    } 
 }

 //Checks if the Citizen Token is available in the array
const CheckCtzAvailable = async (tokenId, arraya) =>{
    var FoundSkin = arraya.find(element => element.ID == tokenId);
    if (FoundSkin != null){
        Info.CitizenInfo.push(FoundSkin);
    }  
 }

 // Get active auctions from supplied address
const getActiveAuctions = async (addr) =>{
    return getRequest(`/boxes/unspent/byAddress/${addr}?limit=500`, explorerApiV1)
        .then(res => res.items)
        .then((boxes) => boxes.filter((box) => box.assets.length > 0));
}

// Function for appending requests to the exploreAPI URL
const getRequest = async (url, api = explorerApi) => {
    return fetch(api + url).then(res => res.json())
}

 