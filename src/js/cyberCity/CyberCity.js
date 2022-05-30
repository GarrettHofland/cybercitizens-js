//importing scenes
import { CityScene } from "./CityScene.js";
import { RoomScene } from "./RoomScene.js";

export var config = {
    type: Phaser.AUTO,
    width: 1520,
    height: 800,
    backgroundColor: '#0c0d4d',
    physics: 
    {
      default: 'arcade',
      arcade: 
      {
        gravity: { y: 0 },
        debug: 0
      }
    },
    //scene: [RoomScene , CityScene], 
    scene: [CityScene, RoomScene], //add all imported scenes here
    audio:
    {
        disableWebAudio: true
    }
};


export var game = new Phaser.Game(config);






