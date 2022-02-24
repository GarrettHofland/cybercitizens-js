//import variables from base scene
import { config } from "./CyberCity.js";
import { game } from "./CyberCity.js";

var cursors;
var Water;
var scale = 2.2;
var speed = 1000; //130
var Player;
var Camera;
var LastFacing = 0;
var Bill1, Bill2, LightsOn, LightsOff;
var Walls, ApartmentDoor, ApartmentOpen = false;
var offsetX = 0, offsetY = 0;
import { ConectedAddress, hasApt, AptInfo } from './CityConnector.js';

export class CityScene extends Phaser.Scene
{
    constructor ()
    {       
        super({ key: 'CityScene' });
    }

    preload ()
    {
        offsetX = (config.width - 1200)/2;
        offsetY = (config.height - 700)/2;

        //Map Loading
        this.load.image('Water', '../assets/cyberCity//Map/1Water.png');
        this.load.image('Roads', '../assets/cyberCity/Map/2Roads.png');
        this.load.image('Island', '../assets/cyberCity/Map/3Island.png');
        this.load.image('Outline', '../assets/cyberCity/Map/4outline.png');
        this.load.image('5', '../assets/cyberCity/Map/5.png');
        this.load.image('6', '../assets/cyberCity/Map/6.png');
        this.load.image('7', '../assets/cyberCity/Map/7.png');
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

        //Gifs
        this.load.spritesheet('Bill1', '../assets/cyberCity/Gifs/Bill1.png',
            {frameWidth: 96, frameHeight: 30}
        );
        this.load.spritesheet('Bill2', '../assets/cyberCity/Gifs/Bill2.png',
            {frameWidth: 96, frameHeight: 30}
        );

        //Load Cars
        // this.load.spritesheet('Cars', './assets/Temp/CAR2.png',
        //     {frameWidth: 80, frameHeight: 60}
        // );

        //load player
        this.load.spritesheet('Player', '../assets/cyberCity/Player/Char 2.png',
            { frameWidth: 16, frameHeight: 32}
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
        this.add.sprite(config.width/2,config.height/2,'Island').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'Outline').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'5').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'6').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'7').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'BuildBack').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'Hydrants').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'Box').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'VM').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'Trash').setScale(scale);

        //Car1 = this.physics.add.sprite(300,210,'Cars');

        //TODO : Load Player in this section 
        Player = this.physics.add.sprite(config.width/2,config.height/2,'Player').setScale(1.8);
        Player.body.allowGravity = false; Player.setFrictionX(0); Player.setFrictionY(0);
        
        this.add.sprite(config.width/2,config.height/2,'Arrows').setScale(scale);
        LightsOn = this.add.sprite(config.width/2,config.height/2,'LightsOn').setScale(scale); //LightsOn.setVisible(true);
        //LightsOff = this.add.sprite(config.width/2,config.height/2,'LightsOn').setScale(scale); LightsOff.setVisible(false);

        this.add.sprite(config.width/2,config.height/2,'BuildFront').setScale(scale);
        this.add.sprite(config.width/2,config.height/2,'Signs').setScale(scale);


        Bill1 = this.add.sprite(-1310 + offsetX, -90 + offsetY, 'Bill1').setScale(scale);
        Bill2 = this.add.sprite(-235 + offsetX, 1755 + offsetY, 'Bill2').setScale(scale);

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
                    this.scene.start('RoomScene');
                    break;
            }    
        }

        //console.log("x: " + Player.x + " y: " + Player.y);
    }    
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
    Bill1.anims.play('Bill1' , true); 
    Bill2.anims.play('Bill2' , true); 

}

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
        wave += 1;
    }
    else
    {
        Water.x -= 0.1;
        Water.y += 0.1;
        wave += 1;
    }
}

function CreateAnims()
{
    game.anims.create({
        key: 'Bill1',
        frames: game.anims.generateFrameNumbers( 'Bill1' , { start: 0, end: 181 }),
        frameRate: 15,
        repeat: true
    });
    game.anims.create({
        key: 'Bill2',
        frames: game.anims.generateFrameNumbers( 'Bill2' , { start: 0, end: 297 }),
        frameRate: 20,
        repeat: true
    });

    game.anims.create({
        key: 'WalkD',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 0, end: 2 }),
        frameRate: 6,
        repeat: true
    });
    game.anims.create({
        key: 'WalkR',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 3, end: 5 }),
        frameRate: 6,
        repeat: true
    });
    game.anims.create({
        key: 'WalkU',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 6, end: 8 }),
        frameRate: 6,
        repeat: true
    });
    game.anims.create({
        key: 'WalkL',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 9, end: 11 }),
        frameRate: 6,
        repeat: true
    });        
    game.anims.create({
        key: 'StandD',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 1, end: 1 }),
        frameRate: 6,
        repeat: true
    });
    game.anims.create({
        key: 'StandR',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 4, end: 4 }),
        frameRate: 6,
        repeat: true
    });
    game.anims.create({
        key: 'StandU',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 7, end: 7 }),
        frameRate: 6,
        repeat: true
    });
    game.anims.create({
        key: 'StandL',
        frames: game.anims.generateFrameNumbers( 'Player' , { start: 10, end: 10 }),
        frameRate: 6,
        repeat: true
    });
}

function CreateWalls()
{

    //Plaza Left of starting point
    Walls.create(-340 + offsetX, 250 + offsetY,'Wall').setSize(395 * scale, 90 * scale);
    Walls.create(-340 + offsetX, 450 + offsetY,'Wall').setSize(80 * scale, 270 * scale);
    Walls.create(260 + offsetX, 448 + offsetY,'Wall').setSize(122.3 * scale, 165 * scale);
    Walls.create(200 + offsetX, 810 + offsetY,'Wall').setSize(150 * scale, 95 * scale);
    Walls.create(-165 + offsetX, 450 + offsetY,'Wall').setSize(50 * scale, 15 * scale);
    Walls.create(-165 + offsetX, 530 + offsetY,'Wall').setSize(65 * scale, 233 * scale);

    //plaza with Bill2 
    Walls.create(-350 + offsetX, 1280 + offsetY,'Wall').setSize(175 * scale, 360 * scale);
    Walls.create( 36 + offsetX, 1460 + offsetY,'Wall').setSize(20 * scale, 278 * scale);
    Walls.create( 80 + offsetX, 1693 + offsetY,'Wall').setSize(207 * scale, 172 * scale);
    Walls.create( 225 + offsetX, 1550 + offsetY,'Wall').setSize(141 * scale, 65 * scale);
    Walls.create( 160 + offsetX, 1280 + offsetY,'Wall').setSize(171 * scale, 130 * scale);

    //Right of starting point
    Walls.create( 810 + offsetX, 220 + offsetY,'Wall').setSize(150 * scale, 125 * scale); //Ergo Building
    Walls.create( 1140 + offsetX, 220 + offsetY,'Wall').setSize(130 * scale, 35 * scale); //Stairs case next to ergo building
    Walls.create( 1426 + offsetX, 220 + offsetY,'Wall').setSize(140 * scale, 125 * scale); // 2nd building
    Walls.create( 1780 + offsetX, 220 + offsetY,'Wall').setSize(110 * scale, 125 * scale); // 3rd building
    
    //street abouve starting point
    Walls.create( -345 + offsetX, -330 + offsetY,'Wall').setSize(280 * scale, 130 * scale); //Fist Building
    Walls.create( 320 + offsetX, -330 + offsetY,'Wall').setSize(620 * scale, 130 * scale); //Streets
    Walls.create( 1684 + offsetX, -330 + offsetY,'Wall').setSize(17 * scale, 90 * scale); //Streets Edge
    Walls.create( 1821 + offsetX, -330 + offsetY,'Wall').setSize(95 * scale, 130 * scale); //3rd building
    Walls.create( 1765 + offsetX, -240 + offsetY,'Wall').setSize(25 * scale, 89 * scale); //3rd building Edge
    Walls.create( -345 + offsetX, -1200 + offsetY,'Wall').setSize(100 * scale, 395 * scale); //Above Building
    Walls.create( -125 + offsetX, -850 + offsetY,'Wall').setSize(65 * scale, 236 * scale); //Above Building Edge 1
    Walls.create( 18 + offsetX, -750 + offsetY,'Wall').setSize(25 * scale, 168 * scale); //Above Building Edge 2
    Walls.create( -190 + offsetX, -1545 + offsetY,'Wall').setSize(125 * scale, 270 * scale); //Top building
    Walls.create( -345 + offsetX, -1545 + offsetY,'Wall').setSize(70 * scale, 80 * scale); //Top building Edge

    //Street Below ergo building
    Walls.create( 830 + offsetX, 760 + offsetY,'Wall').setSize(125 * scale, 125 * scale); //First Building
    Walls.create( 1105 + offsetX, 760 + offsetY,'Wall').setSize(125 * scale, 50 * scale); //Second Building
    Walls.create( 1270 + offsetX, 760 + offsetY,'Wall').setSize(50 * scale, 120 * scale); //Thrid Building
    Walls.create( 1422 + offsetX, 760 + offsetY,'Wall').setSize(100 * scale, 130 * scale); //Fourth Building
    Walls.create( 1642 + offsetX, 760 + offsetY,'Wall').setSize(50 * scale, 40 * scale); //Fourth Building Stairs
    Walls.create( 1870 + offsetX, 760 + offsetY,'Wall').setSize(73 * scale, 130 * scale); //Fifth Building    
    
    //Building Below Street above ^

    Walls.create( 820 + offsetX, 1270 + offsetY,'Wall').setSize(90 * scale, 200 * scale); //First Building Above
    Walls.create( 1018 + offsetX, 1270 + offsetY,'Wall').setSize(25 * scale, 125 * scale); //First Building Above edge
    Walls.create( 840 + offsetX, 1980 + offsetY,'Wall').setSize(90 * scale, 90 * scale); //Below First Building
    Walls.create( 920 + offsetX, 2020 + offsetY,'Wall').setSize(85 * scale, 100 * scale); //Below First Building stairs
    Walls.create( 1107 + offsetX, 2020 + offsetY,'Wall').setSize(115 * scale, 80 * scale); //Second Building Below 
    Walls.create( 1360 + offsetX, 1700 + offsetY,'Wall').setSize(130 * scale, 240 * scale); //Third Building Below
    Walls.create( 1345 + offsetX, 1300 + offsetY,'Wall').setSize(140 * scale, 145 * scale); //Second Building Above
    Walls.create( 1450 + offsetX, 1619 + offsetY,'Wall').setSize(92 * scale, 42 * scale); //Second Building Above connection
     
    //Green Ergo Sign And PINK cy Ci Sign ( Bottom Right )
    Walls.create( 1920 + offsetX, 1830  + offsetY,'Wall').setSize(140 * scale, 110 * scale); //Green Erg Sign Building
    Walls.create( 1950 + offsetX, 1300  + offsetY,'Wall').setSize(300 * scale, 100 * scale); //Pink Sign Building
    Walls.create( 2610 + offsetX, 1300  + offsetY,'Wall').setSize(20 * scale, 85 * scale); //Pink Sign Building edge
    Walls.create( 1950 + offsetX, 1520  + offsetY,'Wall').setSize(75 * scale, 20 * scale); //Pink Sign Building Stairs
    Walls.create( 2500 + offsetX, 1830  + offsetY,'Wall').setSize(145 * scale, 75 * scale); //Building to the bottom right of pink building
    Walls.create( 2600 + offsetX, 1995  + offsetY,'Wall').setSize(85 * scale, 25 * scale); //Building to the bottom right of pink building stairs 

    //Collab Shop and casino
    Walls.create( 345 + offsetX, -875  + offsetY,'Wall').setSize(100 * scale, 115 * scale); //Collab Left Part
    Walls.create( 565 + offsetX, -875  + offsetY,'Wall').setSize(160 * scale, 90 * scale); //Collab Central Part
    Walls.create( 917 + offsetX, -875  + offsetY,'Wall').setSize(70 * scale, 115 * scale); //Collab Right Part
    Walls.create( 1500 + offsetX, -1310  + offsetY,'Wall').setSize(430 * scale, 280 * scale); //Cassino
    Walls.create( 1500 + offsetX, -1390  + offsetY,'Wall').setSize(280 * scale, 37 * scale); //Cassino top left
    Walls.create( 2180 + offsetX, -1390  + offsetY,'Wall').setSize(121 * scale, 37 * scale); //Cassino top left
    Walls.create( 340 + offsetX, -1390 + offsetY ,'Wall').setSize(125 * scale, 110 * scale); //Building Above Collab Left
    Walls.create( 615 + offsetX, -1390 + offsetY ,'Wall').setSize(125 * scale, 45 * scale); //Building Above Collab Middle
    Walls.create( 890 + offsetX, -1390 + offsetY ,'Wall').setSize(80 * scale, 110 * scale); //Building Above Collab right

    //Mining GPU & Buildings Around Bill 1
    Walls.create( -1315 + offsetX, -1282  + offsetY,'Wall').setSize(300 * scale, 110 * scale); //Mining GPU building
    Walls.create( -910 + offsetX, -755  + offsetY,'Wall').setSize(130 * scale, 110 * scale); // BUilding left under Mining GPU
    Walls.create( -925 + offsetX, -200  + offsetY,'Wall').setSize(140 * scale, 439 * scale); // BUildings left of BILL1
    Walls.create( -1670 + offsetX, 510  + offsetY,'Wall').setSize(315 * scale, 116 * scale); // BUildings under of BILL1
    Walls.create( -1500 + offsetX, 765  + offsetY,'Wall').setSize(165 * scale, 165 * scale); // BUildings under of BILL1 below
    Walls.create( -870 + offsetX, 1040  + offsetY,'Wall').setSize(115 * scale, 110 * scale); // single building in the middle of street under bill 1 
     
    //Bill 1
    Walls.create( -1610 + offsetX, -755  + offsetY,'Wall').setSize(190 * scale, 450 * scale); // Bill 1 and buildings above
    Walls.create( -1750 + offsetX, -1650  + offsetY,'Wall').setSize(66 * scale, 410 * scale); // buildings top left of Bill 1 street
    Walls.create( -1665 + offsetX, 200  + offsetY,'Wall').setSize(90 * scale, 27 * scale); // Bill 1 edge bottom left
    Walls.create( -1665 + offsetX, 300  + offsetY,'Wall').setSize(45 * scale, 95 * scale); // Water 1
    Walls.create( -1710 + offsetX, 255  + offsetY,'Wall').setSize(20 * scale, 25 * scale); // Water 2

    //Top left bounds
    Walls.create(-1750 + offsetX, -1800 + offsetY,'Wall').setSize(190 * scale, 80 * scale);// top left building
    Walls.create(-1515 + offsetX, -1624 + offsetY,'Wall').setSize(83 * scale, 35 * scale);// top left building stairs
    Walls.create(-1332 + offsetX, -1800 + offsetY,'Wall').setSize(108 * scale, 45 * scale);// top left building middle
    Walls.create(-1094 + offsetX, -1850 + offsetY,'Wall').setSize(215 * scale, 130 * scale);// top left building right
    Walls.create(-621 + offsetX, -2100 + offsetY,'Wall').setSize(440 * scale, 130 * scale);// top center street
    Walls.create(320 + offsetX, -2200 + offsetY,'Wall').setSize(50* scale, 50 * scale);// top center water
    Walls.create(400 + offsetX, -2100 + offsetY,'Wall').setSize(200 * scale, 190 * scale);// top blue ergo building


    //Top Left Bounds
    Walls.create(840 + offsetX, -2130 + offsetY,'Wall').setSize(50* scale, 50 * scale);// end of Top alleyway
    Walls.create(940 + offsetX, -2100 + offsetY,'Wall').setSize(450 * scale, 190 * scale);// top building right of blue ergo sign
    Walls.create(1930 + offsetX, -2100 + offsetY,'Wall').setSize(400 * scale, 50 * scale);// top of parking lot
    Walls.create(2650 + offsetX, -2100 + offsetY,'Wall').setSize(70 * scale, 1050 * scale);// right of parking lot
    Walls.create(2570 + offsetX, -1440 + offsetY,'Wall').setSize(70 * scale, 380 * scale);// bottom of parking lot
    Walls.create(2300 + offsetX, -340 + offsetY,'Wall').setSize(340 * scale, 620 * scale);// bottom right of casino

    //Bottom right
    Walls.create(3040 + offsetX, 1020 + offsetY,'Wall').setSize(30 * scale, 55 * scale);// Water 1
    Walls.create(3088 + offsetX, 1141 + offsetY,'Wall').setSize(20 * scale, 55 * scale);// water 2
    Walls.create(3040 + offsetX, 1262 + offsetY,'Wall').setSize(30 * scale, 139 * scale);// Water 3
    Walls.create(3088 + offsetX, 1570 + offsetY,'Wall').setSize(25 * scale, 20 * scale);// water 4
    Walls.create(3143 + offsetX, 1614 + offsetY,'Wall').setSize(20 * scale, 80 * scale);// water 5
    Walls.create(3088 + offsetX, 1790 + offsetY,'Wall').setSize(25 * scale, 20 * scale);// water 6
    Walls.create(2990 + offsetX, 1834 + offsetY,'Wall').setSize(45 * scale, 25 * scale);// water 7
    Walls.create(2930 + offsetX, 1890 + offsetY,'Wall').setSize(50 * scale, 25 * scale);// water 8
    Walls.create(2819 + offsetX, 1945 + offsetY,'Wall').setSize(50 * scale, 25 * scale);// water 9
    Walls.create(1900 + offsetX, 2360 + offsetY,'Wall').setSize(300 * scale, 200 * scale);// Building botom right
    Walls.create(2550 + offsetX, 2070 + offsetY,'Wall').setSize(200 * scale, 200 * scale);// Building botom right 2
    Walls.create(830 + offsetX, 2510 + offsetY,'Wall').setSize(530 * scale, 150 * scale);// Building botom right 3


    //Bottom left
    Walls.create(-1700 + offsetX, 1080 + offsetY,'Wall').setSize(90 * scale, 150 * scale);// building with stairs on right
    Walls.create(-1502 + offsetX, 1410 + offsetY,'Wall').setSize(170 * scale, 150 * scale);// building under cyber cit pink logo (left)
    Walls.create(-1128 + offsetX, 1570 + offsetY,'Wall').setSize(235 * scale, 355 * scale);// bottom left street
    Walls.create(-611 + offsetX, 2351 + offsetY,'Wall').setSize(525 * scale, 200 * scale);// blue ergo building
    Walls.create(544 + offsetX, 2615 + offsetY,'Wall').setSize(130* scale, 50 * scale);// water down middle
}

//Creating The Keys Needed
var keyA, keyS, keyD, keyW, keySpace;

function CreateKeys(T)
{
    keyA = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keySpace = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

function CheckOverlap(SpriteA, SpriteB)
{
    var boundsA = SpriteA.getBounds();
    var boundsB = SpriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}
