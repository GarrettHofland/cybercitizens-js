var skin = "base";
var skinPath = "../assets/cyberDino/Skins/dino2.png"
var Myjson;

var explorerApi = 'https://api.ergoplatform.com/api/v0';
var explorerApiV1 = 'https://api.ergoplatform.com/api/v1';
var auctionsRaw;

import { ConectedAddress } from './DinoConnector.js';


CreateSkinList();

function CreateSkinList (){
    $.getJSON("../data/dinos.json", function (json) {
        var Myjson = [];
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var item = json[key];
                Myjson.push({
                    Name: item.Name,
                    ID: item.ID,
                    Path: item.Path
                });            
            }
        }
        // compare to wallet addresses to see if it contains each skin
        SkinChecker();
        // create buttons for each matching address
    });
}

//Todo: create clickable icons on page for dino skins based on avaiable in wallet


//ToDo: when icon is selected make button to reload iframe for dino game and set correct skin

function CreateSkinSelectIcon(FoundSkin){
    //create a skin select image to add to website
    skin == FoundSkin.Name;
    skinPath == FoundSkin.Path;
}

function SkinChecker() {
    console.log("Loading Address");
    if(ConectedAddress != "N/A")
        getAuctionsRaw(ConectedAddress);
}

// Get every NFT able to be auctioned from the wallet 
function getAuctionsRaw(walletAddress) {
    getActiveAuctions(walletAddress)
    .then(res => {
      auctionsRaw = res;
      buildAuctions();
    });
}

// Build the list of NFTs currently able to be auctioned from the wallet, from the raw wallet data
function buildAuctions() {
for(let i = 0; i < auctionsRaw.length - 1; i++){
        auctionsRaw[i].assets.forEach((i) => {
            CheckSkinAvailable(i.tokenId);
        });
    }
    loadPlayer(Skin);
}

function CheckSkinAvailable(tokenId){
   var FoundSkin = Myjson.find(element => element.ID == tokenId);
   if (FoundSkin != null)
    CreateSkinSelectIcon(FoundSkin);
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
