//import variables from base scene
import { config } from "./CyberCity.js";
import { game } from "./CyberCity.js";

var cursors;
var Player;

export class RoomScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'RoomScene' });
    }

    preload ()
    {
        console.log("Room Scene preLoaded");
        Player = ["head" ,"Sholders", "Knees", "Toes"] 
    }
    
    create ()
    {
        this.input.once('pointerdown', function (event) {
            
            console.log("Changing Scenes");
            this.scene.start('CityScene');

        }, this);

        cursors = this.input.keyboard.createCursorKeys();
        console.log("Room Scene Created");
        console.log(Player);

    }  

    update ()
    {
        Movement();
    }
}

function Movement()
{
    if (cursors.up.isDown)
    {
        console.log("Up");
    }
    else if (cursors.down.isDown)
    {
        console.log("Down");
    }
    else if(cursors.left.isDown)
    {
        console.log("Left");
    }
    else if(cursors.right.isDown)
    {
        console.log("right");
    }
}

//ToDo
//- Validate user connected info
//- create server based database of information
//- only allow users to collect data and update with very specific preregistred information
//- add checks for information sent
//- create functionality for computer and allow players to stake their currency
//- create visuals for the computer scene
//- balance game economy