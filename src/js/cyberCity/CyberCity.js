//importing scenes
import { CityScene } from "./CityScene.js";
import { RoomScene } from "./RoomScene.js";

export var config = {
    type: Phaser.AUTO,
    width: 1520,
    height: 800,
    backgroundColor: '#53cbea',
    physics: 
    {
      default: 'arcade',
      arcade: 
      {
        gravity: { y: 0 },
        debug: 1
      }
    },
    scene: [CityScene, RoomScene], //add all imported scenes here
    audio:
    {
        disableWebAudio: true
    }
};


export var game = new Phaser.Game(config);






