//import variables from base scene
import { config } from "./CyberCity.js";
import { game } from "./CyberCity.js";
import { Info } from './CityConnector.js';
import { AptSave } from './SaveManager.js';

var cursors, Walls;
var Player, Camera, StopMovement = false;
var scale = 3;
var LastFacing = 0;
var speed = 500; //150
var offsetX = 50, offsetY = -425;
var offsetXWall = 0, offsetYWall = 0;
var intOffsetX = 0, intOffsetY = -40;
var AnimNames = [];
var Computer, ComputerOpen = false, CompInterface;
var orderGroup;
var frameTime = 0;


export class RoomScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'RoomScene' });
    }

    preload ()
    {
        LoadRoomAssets(this);
        
        LoadComputerAssets(this);

        //load player
        this.load.spritesheet('Player', '../assets/cyberCity/Player/Char 2.png',
            { frameWidth: 32, frameHeight: 48}
        );

        console.log("Room Scene preLoaded");
    }
    
    create ()
    {
        Camera = this.cameras.main;

        //create bounds
        Walls = this.physics.add.staticGroup();
        CreateWalls();
        orderGroup = this.add.group();

        //Create Computer
        Computer = this.physics.add.sprite(1170, -350,'Wall').setScale(20);
        Computer.disableInteractive();
        Computer.depth = -10;
        
        CreateRoomAssets(this);

        //create Player
        Player = this.physics.add.sprite(config.width/7 + offsetXWall,config.height/15 + offsetYWall,'Player').setScale(2.5);
        Player.body.allowGravity = false; Player.setFrictionX(0); Player.setFrictionY(0); 
        Player.body.setSize(20, 35);
        Player.body.setOffset(5.5, 6.5);
        Player.depth = 1;
        orderGroup.add(Player);

        CreateRoomAssetsTopLayer(this);

        CreateComputerAssets(this);

        CreateAnims();

        // this.input.once('pointerdown', function (event) {
            
        //     RemoveAnims();
        //     console.log("Changing Scenes");
        //     this.scene.start('CityScene');

        // }, this);


        Camera.startFollow(Player);

        this.physics.add.collider(Player , Walls);

        cursors = this.input.keyboard.createCursorKeys();
        CreateKeys(this);
        console.log("Room Scene Created");
    }  

    update (time, delta)
    {
        frameTime += delta
        //Fixes the framerate to 60 frames per second
        if (frameTime > 16.5) {  
            frameTime = 0;
            OpenComputer();

            if(!StopMovement){
                Movement();
            }

            DepthSorting();
            //console.log("x: " + (Player.x + offsetX) + " y: " + (Player.y));
        }
    }
}

function DepthSorting()
{
    if(Player.y > -105)
    {
        orderGroup.children.each(function(item){
            if(item != Player)
            {
                item.depth = -1;
            }
        });

        LivStuffMiniTable.children.each(function(item){
            item.depth = 0;
        });
    }
    else
    {
        orderGroup.children.each(function(item){
            if(item != Player)
            {
                item.depth = 2;
            }
        });

        LivStuffMiniTable.children.each(function(item){
            item.depth = 3;
        });
    }
}

function CreateWalls()
{
    //-----Kitchen--------

    CreateWall(-220,-230,510,50);// Kitchen Top wall
    CreateWall(-230,-230,400,80);// Fridge / stove
    CreateWall(150,-230,80,200);// bar
    CreateWall(-270,-200,30,350);// Left wall
    CreateWall(-270,100,70,50);// Trash Can
    CreateWall(-270,110,560,50);// Bottom wall
    CreateWall(-135,30,135,80);// Table
    CreateWall(-165,55,20,50);// Left chair
    CreateWall(0,55,20,50);// right chair
    CreateWall(-85,10,35,50);// Top chair

    //-----Living Room--------

    CreateWall(290,-295,635,50);// Top wall
    CreateWall(290,-270,535,50);// BookShelf / Plant
    CreateWall(460,-270,280,70);// Couch
    CreateWall(290,135,635,50);// Bottom Wall
    CreateWall(490,100,225,50);// tv

    //-----BedRoom--------

    CreateWall(925,-430,485,50); // Top wall
    CreateWall(900,-430,25,150); // Left wall
    CreateWall(1410,-430,25,350); // Right wall
    CreateWall(1266,-170,200,90); // Bed
    CreateWall(1070,-430,40,70); // Desk Left Edge
    CreateWall(1220,-430,40,70); // Desk Right Edge
    CreateWall(1190,-360,30,45); // Chair
    CreateWall(910,-95,450,85); // Bottom Wall


    //-----BathRoom--------

    CreateWall(1060,-10,40,30); // Plant
    CreateWall(1190,-10,45,30); // Sink
    CreateWall(1308,-10,45,30); // Toilet
    CreateWall(1360,-95,50,360); // Right Wall
    CreateWall(925,250,450,50); // Bottom Wall
    CreateWall(890,135,35,150); // Left Wall
    CreateWall(1025,215,80,35); // TrashCan/Box
    CreateWall(1210,195,140,55); // BathTub
    
}

//#region Computer
function OpenComputer()
{
    if(CheckOverlap(Player, Computer))
    {
        //Add text indicator here
        ComputerOpen = true;
    }
    else
    {
        //Remove text indicator here
        ComputerOpen = false;
    }

    if(ComputerOpen || EditingRoom){
        if(keySpace.isDown)
        {
          OpenComputerInterface();
        }
        else if( keyEscape.isDown || keyBackspace.isDown)
        {
            CloseComputerInterface();
        }
    }
}

function OpenComputerInterface()
{
    StopMovement = true;
    CompInterface.x = Player.x + intOffsetX; CompInterface.y = Player.y + intOffsetY;
    CompInterface.visible = true;

    //ChairIcon.x = Player.x -188; ChairIcon.y = Player.y - 184;
    closetIcon.x = Player.x - 240; closetIcon.y = Player.y - 50;
    //DeskIcon.x = Player.x ; DeskIcon.y = Player.y - 184;
    BathIcon.x = Player.x - 80; BathIcon.y = Player.y - 50;
    couchIcon.x = Player.x + 80; couchIcon.y = Player.y - 50;
    //PCIcon.x = Player.x + 188; PCIcon.y = Player.y;
    //FlowerIcon.x = Player.x - 188; FlowerIcon.y = Player.y + 184;
    KitchenIcon.x = Player.x + 240; KitchenIcon.y = Player.y - 50;
    //PaintIcon.x = Player.x + 188; PaintIcon.y = Player.y +184;

    Icons.children.each(function(item){
        item.visible = false;
    });

    ComputerIcons.children.each(function(item){
        item.x = CompInterface.x; item.y = CompInterface.y;
        item.visible = true;
    });
    console.log("comp opened");
}

function CloseComputerInterface()
{
    Camera.setZoom(1);
    Player.x = PlayerOldx; Player.y = PlayerOldy;
    Player.visible = true;
    EditingRoom = false;
    CloseIcons();
    CompInterface.visible = false;
    ComputerIcons.children.each(function(item){
        item.visible = false;
    });

    Icons.children.each(function(item){
        item.visible = false;
    });

    StopMovement = false;

}

function onSkinClick()
{
    console.log("Opneed Skin menu");
}
//#endregion

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

var BedBed, BedChair, BedDesk, BedFloor, BedLeftSide, BedWall;
var BathFloor, BathWall, KitBin, KitCounter, KitTable, KitFloor, KitFridge, KitThingsOnTable, KitWall;
var LivCouch, LivFloor, LivFurn, LivMiniCouch, LivMiniTable, LivRightWindow, LivStuffMiniTable, LivTvTable, LivTv, LivWall;
var Scraps;

function LoadRoomAssets(T)
{
    T.load.image('BackGround', '../assets/cyberCity/Apts/Test.png');
    T.load.image('BedFloor', AptSave.BedFloor);
    T.load.image('BedWall', AptSave.BedWall);
    T.load.image('BedDesk', AptSave.BedDesk);
    T.load.image('BedChair', AptSave.BedChair);
    T.load.image('BedLeftSide', AptSave.BedLeftSide);
    T.load.image('BedBed', AptSave.BedBed);
    
    T.load.image('BathFloor', AptSave.BathFloor);
    T.load.image('BathWall', AptSave.BathWall);

    T.load.image('KitFloor', AptSave.KitFridge);
    T.load.image('KitWall', AptSave.KitWall);
    T.load.image('KitCounter', AptSave.KitCounter);
    T.load.image('KitFridge', AptSave.KitFridge);
    T.load.image('KitBin', AptSave.KitBin);
    T.load.image('KitTable', AptSave.KitTable);
    T.load.image('KitThingsOnTable', AptSave.KitThingsOnTable);

    T.load.image('LivFloor', AptSave.LivFloor);
    T.load.image('LivWall', AptSave.LivWall);
    T.load.image('LivCouch', AptSave.LivCouch);
    T.load.image('LivMiniCouch', AptSave.LivMiniCouch);
    T.load.image('LivMiniTable', AptSave.LivMiniTable);
    T.load.image('LivFurn', AptSave.LivFurn);
    T.load.image('LivRightWindow', AptSave.LivRightWindow);
    T.load.image('LivStuffMiniTable', AptSave.LivStuffMiniTable);
    T.load.image('LivTvTable', AptSave.LivTvTable);
    T.load.image('LivTv', AptSave.LivTv);

    T.load.image('BathBack', '../assets/cyberCity/Apts/SeperatedBathroom2.png');
    T.load.image('BathFront', '../assets/cyberCity/Apts/SeperatedBathroom.png');
    T.load.image('29S', '../assets/cyberCity/Apts/29.png');
    T.load.image('24S', '../assets/cyberCity/Apts/24.png');
    T.load.image('25S', '../assets/cyberCity/Apts/25.png');
    T.load.image('10S', '../assets/cyberCity/Apts/10.png');
    T.load.image('9S', '../assets/cyberCity/Apts/9.png');
    T.load.image('8S', '../assets/cyberCity/Apts/8.png');
    T.load.image('6S', '../assets/cyberCity/Apts/6.png');
    T.load.image('5S', '../assets/cyberCity/Apts/5.png');
    T.load.image('4S', '../assets/cyberCity/Apts/4.png');
    T.load.image('2S', '../assets/cyberCity/Apts/2.png');

    T.load.spritesheet('Wall', '../assets/cyberCity/Map/Wall.png',
        { frameWidth: 10, frameHeight: 10}
    );
}

function CreateItemGroups(T)
{
    BedBed = T.add.group();
    BedChair = T.add.group();
    BedDesk = T.add.group();
    BedFloor = T.add.group();
    BedLeftSide = T.add.group();
    BedWall = T.add.group();
    BathFloor = T.add.group();
    BathWall = T.add.group();
    KitBin = T.add.group();
    KitCounter = T.add.group();
    KitTable = T.add.group();
    KitFloor = T.add.group();
    KitFridge  = T.add.group();
    KitThingsOnTable = T.add.group();
    KitWall = T.add.group();
    LivCouch = T.add.group();
    LivFloor = T.add.group();
    LivFurn = T.add.group();
    LivMiniCouch = T.add.group();
    LivMiniTable = T.add.group();
    LivRightWindow = T.add.group();
    LivStuffMiniTable  = T.add.group();
    LivTvTable = T.add.group();
    LivTv  = T.add.group();
    LivWall = T.add.group();
    Scraps = T.add.group();
}

function CreateRoomAssets(T)
{
    CreateItemGroups(T);

    var bg = T.add.sprite((config.width/2),(config.height/2),'BackGround').setScale(1);
    bg.depth = -2;

    BedFloor.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'BedFloor').setScale(scale));
    BedWall.add(T.add.sprite((config.width/2) + offsetX ,(config.height/2) + offsetY,'BedWall').setScale(scale));
    BedDesk.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'BedDesk').setScale(scale));
    BedLeftSide.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'BedLeftSide').setScale(scale));
    BedChair.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) +offsetY,'BedChair').setScale(scale));

    BathFloor.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'BathFloor').setScale(scale));
    BathWall.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'BathWall').setScale(scale));

    KitFloor.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'KitFloor').setScale(scale));
    KitWall.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'KitWall').setScale(scale));
    KitCounter.add( T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'KitCounter').setScale(scale));
    KitFridge.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'KitFridge').setScale(scale));
    

    LivFloor.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivFloor').setScale(scale));
    LivWall.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivWall').setScale(scale));
    LivFurn.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivFurn').setScale(scale));

    Scraps.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'29S').setScale(scale));

    LivCouch.add(T.add.sprite((config.width/2)+ offsetX,(config.height/2) + offsetY,'LivCouch').setScale(scale));
    LivMiniCouch.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivMiniCouch').setScale(scale));
    LivMiniTable.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivMiniTable').setScale(scale));
    LivRightWindow.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivRightWindow').setScale(scale));
    LivStuffMiniTable.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivStuffMiniTable').setScale(scale));

    Scraps.add(T.add.sprite((config.width/2),(config.height/2),'2S').setScale(1));
    Scraps.add(T.add.sprite((config.width/2),(config.height/2),'4S').setScale(1));
    Scraps.add(T.add.sprite((config.width/2),(config.height/2),'5S').setScale(1));
    Scraps.add(T.add.sprite((config.width/2),(config.height/2),'6S').setScale(1));
    Scraps.add(T.add.sprite((config.width/2),(config.height/2),'8S').setScale(1));
    Scraps.add(T.add.sprite((config.width/2),(config.height/2),'9S').setScale(1));
    Scraps.add(T.add.sprite((config.width/2),(config.height/2),'10S').setScale(1));


    Scraps.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'BathBack').setScale(scale));

}

function CreateRoomAssetsTopLayer(T)
{

    BedBed.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'BedBed').setScale(scale));

    KitTable.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'KitTable').setScale(scale));
    KitThingsOnTable.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'KitThingsOnTable').setScale(scale));
    KitBin.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'KitBin').setScale(scale));    

    LivTvTable.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivTvTable').setScale(scale));
    LivTv.add(T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'LivTv').setScale(scale));
    var a = T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'24S').setScale(scale);
    var b = T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'25S').setScale(scale);

    var c = T.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY,'BathFront').setScale(scale);

    a.depth = 2;
    b.depth = 2;
    c.depth = 2;

}

function LoadComputerAssets(T)
{
    T.load.image('CompInterface', '../assets/cyberCity/ComputerAssets/Desktop.png');
    T.load.image('BarIcon', '../assets/cyberCity/ComputerAssets/BarIcon.png');
    T.load.image('MailIcon', '../assets/cyberCity/ComputerAssets/MailIcon.png');
    T.load.image('GameIcon', '../assets/cyberCity/ComputerAssets/GameIcon.png');
    T.load.image('BalanceIcon', '../assets/cyberCity/ComputerAssets/BalanceIcon.png');
    T.load.image('FurnitureIcon', '../assets/cyberCity/ComputerAssets/FurnitureIcon.png');
    T.load.image('BalanceIcon', '../assets/cyberCity/ComputerAssets/BalanceIcon.png');

    T.load.image('ChairIcon', '../assets/cyberCity/ComputerAssets/icons/1.png');
    T.load.image('DeskIcon', '../assets/cyberCity/ComputerAssets/icons/asd.png');
    T.load.image('BathIcon', '../assets/cyberCity/ComputerAssets/icons/bathroom.png');
    T.load.image('closetIcon', '../assets/cyberCity/ComputerAssets/icons/closetsetc.png');
    T.load.image('couchIcon', '../assets/cyberCity/ComputerAssets/icons/couches.png');
    T.load.image('PCIcon', '../assets/cyberCity/ComputerAssets/icons/electronic.png');
    T.load.image('FlowerIcon', '../assets/cyberCity/ComputerAssets/icons/flowers.png');
    T.load.image('KitchenIcon', '../assets/cyberCity/ComputerAssets/icons/kitchen.png');
    T.load.image('PaintIcon', '../assets/cyberCity/ComputerAssets/icons/paint.png');

    for (var i = 0; i < Info.FurnitureInfo.length; i++) {
        T.load.image(Info.FurnitureInfo[i].ID, Info.FurnitureInfo[i].Icon);
    }

    for (var i = 0; i < Info.FurnitureInfo.length; i++) {
        T.load.image(Info.FurnitureInfo[i].ID + "Path", Info.FurnitureInfo[i].Path);
    }    
}

function AddToGroup(type , item)
{
    switch(type)
    {
        case "BedBed":
            BedBed.add(item);
            break;
        case "BedChair":
            BedChair.add(item);
            break;
        case "BedDesk":
            BedDesk.add(item);
            break;
        case "BedFloor":
           BedFloor.add(item);
            break;
        case "BedLeftSide":
            BedLeftSide.add(item);
            break;
        case "BedWall":
            BedWall.add(item);
            break;
        case "BathFloor":
            BathFloor.add(item);
            break;
        case "BathWall":
            BathWall.add(item);
            break;
        case "KitBin":
            KitBin.add(item);
            break;  
        case "KitCounter":
            KitCounter.add(item);
            break;
        case "KitTable":
            KitTable.add(item);
            break;
        case "KitFloor":
            KitFloor.add(item);
            break; 
        case "KitFridge":
            KitFridge.add(item);
            break;
        case "KitThingsOnTable":
            KitThingsOnTable.add(item);
            break;
        case "KitWall":
            KitWall.add(item);
            break; 
        case "LivCouch":
            LivCouch.add(item);
            break; 
        case "LivFloor":
            LivFloor.add(item);
            break; 
        case "LivFurn":
            LivFurn.add(item);
            break; 
        case "LivMiniCouch":
            LivMiniCouch.add(item);
            break; 
        case "LivMiniTable":
            LivMiniTable.add(item);
            break; 
        case "LivRightWindow":
            LivRightWindow.add(item);
            break; 
        case "LivStuffMiniTable":
            LivStuffMiniTable.add(item);
            break; 
        case "LivTvTable":
            LivTvTable.add(item);
            break; 
        case "LivTv":
            LivTv.add(item);
            break; 
        case "LivWall":
            LivWall.add(item);
            break; 
    }
}

var ComputerIcons, MailIcon, GameIcon, BalanceIcon, FurnitureIcon, BarIcon, Icons;
var ChairIcon, DeskIcon, BathIcon, closetIcon, couchIcon, PCIcon, FlowerIcon, KitchenIcon, PaintIcon;
var ChairGroup, DeskGroup, BathGroup, ClosetGroup, CouchGroup, PcGroup, FlowerGroup, KitchenGroup, PaintGroup;
var AssetList;

function CreateComputerAssets(T)
{
    CreateGroups(T);

    for (var i = 0; i < Info.FurnitureInfo.length; i++) {
        var item = T.physics.add.sprite((config.width/2) + offsetX,(config.height/2) + offsetY, Info.FurnitureInfo[i].ID + "Path").setScale(scale);
        item.name = Info.FurnitureInfo[i].Path;
        AddToGroup(Info.FurnitureInfo[i].Type , item);
        AssetList.add(item);
    }

    CompInterface = T.physics.add.sprite(config.width/2, config.height/2,'CompInterface');
    CompInterface.visible = false;
    CompInterface.depth = 3;    
    
    MailIcon = T.physics.add.sprite(Player.x , Player.y, 'MailIcon').setInteractive();
    GameIcon = T.physics.add.sprite(Player.x , Player.y, 'GameIcon').setInteractive();
    BalanceIcon = T.physics.add.sprite(Player.x , Player.y, 'BalanceIcon').setInteractive();
    FurnitureIcon = T.physics.add.sprite(Player.x , Player.y, 'FurnitureIcon').setInteractive();

    MailIcon.on('pointerdown', onMailClick);
    GameIcon.on('pointerdown', onGameClick);
    BalanceIcon.on('pointerdown',onBalanceClick);
    FurnitureIcon.on('pointerdown', onFurnitureClick);
    
    ComputerIcons.add(T.physics.add.sprite(Player.x , Player.y, 'BarIcon'));
    ComputerIcons.add(MailIcon);
    ComputerIcons.add(GameIcon);
    ComputerIcons.add(BalanceIcon);
    ComputerIcons.add(FurnitureIcon);

    //ChairIcon = T.physics.add.sprite(Player.x , Player.y, 'ChairIcon').setInteractive(); ChairIcon.setScale(2);
    closetIcon = T.physics.add.sprite(Player.x , Player.y, 'closetIcon').setInteractive(); closetIcon.setScale(2);
    //DeskIcon = T.physics.add.sprite(Player.x , Player.y, 'DeskIcon').setInteractive(); DeskIcon.setScale(2);
    BathIcon = T.physics.add.sprite(Player.x , Player.y, 'BathIcon').setInteractive(); BathIcon.setScale(2);
    couchIcon = T.physics.add.sprite(Player.x , Player.y, 'couchIcon').setInteractive(); couchIcon.setScale(2);
    //PCIcon = T.physics.add.sprite(Player.x , Player.y, 'PCIcon').setInteractive(); PCIcon.setScale(2);
    //FlowerIcon = T.physics.add.sprite(Player.x , Player.y, 'FlowerIcon').setInteractive(); FlowerIcon.setScale(2);
    KitchenIcon = T.physics.add.sprite(Player.x , Player.y, 'KitchenIcon').setInteractive(); KitchenIcon.setScale(2);
    //PaintIcon = T.physics.add.sprite(Player.x , Player.y, 'PaintIcon').setInteractive(); PaintIcon.setScale(2);
    
    //ChairIcon.on('pointerdown', onChairClick);
    closetIcon.on('pointerdown', onClosetClick);
    //DeskIcon.on('pointerdown', onDeskClick);
    BathIcon.on('pointerdown', onBathClick);
    couchIcon.on('pointerdown', onCouchClick);
    //PCIcon.on('pointerdown', onPCClick);
    //FlowerIcon.on('pointerdown', onFlowerClick);
    KitchenIcon.on('pointerdown', onKitchenClick);
    //PaintIcon.on('pointerdown', onPaintClick);

    //Icons.add(ChairIcon);
    // Icons.add(DeskIcon);
    Icons.add(BathIcon);
    Icons.add(closetIcon);
    Icons.add(couchIcon);
    //Icons.add(PCIcon);
    // Icons.add(FlowerIcon);
     Icons.add(KitchenIcon);
    // Icons.add(PaintIcon);

    for (var i = 0; i < Info.FurnitureInfo.length; i++) {
        var Item;
        Item = T.physics.add.sprite(Player.x , Player.y, Info.FurnitureInfo[i].ID);
        Item.setInteractive();
        Item.setScale(2);
        AddToFurnitureGroup(Item, Info.FurnitureInfo[i].Room);
        Item.visible = false;
        var Ty = Info.FurnitureInfo[i].Type;
        var index =  i;
        onIconClick(Ty, index, Item);
        Item.depth = 4;
    }
    
    SetItemDepthAndVisibility();
}

function SetItemDepthAndVisibility()
{
    LivMiniCouch.children.each(function(item){
        orderGroup.add(item);
        item.depth = -1;
    });
    LivMiniTable.children.each(function(item){
        orderGroup.add(item);
        item.depth = -1;
    });
    LivStuffMiniTable.children.each(function(item){
        orderGroup.add(item);
        item.depth = 0;
    });

    AssetList.children.each(function(item){
        item.visible = false;
    });

    Icons.children.each(function(item){
        item.depth = 4;
        item.visible = false;
    });

    ComputerIcons.children.each(function(item){
        item.depth = 4;
        item.visible = false;
    });

    Scraps.children.each(function(item){
        item.depth = -1;
    });
    BedBed.children.each(function(item){
        item.depth = 2;
    });
    BedChair.children.each(function(item){
        item.depth = 0;
    });
    BedDesk.children.each(function(item){
        item.depth = -1;
    });
    BedFloor.children.each(function(item){
        item.depth = -3;
    });
    BedLeftSide.children.each(function(item){
        item.depth = -1;
    });
    BedWall.children.each(function(item){
        item.depth = -2;
    });
    BathFloor.children.each(function(item){
        item.depth = -3;
    });
    BathWall.children.each(function(item){
        item.depth = -2;
    });
    KitBin.children.each(function(item){
        item.depth = 2;
    });
    KitCounter.children.each(function(item){
        item.depth = -1;
    });
    KitTable.children.each(function(item){
        item.depth = 2;
    });
    KitFloor.children.each(function(item){
        item.depth = -3;
    });
    KitFridge.children.each(function(item){
        item.depth = -1;
    });
    KitThingsOnTable.children.each(function(item){
        item.depth = 3;
    });
    KitWall.children.each(function(item){
        item.depth = -2;
    });
    LivCouch.children.each(function(item){
        item.depth = -1;
    });
    LivFloor.children.each(function(item){
        item.depth = -3;
    });
    LivFurn.children.each(function(item){
        item.depth = -1;
    });
    LivRightWindow.children.each(function(item){
        item.depth = -1;
    });
    LivTvTable.children.each(function(item){
        item.depth = 2;
    });
    LivTv.children.each(function(item){
        item.depth = 3;
    });
    LivWall.children.each(function(item){
        item.depth = -2;
    });
    Walls.children.each(function(item){
        item.depth = -10;
    });
    
}

function CloseIcons()
{
    ChairGroup.children.each(function(item){
        item.visible = false;
    });
    DeskGroup.children.each(function(item){
        item.visible = false;
    });
    BathGroup.children.each(function(item){
        item.visible = false;
    });
    ClosetGroup.children.each(function(item){
        item.visible = false;
    });
    CouchGroup.children.each(function(item){
        item.visible = false;
    });
    PcGroup.children.each(function(item){
        item.visible = false;
    });
    FlowerGroup.children.each(function(item){
        item.visible = false;
    });
    KitchenGroup.children.each(function(item){
        item.visible = false;
    });
    PaintGroup.children.each(function(item){
        item.visible = false;
    });
}

function AddToFurnitureGroup(item, room)
{

    switch(room)
    {
        case "Ba":
            BathGroup.add(item);
            break;
        case "Be":
            ClosetGroup.add(item);
            break;
        case "Li":
            CouchGroup.add(item);
            break;
        case "Ki":
            KitchenGroup.add(item);
            break;
    }

    // switch(room)
    // {
    //     case "Ch":
    //          ChairGroup.add(item);
    //         break;
    //     case "De":
    //          DeskGroup.add(item);
    //         break;
    //     case "Ba":
    //         BathGroup.add(item);
    //         break;
    //     case "Cl":
    //         ClosetGroup.add(item);
    //         break;
    //     case "Co":
    //         CouchGroup.add(item);
    //         break;
    //     case "Pc":
    //         PcGroup.add(item);
    //         break;
    //     case "Fl":
    //         FlowerGroup.add(item);
    //         break;
    //     case "Ki":
    //         KitchenGroup.add(item);
    //         break;
    //     case "Pa":
    //         PaintGroup.add(item);
    //         break;  
    // }
}

function CreateGroups(T)
{
    ComputerIcons = T.add.group();
    Icons = T.add.group();
    AssetList = T.add.group();

    ChairGroup = T.add.group();
    DeskGroup = T.add.group();
    BathGroup = T.add.group();
    ClosetGroup = T.add.group();
    CouchGroup = T.add.group();
    PcGroup = T.add.group();
    FlowerGroup = T.add.group();
    KitchenGroup = T.add.group();
    PaintGroup = T.add.group();
}

//#region OnClick
function onIconClick(type , index, Item)
{ 
    switch(type)
    {
        case "BedBed":
            Item.on('pointerdown', function() {
                HideAndSearch(index, BedBed);
            });
            break;
        case "BedChair":
            Item.on('pointerdown', function() {
                HideAndSearch(index, BedChair);
            });
            break;
        case "BedDesk":
            Item.on('pointerdown', function() {
                HideAndSearch(index, BedDesk);
            });
            break;
        case "BedFloor":
            Item.on('pointerdown', function() {
                HideAndSearch(index, BedFloor);
            });
            break;
        case "BedLeftSide":
            Item.on('pointerdown', function() {
                HideAndSearch(index, BedLeftSide);
            });
            break;
        case "BedWall":
            Item.on('pointerdown', function() {
                HideAndSearch(index, BedWall);
            });
            break;
        case "BathFloor":
            Item.on('pointerdown', function() {
                HideAndSearch(index, BathFloor);
            });
            break;
        case "BathWall":
            Item.on('pointerdown', function() {
                HideAndSearch(index, BathWall);
            });
            break;
        case "KitBin":
            Item.on('pointerdown', function() {
                HideAndSearch(index, KitBin);
            });
            break;  
        case "KitCounter":
            Item.on('pointerdown', function() {
                HideAndSearch(index, KitCounter);
            });
            break;
        case "KitTable":
            Item.on('pointerdown', function() {
                HideAndSearch(index, KitTable);
            });
            break;
        case "KitFloor":
            Item.on('pointerdown', function() {
                HideAndSearch(index, KitFloor);
            });
            break; 
        case "KitFridge":
            Item.on('pointerdown', function() {
                HideAndSearch(index, KitFridge);
            });
            break;
        case "KitThingsOnTable":
            Item.on('pointerdown', function() {
                HideAndSearch(index, KitThingsOnTable);
            });
            break;
        case "KitWall":
            Item.on('pointerdown', function() {
                HideAndSearch(index, KitWall);
            });
            break; 
        case "LivCouch":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivCouch);
            });
            break; 
        case "LivFloor":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivFloor);
            });
            break; 
        case "LivFurn":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivFurn);
            });
            break; 
        case "LivMiniCouch":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivMiniCouch);
            });
            break; 
        case "LivMiniTable":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivMiniTable);
            });
            break; 
        case "LivRightWindow":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivRightWindow);
            });
            break; 
        case "LivStuffMiniTable":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivStuffMiniTable);
            });
            break; 
        case "LivTvTable":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivTvTable);
            });
            break; 
        case "LivTv":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivTv);
            });
            break; 
        case "LivWall":
            Item.on('pointerdown', function() {
                HideAndSearch(index, LivWall);
            });
            break; 
    }
}

function HideAndSearch(index, list){
    list.children.each(function(item){
        item.visible = false;
    });
    
    var i = 0;
    AssetList.children.each(function(item){
        if(i == index){
            item.visible = true;
        }
        i++
    });
}

function onFurnitureClick()
{
    ComputerIcons.children.each(function(item){
        item.visible = false;
    });

    Icons.children.each(function(item){
        item.visible = true;
    });

}

function onBalanceClick()
{
    //ToDo: show erg or cybcoin balance
}

function onGameClick()
{

}

function onMailClick()
{
 console.log('You Got Mail!');
}

//#region editRoomOnClicks
function PlaceFurnitureTile(item, i , x , y)
{
    //item.x = (Player.x -250) + (iconVariationX * x); 
    //item.y = (Player.y - 260) + (iconVariationY * y);
    item.x = (Player.x - 950) + (iconVariationX * x); 
    item.y = (Player.y - 500) + (iconVariationY * y);
    item.visible = true;
}

var iconVariationX = 110;
var iconVariationY = 120;
var PlayerOldx, PlayerOldy, EditingRoom = false;

function openListOnClick(List)
{
    Icons.children.each(function(item){
        item.visible = false;
    });
    CompInterface.visible = false;  
    Camera.setZoom(0.7);
    Player.visible = false;
    PlayerOldx = Player.x;
    PlayerOldy = Player.y;
    Player.x = 550; Player.y = 0;
    EditingRoom = true;

    var x = 0;
    var y = 0;
    var i = 0;
    List.children.each(function(item)
    {

        if(x > 11){
            x = 0;
            y += 1;
        }
        PlaceFurnitureTile(item, i , x , y);
        i++;
        x++;
    });
}

function onChairClick()
{
    openListOnClick(ChairGroup);
}

function onDeskClick()
{
    openListOnClick(DeskGroup);
}

function onBathClick()
{
    openListOnClick(BathGroup);
}

function onClosetClick()
{
    openListOnClick(ClosetGroup);
}

function onCouchClick()
{
    openListOnClick(CouchGroup);
}

function onPCClick()
{
    openListOnClick(PcGroup);
}

function onFlowerClick()
{
    openListOnClick(FlowerGroup);
}

function onKitchenClick()
{
    openListOnClick(KitchenGroup);
}

function onPaintClick()
{
    openListOnClick(PaintGroup);
}
//#endregion
//#endregion

//#region Inputs
var keyA, keyS, keyD, keyW, keySpace, keyEscape, keyBackspace;

function CreateKeys(T)
{
    keyA = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keySpace = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyEscape = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    keyBackspace = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
}
//#endregion

//#region Helper Classes
function CheckOverlap(SpriteA, SpriteB)
{
    if(SpriteA == null || SpriteB == null)
        return false;
    var boundsA = SpriteA.getBounds();
    var boundsB = SpriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}

function CreateWall(A, B , C , D)
{
    Walls.create(A + offsetXWall, B + offsetYWall,'Wall').setSize(C , D);
}
//#endregion