var accessGranted = false;
var ConectedAddress;
var script = document.createElement("script"); script.type = "module"; script.src = "../js/cyberCity/CyberCity.js";
var Info = {
    hasApt: false,
    AptInfo: [],
    CitizenInfo: [],
    FurnitureInfo: [],
    skin: '../assets/cyberCity/Player/NChar 2.png'
}
export var AptSave = {

    BedBed: '../assets/cyberCity/Apts/Bedroom/Bed/Style1.png',
    BedChair: '../assets/cyberCity/Apts/Bedroom/Chair/Style1.png', 
    BedDesk: '../assets/cyberCity/Apts/Bedroom/Desk/Style1.png', 
    BedFloor: '../assets/cyberCity/Apts/Bedroom/Floor/Style1.png', 
    BedLeftSide: '../assets/cyberCity/Apts/Bedroom/LeftSideFurniture/Style1.png', 
    BedWall: '../assets/cyberCity/Apts/Bedroom/Wall/Style1.png',
    BathFloor: '../assets/cyberCity/Apts/Bathroom/Floor/Style1.png',
    BathWall: '../assets/cyberCity/Apts/Bathroom/Wall/Style1.png', 
    KitBin: '../assets/cyberCity/Apts/Kitchen/Bin/Style1.png', 
    KitCounter: '../assets/cyberCity/Apts/Kitchen/Counter/Style1.png', 
    KitTable: '../assets/cyberCity/Apts/Kitchen/DinnerTable/Style1.png', 
    KitFloor: '../assets/cyberCity/Apts/Kitchen/Floor/Style1.png', 
    KitFridge: '../assets/cyberCity/Apts/Kitchen/Fridge/Style1.png', 
    KitThingsOnTable: '../assets/cyberCity/Apts/Kitchen/ThingsOnDinnerTable/Style1.png', 
    KitWall: '../assets/cyberCity/Apts/Kitchen/Wall/Style1.png',
    LivCouch: '../assets/cyberCity/Apts/Living Room/Couch/Style1.png', 
    LivFloor: '../assets/cyberCity/Apts/Living Room/Floor/Style1.png', 
    LivFurn: '../assets/cyberCity/Apts/Living Room/FurnitureOnLeftWindow/Style1.png', 
    LivMiniCouch: '../assets/cyberCity/Apts/Living Room/MiniCouch/Style1.png', 
    LivMiniTable: '../assets/cyberCity/Apts/Living Room/MiniTable/Style1.png', 
    LivRightWindow: '../assets/cyberCity/Apts/Living Room/PlantsThingsNextToCouchRigtWindow/Style1.png',
    LivStuffMiniTable: '../assets/cyberCity/Apts/Living Room/StuffOnMiniTable/Style1.png', 
    LivTvTable: '../assets/cyberCity/Apts/Living Room/TableUnderTV/Style1.png', 
    LivTv: '../assets/cyberCity/Apts/Living Room/TV/Style1.png', 
    LivWall: '../assets/cyberCity/Apts/Living Room/Wall/Style1.png',

    BathPlants: '../assets/cyberCity/Apts/Bathroom/Bathroomplants/Style1.png',
    BathTub: '../assets/cyberCity/Apts/Bathroom/Bathtub/Style1.png',
    BathBin: '../assets/cyberCity/Apts/Bathroom/Bin/Style1.png',
    BathMir: '../assets/cyberCity/Apts/Bathroom/Mirror/Style1.png',
    BathShowe: '../assets/cyberCity/Apts/Bathroom/Shower/Style1.png',
    BathToil: '../assets/cyberCity/Apts/Bathroom/Toilet/Style1.png',
    BathTowel: '../assets/cyberCity/Apts/Bathroom/Towel/Style1.png',
    BathBasin: '../assets/cyberCity/Apts/Bathroom/WashBasin/Style1.png',
    Bathmachine: '../assets/cyberCity/Apts/Bathroom/WashingMachine/Style1.png'

}

window.onload = function(){ 
    loadGameInfo();
    addPhaser();
}   

const loadGameInfo = async () => {
    await ergo_request_read_access();
    ergo_check_read_access();
  
    if(ergo_check_read_access()){
      ConectedAddress = await ergo.get_change_address();
      //ConectedAddress = "9hJJksEkDcAznbezGWZ8qjNnqq46HNWHMyuj18BQpavatKJqRFY";
      //LoginAndGetAptData();
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

//--------------------------------------------------------------------- Save Data -----------------------------------------------------------

function LoginAndGetAptData() {
    PlayFab.settings.titleId = "9EBCA";
        var loginRequest = {
            TitleId: PlayFab.settings.titleId,
            CustomId: ConectedAddress,
            CreateAccount: true,
        };
 
    PlayFabClientSDK.LoginWithCustomID(loginRequest, LoginCallback);
}
 
var LoginCallback = function (result, error) {
    if (result !== null) {
        //document.getElementById("resultOutput").innerHTML = JSON.stringify(result);
        console.log(JSON.stringify(result));
        var setObjectRequest = {
            Entity: {
                Id: result.data.EntityToken.Entity.Id,
                Type: result.data.EntityToken.Entity.Type
            },
            Objects: AptSave
            ,Entity: entityProfile.Entity
        };
       //entity.SetObjects(setObjectRequest, SetObjectsCallback);
       var apiresult = entity.SetObjects(setObjectRequest);
 
    } else if (error !== null) {
        //document.getElementById("resultOutput").innerHTML = PlayFab.GenerateErrorReport(error);
        console.log(PlayFab.GenerateErrorReport(error));
    }
}
var SetObjectsCallback = function (result, error) {
    if (result !== null) {
        //document.getElementById("resultOutput").innerHTML = JSON.stringify(result);
        console.log(JSON.stringify(result));
    } else if (error !== null) {
        //document.getElementById("resultOutput").innerHTML = PlayFab.GenerateErrorReport(error);
        console.log(PlayFab.GenerateErrorReport(error));
    }
}


// function LoginAndGetAptData(){
    
//     PlayFab.settings.titleId = "9EBCA";
//     var loginRequest = {
//         TitleId: PlayFab.settings.titleId,
//         CustomId: ConectedAddress,
//         CreateAccount: true,
//     };

//     PlayFabClientSDK.LoginWithCustomID(loginRequest, GetHighscore);
// }

// function GetHighscore()
// {
//     // var getPlayerInfo = server.GetUserData
//     //     ({
//     //         PlayFabId: currentPlayerId,
//     //         Keys: ["AptInfo"],
//     //     });
//     // var playerInfoObject = JSON.parse(getPlayerInfo.Data.Info.Value);
//     // var getPlayerDataJSONValue = playerInfoObject.level;
//     // console.log("Its: " + getPlayerDataJSONValue);

//     // var HighscoreRequest = {
//     //     PlayFabId: ConectedAddress,
//     //     Key: "AptSave"
//     // }
//     // PlayFabClientSDK.GetUserDataResult(HighscoreRequest, GetHighscoreStats)
//     if (result !== null) {
//         //document.getElementById("resultOutput").innerHTML = JSON.stringify(result);
//         console.log(JSON.stringify(result));
//         var setObjectRequest = {
//             Entity: {
//                 Id: result.data.EntityToken.Entity.Id,
//                 Type: result.data.EntityToken.Entity.Type
//             },
//             Objects: AptSave
//         };
//         PlayFabDataSDK.SetObjects(setObjectRequest, SetObjectsCallback);
 
//     } else if (error !== null) {
//         //document.getElementById("resultOutput").innerHTML = PlayFab.GenerateErrorReport(error);
//         console.log(PlayFab.GenerateErrorReport(error));
//     }
// }

// var GetHighscoreStats = function (result, error) {
//     if (result !== null) {
//         if(ConectedAddress != "N/A"){
//             if(result.data.Statistics[0] != null){
//             AptSave = result.data.Statistics[0].Value;
//             //console.log("The HighScore is: "+ JSON.stringify(result.data.Statistics[0].Value));
//             }
//             else{
//                 console.log("apt save is empty");
//             }
//         }
//     } 
//     else if (error !== null) {
//         console.log("Something went wrong Fetching the Leaderboard.");
//         console.log("Here's some debug information:");
//         console.log(CompileErrorReport(error));
//     }
// };

function CompileErrorReport(error) {
    if (error === null)
       return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
       for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}
 