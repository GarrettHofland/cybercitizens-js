//import variables from base scene
import { config } from "./CyberCity.js";
import { game } from "./CyberCity.js";

var cursors;
var Player, Camera;
var scale = 1.8;
var LastFacing = 0;
var speed = 150;//1000; //130
var offsetX = 0, offsetY = 0;
var AnimNames = [];


export class RoomScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'RoomScene' });
    }

    preload ()
    {
        //Player = ["head" ,"Sholders", "Knees", "Toes"] 
        this.load.image('Test', '../assets/cyberCity/Apts/Test.png');

        //load player
        this.load.spritesheet('Player', '../assets/cyberCity/Player/Char 2.png',
            { frameWidth: 32, frameHeight: 48}
        );

        console.log("Room Scene preLoaded");
    }
    
    create ()
    {
        Camera = this.camera;


        this.add.sprite(config.width/2,config.height/2,'Test').setScale(scale);

        //create Player
        Player = this.physics.add.sprite(config.width/2 + offsetX,config.height/2 + offsetY,'Player').setScale(2);
        Player.body.allowGravity = false; Player.setFrictionX(0); Player.setFrictionY(0); 
        Player.body.setSize(28, 41);
        Player.body.setOffset(1.5, 2);

        CreateAnims();

        this.input.once('pointerdown', function (event) {
            
            RemoveAnims();
            console.log("Changing Scenes");
            this.scene.start('CityScene');

        }, this);


        this.cameras.main.startFollow(Player);

        cursors = this.input.keyboard.createCursorKeys();
        CreateKeys(this);
        console.log("Room Scene Created");
        console.log(Player);

    }  

    update ()
    {
        Movement();
    }
}


function CreateAnims()
{
    game.anims.create({
        key: 'WalkD',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 0, end: 2 }),
        frameRate: 6,
        repeat: true
    });
    AnimNames.push('WalkD');
    game.anims.create({
        key: 'WalkR',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 3, end: 5 }),
        frameRate: 6,
        repeat: true
    });
    AnimNames.push('WalkR');
    game.anims.create({
        key: 'WalkU',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 9, end: 11 }),
        frameRate: 6,
        repeat: true
    });
    AnimNames.push('WalkU');
    game.anims.create({
        key: 'WalkL',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 6, end: 8 }),
        frameRate: 6,
        repeat: true
    }); 
    AnimNames.push('WalkL');       
    game.anims.create({
        key: 'StandD',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 1, end: 1 }),
        frameRate: 6,
        repeat: true
    });
    AnimNames.push('StandD');
    game.anims.create({
        key: 'StandR',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 4, end: 4 }),
        frameRate: 6,
        repeat: true
    });
    AnimNames.push('StandR');
    game.anims.create({
        key: 'StandU',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 10, end: 10 }),
        frameRate: 6,
        repeat: true
    });
    AnimNames.push('StandU');
    game.anims.create({
        key: 'StandL',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 7, end: 7 }),
        frameRate: 6,
        repeat: true
    });
    AnimNames.push('StandL');
}

function RemoveAnims()
{
    AnimNames.forEach(element => {
        game.anims.remove(element);
    });
}

function Movement()
{
    Player.setVelocityY(0); 
    Player.setVelocityX(0); 

    if (cursors.up.isDown || keyW.isDown)
    {
        Player.anims.play('WalkU' , true); 
        Player.setVelocityY(-speed);    
        LastFacing = 2;
    }
    else if (cursors.down.isDown || keyS.isDown)
    {
        Player.anims.play('WalkD' , true);
        Player.setVelocityY(speed);  
        LastFacing = 0;
    }
    else if(cursors.left.isDown || keyA.isDown)
    {
        Player.anims.play('WalkL' , true);  
        Player.setVelocityX(-speed); 
        LastFacing = 3;
    }
    else if(cursors.right.isDown || keyD.isDown)
    {
        Player.anims.play('WalkR' , true);  
        Player.setVelocityX(speed); 
        LastFacing = 1;
    }

    if(Player.body.velocity.x == 0 && Player.body.velocity.y == 0)
    {
        switch(LastFacing){
            case 0:
                Player.anims.play('StandD' , true);        
                break;
            case 1:
                Player.anims.play('StandR' , true);
                break;
            case 2:
                Player.anims.play('StandU' , true);
                break;
            case 3:
                Player.anims.play('StandL' , true);
                break;  

        }
    }
}

//#region Inputs
var keyA, keyS, keyD, keyW, keySpace;

function CreateKeys(T)
{
    keyA = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keySpace = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}
//#endregion