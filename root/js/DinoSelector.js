var Skin = "base";
var SkinPath = "../assets/cyberDino/Skins/dino2.png"
var Myjson;

var explorerApi = 'https://api.ergoplatform.com/api/v0';
var explorerApiV1 = 'https://api.ergoplatform.com/api/v1';
var auctionsRaw;

import { ConectedAddress } from './DinoConnector.js';
export {SkinPath, Skin};
let SkinContainer = document.getElementById("Skins");



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
                    Path: item.Path,
                    Icon: item.Icon
                });            
            }
        }
        for(var i = 0; i < 1; i++){
        CreateSkinSelectIcon(Myjson[0]);//Test
        CreateSkinSelectIcon(Myjson[1]);//Test
        CreateSkinSelectIcon(Myjson[2]);//Test
        CreateSkinSelectIcon(Myjson[4]);//Test
        }
        SkinChecker();
    });
}

function CreateSkinSelectIcon(FoundSkin){
    //create a skin select image to add to website
    var btn = document.createElement("BUTTON");
    btn.innerHTML = `<img src="${FoundSkin.Icon}" width="70" height="60" />`
    btn.addEventListener('click', function()
    {
        //Sets the Skin And path variables to the selected skin
        $(".Highlight").removeClass("Highlight");
        $(btn).addClass("Highlight");
        console.log(`Name: ${FoundSkin.Name}, Path: ${FoundSkin.Path}`);
        Skin = FoundSkin.Name;
        SkinPath = FoundSkin.Path;
    });
    console.log("Test: " +FoundSkin.Name);
    SkinContainer.appendChild(btn);
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
