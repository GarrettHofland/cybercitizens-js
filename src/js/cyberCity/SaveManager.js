import {ConectedAddress} from "./CityConnector.js";

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
    console.log("hi");
    LoginAndGetAptData();
}  

function LoginAndGetAptData(){
    PlayFab.settings.titleId = "9EBCA";
    
    var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: ConectedAddress,
        CreateAccount: true,
    };

    PlayFabClientSDK.LoginWithCustomID(loginRequest, GetHighscore);
}

function GetHighscore()
{
    var HighscoreRequest = {
        PlayFabId: ConectedAddress,
        StatisticNames: ["AptSave"]
    }
    PlayFabClientSDK.GetPlayerStatistics(HighscoreRequest, GetHighscoreStats)
}

var GetHighscoreStats = function (result, error) {
    if (result !== null) {
        if(ConectedAddress != "N/A"){
            if(result.data.Statistics[0] != null){
            AptSave = result.data.Statistics[0].Value;
            //console.log("The HighScore is: "+ JSON.stringify(result.data.Statistics[0].Value));
            }
            else{
                console.log("apt save is: "+ JSON.stringify(result.data.Statistics[0].Value));
            }
        }
    } 
    else if (error !== null) {
        console.log("Something went wrong Fetching the Leaderboard.");
        console.log("Here's some debug information:");
        console.log(CompileErrorReport(error));
    }
};

//send HS 
// function LoginAndGetAptData(){
//     if(ConectedAddress != "N/A")
//     {
//         PlayFab.settings.titleId = "9EBCA";
        
//         var loginRequest = {
//             TitleId: PlayFab.settings.titleId,
//             CustomId: ConectedAddress,
//             CreateAccount: true,
//         };

//         PlayFabClientSDK.LoginWithCustomID(loginRequest, UpdateStats);
//     }
// }

// function UpdateStats()
// {
//     var updateStatsRequest = {
//         Statistics: [{ StatisticName: "HighScore", Value: HighScore }]
//     };
//     PlayFabClientSDK.UpdatePlayerStatistics(updateStatsRequest, updateStatsCallback);
// }


// var updateStatsCallback = function (result, error) {
//     if (result !== null) {
//         console.log("Highscore Updated");
//     } 
//     else if (error !== null) {
//         console.log("Something went wrong Fetching the Leaderboard.");
//         console.log("Here's some debug information:");
//         console.log(CompileErrorReport(error));
//     }
// };



//error msg
function CompileErrorReport(error) {
    if (error === null)
       return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
       for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}