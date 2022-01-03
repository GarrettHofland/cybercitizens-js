//TODO: Export skin variable to dino game
var skin = "base";
var Myjson;

CreateSkinList();

function CreateSkinList ()
{

    $.getJSON("../data/dinos.json", function (json) {
        var Myjson = [];
        for (var key in json) {
            console.log("Key :" + key); // shows all available keys in json
            if (json.hasOwnProperty(key)) {
                var item = json[key];
                Myjson.push({
                    Name: item.Name,
                    ID: item.ID,
                    
                });            
            }
        }
        console.log("json is: " + Myjson[0].Name);
        // compare to wallet addresses to see if it contains each skin
        // create buttons for each matching address
        });

}

//Todo: create clickable icons on page for dino skins based on avaiable in wallet


//ToDo: when icon is selected make button to reload iframe for dino game and set correct skin
