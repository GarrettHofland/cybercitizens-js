//import variables from base scene
import { config } from "./CyberCity.js";
import { game } from "./CyberCity.js";

var cursors;
var Water, Boats;
var scale = 2.2;
var speed = 130;//1000; //130
var Player;
var Camera;
var LastFacing = 0;
var LightsOn, LightsOff;
var Walls, ApartmentDoor, ApartmentOpen = false;
var offsetX = -56, offsetY = 1.5;
import { ConectedAddress, hasApt, AptInfo } from './CityConnector.js';
var AnimNames = [];

export class CityScene extends Phaser.Scene
{
    constructor ()
    {       
        super({ key: 'CityScene' });
    }

    preload ()
    {
        //Map Loading
        this.load.image('Water', '../assets/cyberCity//Map/1Water.png');
        this.load.image('Roads', '../assets/cyberCity/Map/2Roads.png');
        this.load.image('Outline', '../assets/cyberCity/Map/4outline.png');
        this.load.image('Hydrants', '../assets/cyberCity/Map/8Hydra.png');
        this.load.image('Box', '../assets/cyberCity/Map/9Box.png');
        this.load.image('VM', '../assets/cyberCity/Map/10vm.png');
        this.load.image('Trash', '../assets/cyberCity/Map/11Clouds.png');
        this.load.image('Arrows', '../assets/cyberCity/Map/12Arrow.png');
        this.load.image('LightOff', '../assets/cyberCity/Map/LampsOff.png');
        this.load.image('LightsOn', '../assets/cyberCity/Map/15Lights.png');
        this.load.image('BuildBack', '../assets/cyberCity/Map/BuildingBacks.png');
        this.load.image('BuildFront', '../assets/cyberCity/Map/BuildingTops.png');
        this.load.image('Signs', '../assets/cyberCity/Map/13Signs.png');
        this.load.image('Boats', '../assets/cyberCity/Map/Boats.png');

        LoadBillboards(this);

        //Load Cars
        // this.load.spritesheet('Cars', './assets/Temp/CAR2.png',
        //     {frameWidth: 80, frameHeight: 60}
        // );

        //load player
        this.load.spritesheet('Player', '../assets/cyberCity/Player/Char 2.png',
            { frameWidth: 32, frameHeight: 48}
        );

        //Load Walls
        this.load.spritesheet('Wall', '../assets/cyberCity/Map/Wall.png',
            { frameWidth: 10, frameHeight: 10}
        );

        console.log("City Scene preLoaded");
    }  

    create ()
    {
        Camera = this.camera;
        
        //create bounds
        Walls = this.physics.add.staticGroup();
        CreateWalls();

        if(hasApt)
            ApartmentDoor = this.physics.add.sprite(-50 + offsetX, -80 + offsetY,'Wall').setScale(15);//TODO: change to actual location

        Water = this.add.sprite(config.width/2, config.height/2, "Water").setScale(scale * 1.3);
        this.add.sprite(config.width/2,config.height/2,'Roads').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'Outline').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'BuildBack').setScale(scale);
        Boats = this.add.sprite(config.width/2,config.height/2,'Boats').setScale(scale);
        this.add.sprite((config.width/2 + offsetX) - 165,(config.height/2 + offsetY) - 25,'Hydrants').setScale(scale);
        //this.add.sprite((config.width/2 + offsetX) - 165,(config.height/2 + offsetY) - 25,'Box').setScale(scale);
        //this.add.sprite((config.width/2 + offsetX) - 165,(config.height/2 + offsetY) - 25,'VM').setScale(scale);
        this.add.sprite((config.width/2 + offsetX) - 165,(config.height/2 + offsetY) - 25,'Trash').setScale(scale);

        //Car1 = this.physics.add.sprite(300,210,'Cars');

        Player = this.physics.add.sprite(config.width/2 + offsetX,config.height/2 + offsetY,'Player').setScale(1.4);
        Player.body.allowGravity = false; Player.setFrictionX(0); Player.setFrictionY(0); 
        Player.body.setSize(20, 32);
        Player.body.setOffset(-2, -2.5); //blank
        
        //this.add.sprite((config.width/2 + offsetX) - 165,(config.height/2 + offsetY) - 25,'Arrows').setScale(scale);
        LightsOn = this.add.sprite((config.width/2 + offsetX) - 165,(config.height/2 + offsetY) - 25,'LightsOn').setScale(scale); //LightsOn.setVisible(true);
        //LightsOff = this.add.sprite(config.width/2,config.height/2,'LightsOn').setScale(scale); LightsOff.setVisible(false);

        this.add.sprite(config.width/2,config.height/2,'BuildFront').setScale(scale);
        this.add.sprite((config.width/2 + offsetX) - 165,(config.height/2 + offsetY) - 25).setScale(scale);


        CreateBillboards(this);
        CreateAnims();

        this.cameras.main.startFollow(Player);

        this.physics.add.collider(Player , Walls);

        cursors = this.input.keyboard.createCursorKeys();
        CreateKeys(this);
        console.log("City Scene crceated");

    }  

    update ()
    {        
        Movement();
        MoveWater();
        OpenApartment();
        
        if(ApartmentOpen && keySpace.isDown){
            switch(AptInfo[0].Size)//replace switch data with selected apt to load
            {
                case "N":
                    RemoveAnims();
                    this.scene.start('RoomScene');
                    break;
            }    
        }

        console.log("x: " + (Player.x + offsetX) + " y: " + (Player.y + offsetY));
    }    
}

//#region Movement
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

    PlayBillAnims();
}
//#endregion

//#region Player Interaction
function OpenApartment()
{
    //ADD visual indicator to press space to enter apt
    if(hasApt){
        if(CheckOverlap(Player, ApartmentDoor)) // && if apt is within database
            ApartmentOpen = true;
        else
            ApartmentOpen = false;
    }

}
//#endregion

//#region Waves and water
var wave = 0;
var invertWave = false;

function MoveWater() 
{
    if(wave > 500)
    {
        wave = 0; 
        invertWave = !invertWave;
    }
    if(invertWave)
    {
        Water.x += 0.1;
        Water.y -= 0.1;
        Boats.x -= 0.008;
        Boats.y -= 0.01;
        wave += 1;
    }
    else
    {
        Water.x -= 0.1;
        Water.y += 0.1;
        Boats.x += 0.008;
        Boats.y += 0.01;
        wave += 1;
    }
}
//#endregion

//#region Animations
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
//#endregion

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

//#region Billboards
var Bill1, Bill2, Bill3, Bill3a, Bill4, Bill4a, Bill4b;
var Bill5, Bill5a, Bill5b, Bill5c, Bill6, Bill6a, Bill6b;
var Bill7, Bill7a, Bill7b, Bill7c, Bill8, Bill8a, Bill8b, Bill8c;

function LoadBillboards(scene)
{
    scene.load.spritesheet('Bill1', '../assets/cyberCity/Gifs/Bill1.png',
        {frameWidth: 96, frameHeight: 30}
    );
    scene.load.spritesheet('Bill2', '../assets/cyberCity/Gifs/Bill2.png',
        {frameWidth: 96, frameHeight: 30}
    );
    scene.load.spritesheet('Bill3', '../assets/cyberCity/Gifs/Bill3.png',
        {frameWidth: 244, frameHeight: 934}
    );
    scene.load.spritesheet('Bill4', '../assets/cyberCity/Gifs/Bill4.png',
        {frameWidth: 1200, frameHeight: 520}
    );
    scene.load.spritesheet('Bill5', '../assets/cyberCity/Gifs/Bill5.png',
        {frameWidth: 1200, frameHeight: 940}
    );
    scene.load.spritesheet('Bill6', '../assets/cyberCity/Gifs/Bill6.png',
        {frameWidth: 258, frameHeight: 623}
    );
    scene.load.spritesheet('Bill7', '../assets/cyberCity/Gifs/Bill7.png',
        {frameWidth: 165, frameHeight: 630}
    );
    scene.load.spritesheet('Bill8', '../assets/cyberCity/Gifs/Bill8.png',
        {frameWidth: 1032, frameHeight: 645}
    );
    
}

function CreateBillboards(scene)
{
    Bill1 = scene.add.sprite(-1309 + offsetX, -89 + offsetY, 'Bill1').setScale(scale);
    Bill2 = scene.add.sprite(-239 + offsetX, 1774 + offsetY, 'Bill2').setScale(scale);
    Bill3 = scene.add.sprite(-960 + offsetX, 516 + offsetY, 'Bill3').setScale(0.1);
    Bill3a = scene.add.sprite(1470 + offsetX, -1313 + offsetY, 'Bill3').setScale(0.1);
    Bill4 = scene.add.sprite(-1207 + offsetX, -1106 + offsetY, 'Bill4').setScale(0.09);
    Bill4a = scene.add.sprite(-778 + offsetX, -1106 + offsetY, 'Bill4').setScale(0.09);
    Bill4b = scene.add.sprite(923 + offsetX, 432 + offsetY, 'Bill4').setScale(0.09);
    Bill5 = scene.add.sprite(212 + offsetX, -155 + offsetY, 'Bill5').setScale(0.08);
    Bill5a = scene.add.sprite(305 + offsetX, 570 + offsetY, 'Bill5').setScale(0.08);
    Bill5b = scene.add.sprite(1520 + offsetX, 377 + offsetY, 'Bill5').setScale(0.08);
    Bill5c = scene.add.sprite(280 + offsetX, 1765 + offsetY, 'Bill5').setScale(0.09);
    Bill6 = scene.add.sprite(370 + offsetX, -1410 + offsetY, 'Bill6').setScale(0.2);
    Bill6a = scene.add.sprite(872 + offsetX, 745.8 + offsetY, 'Bill6').setScale(0.2);
    Bill6b = scene.add.sprite(1600 + offsetX, 1958 + offsetY, 'Bill6').setScale(0.2);
    Bill7 = scene.add.sprite(-1570 + offsetX, -1670 + offsetY, 'Bill7').setScale(0.15);
    Bill7a = scene.add.sprite(-370 + offsetX, 1850 + offsetY, 'Bill7').setScale(0.15);
    Bill7b = scene.add.sprite(-106 + offsetX, 1850 + offsetY, 'Bill7').setScale(0.15);
    Bill7c = scene.add.sprite(1840 + offsetX, 941 + offsetY, 'Bill7').setScale(0.2);
    Bill8 = scene.add.sprite(1093 + offsetX, 2130 + offsetY, 'Bill8').setScale(0.1);
    Bill8a = scene.add.sprite(-882 + offsetX, 440 + offsetY, 'Bill8').setScale(0.1);
    Bill8b = scene.add.sprite(300 + offsetX, 1460 + offsetY, 'Bill8').setScale(0.1);
    Bill8c = scene.add.sprite(2825 + offsetX, 905 + offsetY, 'Bill8').setScale(0.1);



    CreateBillAnims();
}

function CreateBillAnims()
{
    game.anims.create({
        key: 'Bill1',
        frames: game.anims.generateFrameNumbers( 'Bill1' , { start: 0, end: 181 }),
        frameRate: 15,
        repeat: true
    });
    AnimNames.push('Bill1');
    game.anims.create({
        key: 'Bill2',
        frames: game.anims.generateFrameNumbers( 'Bill2' , { start: 0, end: 297 }),
        frameRate: 15,
        repeat: true
    });    
    AnimNames.push('Bill2');
    game.anims.create({
        key: 'Bill3',
        frames: game.anims.generateFrameNumbers( 'Bill3' , { start: 0, end: 76 }),
        frameRate: 10,
        repeat: true
    });    
    AnimNames.push('Bill3');
    game.anims.create({
        key: 'Bill4',
        frames: game.anims.generateFrameNumbers( 'Bill4' , { start: 0, end: 82 }),
        frameRate: 15,
        repeat: true
    });    
    AnimNames.push('Bill4');
    game.anims.create({
        key: 'Bill5',
        frames: game.anims.generateFrameNumbers( 'Bill5' , { start: 0, end: 58 }),
        frameRate: 10,
        repeat: true
    });    
    AnimNames.push('Bill5');
    game.anims.create({
        key: 'Bill6',
        frames: game.anims.generateFrameNumbers( 'Bill6' , { start: 0, end: 102 }),
        frameRate: 10,
        repeat: true
    });    
    AnimNames.push('Bill6');
    game.anims.create({
        key: 'Bill7',
        frames: game.anims.generateFrameNumbers( 'Bill7' , { start: 0, end: 75 }),
        frameRate: 7,
        repeat: true
    });    
    AnimNames.push('Bill7');
    game.anims.create({
        key: 'Bill8',
        frames: game.anims.generateFrameNumbers( 'Bill8' , { start: 0, end: 94 }),
        frameRate: 10,
        repeat: true
    });    
    AnimNames.push('Bill8');
}

function PlayBillAnims()
{
    Bill1.anims.play('Bill1' , true); 
    Bill2.anims.play('Bill2' , true); 
    Bill3.anims.play('Bill3' , true); 
    Bill3a.anims.play('Bill3' , true); 
    Bill4.anims.play('Bill4' , true); 
    Bill4a.anims.play('Bill4' , true); 
    Bill4b.anims.play('Bill4' , true); 
    Bill5.anims.play('Bill5' , true); 
    Bill5a.anims.play('Bill5' , true); 
    Bill5b.anims.play('Bill5' , true);
    Bill5c.anims.play('Bill5' , true); 
    Bill6.anims.play('Bill6' , true);
    Bill6a.anims.play('Bill6' , true); 
    Bill6b.anims.play('Bill6' , true); 
    Bill7.anims.play('Bill7' , true); 
    Bill7a.anims.play('Bill7' , true); 
    Bill7b.anims.play('Bill7' , true); 
    Bill7c.anims.play('Bill7' , true); 
    Bill8.anims.play('Bill8' , true); 
    Bill8a.anims.play('Bill8' , true); 
    Bill8b.anims.play('Bill8' , true); 
    Bill8c.anims.play('Bill8' , true); 



}
//#endregion

//#region Create Walls & Bonuds
function CreateWalls()
{
    //Plaza Left of starting point
    Walls.create(-340 + offsetX, 280 + offsetY,'Wall').setSize(390 * scale, 70 * scale); // Top Building
    Walls.create(-340 + offsetX, 420 + offsetY,'Wall').setSize(80 * scale, 270 * scale); // left building
    Walls.create(260 + offsetX, 440 + offsetY,'Wall').setSize(122.3 * scale, 165 * scale); // Right building
    Walls.create(200 + offsetX, 820 + offsetY,'Wall').setSize(150 * scale, 80 * scale); // right bottom building
    Walls.create(-165 + offsetX, 430 + offsetY,'Wall').setSize(50 * scale, 15 * scale); // staircase
    Walls.create(-165 + offsetX, 550 + offsetY,'Wall').setSize(60 * scale, 210 * scale); // second left building

    //plaza with Bill2 
    Walls.create(-350 + offsetX, 1280 + offsetY,'Wall').setSize(102 * scale, 368 * scale); //left building 1
    Walls.create(-157.5 + offsetX, 1280 + offsetY,'Wall').setSize(87.5 * scale, 355 * scale); // left building 2
    Walls.create( 36 + offsetX, 1472 + offsetY,'Wall').setSize(20 * scale, 267.5 * scale); //left building inside extenstion
    Walls.create( 80 + offsetX, 1715 + offsetY,'Wall').setSize(67 * scale, 158  * scale); // bottom right building
    Walls.create( 80 + offsetX, 1715 + offsetY,'Wall').setSize(207 * scale, 80  * scale); // bottom right building
    Walls.create( 227 + offsetX, 1970 + offsetY,'Wall').setSize(22 * scale, 42  * scale); // bottom right building
    Walls.create( 330 + offsetX, 1715 + offsetY,'Wall').setSize(93.4 * scale, 158  * scale); // bottom right building
    Walls.create( 225 + offsetX, 1567 + offsetY,'Wall').setSize(139 * scale, 65 * scale); //right middle building
    Walls.create( 160 + offsetX, 1280 + offsetY,'Wall').setSize(169 * scale, 130 * scale);//right top building 

    //Right of starting point
    Walls.create( 810 + offsetX, 278 + offsetY,'Wall').setSize(545 * scale, 90 * scale); //while street of Building
    
    //street abouve starting point
    Walls.create( -320 + offsetX, -305 + offsetY,'Wall').setSize(358 * scale, 113 * scale); //Fist Building
    Walls.create( 335 + offsetX, -260 + offsetY,'Wall').setSize(362 * scale, 100 * scale); //second building
    Walls.create( 667 + offsetX, -305 + offsetY,'Wall').setSize(605 * scale, 113 * scale); //third building
    Walls.create( -345 + offsetX, -1520 + offsetY,'Wall').setSize(100 * scale, 240 * scale); //Above Building left edge
    Walls.create( -245 + offsetX, -1520 + offsetY,'Wall').setSize(110 * scale, 395 * scale); //Top building
    Walls.create( -100 + offsetX, -1520 + offsetY,'Wall').setSize(75 * scale, 130 * scale); //Top building Edge

    //Bottom right of starting point     
    Walls.create( 839 + offsetX, 800 + offsetY,'Wall').setSize(130 * scale, 100 * scale); //First Building
    Walls.create( 1105 + offsetX, 800 + offsetY,'Wall').setSize(160 * scale, 62 * scale); //Second Building
    Walls.create( 1445 + offsetX, 800 + offsetY,'Wall').setSize(172 * scale, 100 * scale); //Third Building
    Walls.create( 1823.4 + offsetX, 800 + offsetY,'Wall').setSize(20 * scale, 85 * scale); //Ergo sign
    Walls.create( 1867.4 + offsetX, 800 + offsetY,'Wall').setSize(70 * scale, 100 * scale); //left-most Building    
    
    //Building Below Street above ^      
    Walls.create( 820 + offsetX, 1330 + offsetY,'Wall').setSize( 113 * scale, 170 * scale); //First Building Above
    Walls.create( 845 + offsetX, 2020 + offsetY,'Wall').setSize(140 * scale, 96 * scale); //Below First Building
    Walls.create( 1157.4 + offsetX, 2075 + offsetY,'Wall').setSize(17 * scale, 71 * scale); //Below First Building stairs
    Walls.create( 1194.8 + offsetX, 2020 + offsetY,'Wall').setSize(115 * scale, 96 * scale); //Second Building Below 
    Walls.create( 1365 + offsetX, 1710 + offsetY,'Wall').setSize(125 * scale, 237 * scale); //Third Building Below
    Walls.create( 1345 + offsetX, 1332 + offsetY,'Wall').setSize(140 * scale, 125 * scale); //Second Building Above
    Walls.create( 1450 + offsetX, 1619 + offsetY,'Wall').setSize(90 * scale, 42 * scale); //Second Building Above connection
     
    //Green Ergo Sign And PINK cy Ci Sign ( Bottom Right )  
    Walls.create( 1920 + offsetX, 1860  + offsetY,'Wall').setSize(147 * scale, 96.3 * scale); //solo building with pink highlights
    Walls.create( 1950 + offsetX, 1328  + offsetY,'Wall').setSize(300 * scale, 100 * scale); //Pink Sign Building
    Walls.create( 2610 + offsetX, 1328  + offsetY,'Wall').setSize(20 * scale, 85 * scale); //Pink Sign Building edge
    Walls.create( 1920 + offsetX, 1444  + offsetY,'Wall').setSize(85 * scale, 60 * scale); //Pink Sign Building Stairs

    //Collab Shop and casino 
    Walls.create( 355 + offsetX, -837  + offsetY,'Wall').setSize(92 * scale, 98 * scale); //Collab Left Part
    Walls.create( 560 + offsetX, -837  + offsetY,'Wall').setSize(148 * scale, 65 * scale); //Collab Central Part
    Walls.create( 888 + offsetX, -837  + offsetY,'Wall').setSize(84 * scale, 98 * scale); //Collab Right Part
    Walls.create( 1500 + offsetX, -1290  + offsetY,'Wall').setSize(430 * scale, 265 * scale); //Cassino
    Walls.create( 1500 + offsetX, -1360  + offsetY,'Wall').setSize(280 * scale, 36 * scale); //Cassino top left
    Walls.create( 2180 + offsetX, -1360  + offsetY,'Wall').setSize(120.5 * scale, 36 * scale); //Cassino top left
    Walls.create( 340 + offsetX, -1360 + offsetY ,'Wall').setSize(127 * scale, 100 * scale); //Building Above Collab Left
    Walls.create( 615 + offsetX, -1360 + offsetY ,'Wall').setSize(125 * scale, 55 * scale); //Building Above Collab Middle
    Walls.create( 890 + offsetX, -1360 + offsetY ,'Wall').setSize(80 * scale, 100 * scale); //Building Above Collab right

    //Mining GPU & Buildings Around Bill 1 
    Walls.create( -1325 + offsetX, -1255  + offsetY,'Wall').setSize(305 * scale, 75 * scale); //Mining GPU building
    Walls.create( -1285 + offsetX, -1090  + offsetY,'Wall').setSize(268.6 * scale, 18 * scale); //Mining GPU bottom half 
    Walls.create( -915 + offsetX, -728  + offsetY,'Wall').setSize(134 * scale, 100 * scale); // BUilding right under Mining GPU
    Walls.create( -930 + offsetX, -200  + offsetY,'Wall').setSize(142 * scale, 425 * scale); // BUildings right of BILL1
    Walls.create( -1670 + offsetX, 510  + offsetY,'Wall').setSize(292 * scale, 75 * scale); // BUildings under BILL1
    Walls.create( -1500 + offsetX, 675  + offsetY,'Wall').setSize(160 * scale, 176 * scale); // BUildings under ^ building
    Walls.create( -1405 + offsetX, 1062.2  + offsetY,'Wall').setSize(117 * scale, 14 * scale); // Bottom half of ^ building
    Walls.create( -880 + offsetX, 1070  + offsetY,'Wall').setSize(120 * scale, 95 * scale); // single building in the middle of street under bill 1 
     
    //Bill 1 
    Walls.create( -1760 + offsetX, -1650  + offsetY,'Wall').setSize(66 * scale, 420 * scale); // buildings top left of Bill 1 street
    Walls.create( -1615 + offsetX, -730  + offsetY,'Wall').setSize(185 * scale, 160 * scale); // Bill 1 and buildings above top
    Walls.create( -1710 + offsetX, -378  + offsetY,'Wall').setSize(232 * scale, 273 * scale); // Bill 1 and buildings above bottom
    Walls.create( -1710 + offsetX, 200  + offsetY,'Wall').setSize(15 * scale, 60 * scale); // Water 1
    Walls.create( -1710 + offsetX, 332  + offsetY,'Wall').setSize(65 * scale, 95 * scale); //  Water 2

    //Top left bounds 
    Walls.create(-1820 + offsetX, -1960 + offsetY,'Wall').setSize(545 * scale, 143 * scale);// top left building
    Walls.create(-1615 + offsetX, -1650 + offsetY,'Wall').setSize(13 * scale, 40 * scale);// top left building stairs
    Walls.create(-1450 + offsetX, -1650 + offsetY,'Wall').setSize(100 * scale, 40 * scale);// top left building middle
    Walls.create(-1090 + offsetX, -1850 + offsetY,'Wall').setSize(215 * scale, 130 * scale);// top left building right
    Walls.create(-1820 + offsetX, -2150 + offsetY,'Wall').setSize(5 * scale, 90 * scale);// water Behind building left
    Walls.create(-1820 + offsetX, -2150 + offsetY,'Wall').setSize(600 * scale, 5 * scale);// water Behind building
    Walls.create(-500 + offsetX, -2150 + offsetY,'Wall').setSize(325 * scale, 100 * scale);// top center street
    Walls.create(-435 + offsetX, -1930 + offsetY,'Wall').setSize(263 * scale, 22 * scale);// top center street bottom half
    Walls.create(210 + offsetX, -2150 + offsetY,'Wall').setSize(50 * scale, 55 * scale);// water right of center building
    Walls.create(320 + offsetX, -2222 + offsetY,'Wall').setSize(285 * scale, 65 * scale);// big hotel water behind
    Walls.create(455 + offsetX, -1960 + offsetY,'Wall').setSize(240 * scale, 105 * scale);// big hotel building

    //Top right Bounds
    Walls.create(947 + offsetX, -2260 + offsetY,'Wall').setSize(160 * scale, 10  * scale);// Bottom water of boat
    Walls.create(1299 + offsetX, -2238 + offsetY,'Wall').setSize(75 * scale, 20  * scale);// Bottom water of boat 2
    Walls.create(1464 + offsetX, -2194 + offsetY,'Wall').setSize(220 * scale, 25  * scale);// Bottom water of boat 3
    Walls.create(1950 + offsetX, -2150 + offsetY,'Wall').setSize(400 * scale, 55 * scale);// Grand hotel
    Walls.create(2650 + offsetX, -2100 + offsetY,'Wall').setSize(70 * scale, 1050 * scale);// right of parking lot
    Walls.create(2560 + offsetX, -1430 + offsetY,'Wall').setSize(70 * scale, 380 * scale);// bottom of parking lot
    Walls.create(2290 + offsetX, -340 + offsetY,'Wall').setSize(350 * scale, 615 * scale);// bottom right of casino

    //Bottom right  
    Walls.create(3040 + offsetX, 1020 + offsetY,'Wall').setSize(30 * scale, 55 * scale);// Water 1
    Walls.create(3088 + offsetX, 1141 + offsetY,'Wall').setSize(20 * scale, 65 * scale);// water 2
    Walls.create(3040 + offsetX, 1280 + offsetY,'Wall').setSize(30 * scale, 130 * scale);// Water 3
    Walls.create(3088 + offsetX, 1570 + offsetY,'Wall').setSize(25 * scale, 20 * scale);// water 4
    Walls.create(3143 + offsetX, 1614 + offsetY,'Wall').setSize(20 * scale, 90 * scale);// water 5
    Walls.create(3088 + offsetX, 1820 + offsetY,'Wall').setSize(25 * scale, 20 * scale);// water 6
    Walls.create(2990 + offsetX, 1870 + offsetY,'Wall').setSize(45 * scale, 25 * scale);// water 7
    Walls.create(2930 + offsetX, 1920 + offsetY,'Wall').setSize(50 * scale, 25 * scale);// water 8
    Walls.create(2819 + offsetX, 1980 + offsetY,'Wall').setSize(150 * scale, 75 * scale);// water 9
    Walls.create(2880 + offsetX, 2145 + offsetY,'Wall').setSize(40 * scale, 20 * scale);// water 10
    Walls.create(3095 + offsetX, 2145 + offsetY,'Wall').setSize(40 * scale, 20 * scale);// water 11
    Walls.create(3149 + offsetX, 2189 + offsetY,'Wall').setSize(20 * scale, 70 * scale);// water 12
    Walls.create(3030 + offsetX, 2343 + offsetY,'Wall').setSize(70 * scale, 90 * scale);// water 13
    Walls.create(2980 + offsetX, 2445 + offsetY,'Wall').setSize(25 * scale, 5 * scale);// water 14
    Walls.create(3095 + offsetX, 2541 + offsetY,'Wall').setSize(20 * scale, 70 * scale);// water 15
    Walls.create(3030 + offsetX, 2660 + offsetY,'Wall').setSize(30 * scale, 30 * scale);// water 16
    Walls.create(2980 + offsetX, 2710 + offsetY,'Wall').setSize(22 * scale, 22 * scale);// water 17
    Walls.create(2931.6 + offsetX, 2758.4 + offsetY,'Wall').setSize(22 * scale, 22 * scale);// water 18
    Walls.create(2883.2 + offsetX, 2806.8 + offsetY,'Wall').setSize(22 * scale, 22 * scale);// water 19
    Walls.create(2640 + offsetX, 2860 + offsetY,'Wall').setSize(110 * scale, 22 * scale);// water 20
    Walls.create(1930 + offsetX, 2813 + offsetY,'Wall').setSize(323 * scale, 22 * scale);// water 21
    Walls.create(2135 + offsetX, 2760 + offsetY,'Wall').setSize(42 * scale, 25 * scale);// water 22
    Walls.create(1710 + offsetX, 2861.4 + offsetY,'Wall').setSize(110 * scale, 25 * scale);// water 23
    Walls.create(1560 + offsetX, 2916.4 + offsetY,'Wall').setSize(70 * scale, 25 * scale);// water 24
    Walls.create(1560 + offsetX, 2760 + offsetY,'Wall').setSize(20 * scale, 80 * scale);// water 25
    Walls.create(1560 + offsetX, 2760 + offsetY,'Wall').setSize(40 * scale, 5 * scale);// water 26
    Walls.create(1395 + offsetX, 2665 + offsetY,'Wall').setSize(140 * scale, 22 * scale);// water 27
    Walls.create(820 + offsetX, 2540 + offsetY,'Wall').setSize(260 * scale, 150 * scale);// Bottom Building

    //Bottom left
    Walls.create(544 + offsetX, 2650 + offsetY,'Wall').setSize(130 * scale, 50 * scale);// water down middle
    Walls.create(544 + offsetX, 2565 + offsetY,'Wall').setSize(60 * scale, 50 * scale);// crates down middle
    Walls.create(-1800 + offsetX, 900 + offsetY,'Wall').setSize(130 * scale, 57 * scale);// water far left
    Walls.create(-1800 + offsetX, 900 + offsetY,'Wall').setSize(30 * scale, 200 * scale);// water far left 2
    Walls.create(-1734 + offsetX, 1340 + offsetY,'Wall').setSize(25 * scale, 50 * scale);// water far left 3
    Walls.create(-1679 + offsetX, 1430 + offsetY,'Wall').setSize(242 * scale, 150 * scale);// building under cyber cit pink logo (left)
    Walls.create(-1146 + offsetX, 1590 + offsetY,'Wall').setSize(240 * scale, 110 * scale);// pier top building
    Walls.create(-1146 + offsetX, 1590 + offsetY,'Wall').setSize(95 * scale, 600 * scale);// pier
    Walls.create(-1146 + offsetX, 1590 + offsetY,'Wall').setSize(120 * scale, 128 * scale);// pier block
    Walls.create(-1146 + offsetX, 1940 + offsetY,'Wall').setSize(225 * scale, 200 * scale);// containers 1
    Walls.create(-1146 + offsetX, 2140 + offsetY,'Wall').setSize(210 * scale, 55 * scale);// containers 2
    Walls.create(-1146 + offsetX, 2385 + offsetY,'Wall').setSize(500 * scale, 60 * scale);// containers 3
    Walls.create(-1146 + offsetX, 2365 + offsetY,'Wall').setSize(130 * scale, 80 * scale);// containers 4
    Walls.create(-1146 + offsetX, 2590 + offsetY,'Wall').setSize(500 * scale, 80 * scale);// containers 5
    Walls.create(-625 + offsetX, 2390 + offsetY,'Wall').setSize(42 * scale, 7 * scale);// container 6
    Walls.create(-225 + offsetX, 2385 + offsetY,'Wall').setSize(358 * scale, 300 * scale);// bottom building
}
//#endregion

//#region Helper Classes
function CheckOverlap(SpriteA, SpriteB)
{
    var boundsA = SpriteA.getBounds();
    var boundsB = SpriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}
//#endregion