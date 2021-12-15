import { ConectedAddress } from './DinoConnector.js';

let leaderboard = document.getElementById("leaderboard");
let scores = [];
let NoDisplayed = 10; //number of entries to display
var refreshBTN = document.createElement("input"); refreshBTN.type = "button"; refreshBTN.value = "Refresh Leaderboard"; refreshBTN.classList.add("leaderboard-button"); 
var DNBTN = document.createElement("input"); DNBTN.type = "button"; DNBTN.value = "Set Name";  DNBTN.classList.add("leaderboard-button"); 
var DNInput = document.createElement("input"); DNInput.type = "text"; DNInput.value = ""; DNInput.id = "display-name"; 
var header = document.createElement("h1"); header.innerText = "Leaderboard"; header.id = "leaderboard-header";


LoginAndSetLeaderBoard();

function createInterface(){
    leaderboard.appendChild(header);
    leaderboard.appendChild(DNInput);
    leaderboard.appendChild(DNBTN);
    leaderboard.appendChild(refreshBTN);
    DNBTN.onclick = function(){SetDisplayName()};
    refreshBTN.onclick = function(){RefreshLB();};
}

function updateLeaderboardView() {

    scores.sort(function(a, b){ return b.score - a.score  });
    let elements = []; //Used for colors

    for(let i=0; i<scores.length; i++) {
        let name = document.createElement("div");
        name.classList.add("name");
        name.innerText = i+1 + ". " + scores[i].name + " : " + scores[i].score; //Text Displayed on leaderboard

        let scoreRow = document.createElement("div");
        scoreRow.classList.add("row");
        scoreRow.appendChild(name);
        leaderboard.appendChild(scoreRow);

        elements.push(scoreRow);
    }

    //Create colors for 1st, 2nd and 3rd
    let colors = ["gold", "silver", "#cd7f32"];
    for(let i=0; i < 3; i++) {
        elements[i].style.color = colors[i];
    }
}

function LoginAndSetLeaderBoard(){
    PlayFab.settings.titleId = "9EBCA";
    
    var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: ConectedAddress,
        CreateAccount: true,
    };

    PlayFabClientSDK.LoginWithCustomID(loginRequest, GetLeaderboard);
}


function GetLeaderboard()
{
    var GetLeaderboardRequest = {
        StartPosition: 0,
        StatisticName: "HighScore",
        MaxResultCount: NoDisplayed
    }

    PlayFabClientSDK.GetLeaderboard(GetLeaderboardRequest, UpdateLeaderBoard);

}

//updates scores variable and calls updateleaderboardview
var UpdateLeaderBoard = function (result, error) {
    if (result !== null){
        scores = [];
        result.data.Leaderboard.forEach(element => {
            scores.push({name: element.DisplayName , score: element.StatValue})
        });
        leaderboard.innerHTML = "";
        createInterface();
        updateLeaderboardView();
    } 
    else if (error !== null) {
        console.log("Something went wrong Fetching the Leaderboard.");
        console.log("Here's some debug information:");
        console.log(CompileErrorReport(error));
    }
};

function SetDisplayName()
{
    PlayFab.settings.titleId = "9EBCA";
    
    var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: ConectedAddress,
        CreateAccount: true,
    };

    PlayFabClientSDK.LoginWithCustomID(loginRequest, UpdateDisplayName);

}

function UpdateDisplayName()
    {
        var GetDNameRequest = {
            DisplayName: document.getElementById("display-name").value
        }

        PlayFabClientSDK.UpdateUserTitleDisplayName(GetDNameRequest, UpdateName);
    }

    var UpdateName = function (result, error)
    { 
        if (result !== null) {
        RefreshLB();
            } else if (error !== null) {
        
        }
    };

function RefreshLB()
{
    console.log("Leaderboard refreshed");
    LoginAndSetLeaderBoard();
}

function CompileErrorReport(error) {
    if (error === null)
       return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
       for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}



