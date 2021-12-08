var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#53cbea',
    physics: 
    {
      default: 'arcade',
      arcade: 
      {
        gravity: { y: 3500 },
        debug: false
      }
    },
    scene: 
    {
        preload: preload,
        create: create,
        update: update
    },
    audio:
    {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);
var Skin = 'dino2';

function preload ()
{
    SkinChecker();
    this.load.bitmapFont('atari', '../assets/cyberDino/Fonts/atari-classic.png', '../assets/cyberDino/Fonts/atari-classic.xml');
    this.load.image('ground', '../assets/cyberDino/png/Tiles/BGTile (1).png');
    this.load.image('Floor', '../assets/cyberDino/sprites/Floor.png');
    this.load.image('tree1' , "../assets/cyberDino/sprites/Tree1.png"); 
    this.load.image('tree2' , "../assets/cyberDino/sprites/Tree2.png"); 
    this.load.image('tree3' , "../assets/cyberDino/sprites/Tree3.png"); 
    this.load.image('Block1' , "../assets/cyberDino/sprites/Block1.png"); 
    this.load.image('Block2' , "../assets/cyberDino/sprites/Block2.png"); 
    this.load.image('Block3' , "../assets/cyberDino/sprites/Block3.png");
    this.load.image('Drone1' , "../assets/cyberDino/sprites/Drone1.png");
    this.load.image('Drone2' , "../assets/cyberDino/sprites/Drone2.png"); 
    this.load.image('Drone3' , "../assets/cyberDino/sprites/Drone3.png"); 

    this.load.spritesheet('dino2', 
        `../assets/cyberDino/Skins/dino2.png`,
        { frameWidth: 109, frameHeight: 120}
    );
    this.load.spritesheet('bones', 
        `../assets/cyberDino/Skins/bones.png`,
        { frameWidth: 109, frameHeight: 120}
    );
    this.load.spritesheet('gold', 
        `../assets/cyberDino/Skins/gold.png`,
        { frameWidth: 109, frameHeight: 120}
    );
    this.load.spritesheet('newdino', 
        `../assets/cyberDino/Skins/newdino.png`,
        { frameWidth: 109, frameHeight: 120}
    );
    this.load.spritesheet('robot', 
        `../assets/cyberDino/Skins/robot.png`,
        { frameWidth: 109, frameHeight: 120}
    );
    this.load.audio('jumpsfx',['../assets/cyberDino/sfx/Jump1.wav']);

    this.load.image('BG1' , '../assets/cyberDino/sprites/back 1.png');
    this.load.image('BG2' , '../assets/cyberDino/sprites/back 2.png');
    this.load.image('BG3' , '../assets/cyberDino/sprites/back 3.png');
    this.load.image('BG4' , '../assets/cyberDino/sprites/back 4.png');
    this.load.image('BG5' , '../assets/cyberDino/sprites/back 5.png');

    this.load.spritesheet('TS', 
        `../assets/cyberDino/sprites/TileSet cyber.png`,
        { frameWidth: 25, frameHeight: 25}
    );

    console.log("preload Complete!");  
}

var platforms;
var player;
var cursors;
var score, scoreText;
var MiddleText;
var HighScore = 0;
var HighScoreText;
var tree1, tree2, tree3, tree4, Bird ,Bird2, Bird3;
var Box1, Box2;
var SpawnX , SpawnY, DespawnX, SpawnYBird;
var Framerate;
var pause;
var GameState; //0 = new Game, 1 = in game, 2 = play again
var spawned;
var SFX;
var floor;
var BG, BG1, BG2, BG3, BG4, BG5;


function create ()
{

    //set default variables
    SetDefaultVariables();

    BG1 = this.add.tileSprite(config.width/2, config.height/2, 0 ,0, 'BG1');
    BG2 = this.add.tileSprite(config.width/2, config.height/2, 0 ,0, 'BG2');
    BG3 = this.add.tileSprite(config.width/2, config.height/2, 0 ,0, 'BG3');
    BG4 = this.add.tileSprite(config.width/2, config.height/2, 0 ,0, 'BG4');
    BG5 = this.add.tileSprite(config.width/2, config.height/2, 0 ,0, 'BG5');

    platforms = this.physics.add.staticGroup();

    //create platforms //TODO replace with a singe platform
    platforms.create(config.width * 0.15, config.height * 0.985, 'ground').setVisible(false);
    platforms.create(config.width * 0.45, config.height* 0.985, 'ground').setVisible(false);
    platforms.create(config.width * 0.75, config.height* 0.985, 'ground').setVisible(false);
    platforms.create(config.width * 1.05, config.height* 0.985, 'ground').setVisible(false);

    floor = this.add.tileSprite(config.width * 0.45, config.height* 0.946, 1200 , 230, "Floor");

    //Creating trees    
    tree1 = this.physics.add.sprite(SpawnX, SpawnY, 'tree1').setScale(1.2); tree1.setBounce(0);
    tree2 = this.physics.add.sprite(SpawnX, SpawnY, 'tree2').setScale(1.2); tree2.setBounce(0);
    tree3 = this.physics.add.sprite(SpawnX, SpawnY, 'tree3').setScale(1.2); tree3.setBounce(0);
    tree4 = this.physics.add.sprite(SpawnX, SpawnY, 'Block1').setScale(1.6); tree4.setBounce(0);
    Box1 = this.physics.add.sprite(SpawnX, SpawnY, 'Block2').setScale(1.6); tree4.setBounce(0);
    Box2 = this.physics.add.sprite(SpawnX, SpawnY, 'Block2').setScale(1.6); tree4.setBounce(0);
    Bird = this.physics.add.sprite(SpawnX, SpawnY, 'Drone1').setScale(1.5); tree4.setBounce(0);
    Bird2 = this.physics.add.sprite(SpawnX, SpawnY, 'Drone2').setScale(1.5); tree4.setBounce(0);
    Bird3 = this.physics.add.sprite(SpawnX, SpawnY, 'Drone3').setScale(1.5); tree4.setBounce(0);

    //create sfx
    SFX = this.sound;

    //create player
    player = this.physics.add.sprite(config.width * 0.2, config.height * 0.58, 'dino2').setScale(1);
    player.setBounce(0.1);
    player.setCollideWorldBounds(true); //sets border of the screen to be bounds
    player.body.setSize(65, 110 );

    //Create Score Text
    scoreText = this.add.bitmapText(config.width - config.width, config.height - config.height, 'atari', 'score: 0').setScale(0.35);
    scoreText.setTint(0xba1298, 0xba1298, 0xba1298, 0xba1298);

    HighScoreText = this.add.bitmapText(config.width /1.82, 0,'atari', '').setScale(0.35);
    HighScoreText.setTint(0x250dbf, 0x250dbf, 0x250dbf, 0x250dbf);

    MiddleText = this.add.text(config.width / 2 , config.height / 2, 'Click to play', { fontSize: '32px', fill: '#fff' , align: 'center' }).setOrigin(0.5);
    MiddleText.setStroke('#fe2af7' , 2);
    MiddleText.setShadow(2, 2, "33333", 2, true, true);
    MiddleText.setTint(0xfe2af7, 0xfe2af7, 0xfe2af7, 0xfe2af7);

    //add physics
    this.physics.add.collider(player , platforms);
    this.physics.add.collider(tree1, platforms); this.physics.add.overlap(player, tree1, GameOver, null, this);
    this.physics.add.collider(tree2, platforms); this.physics.add.overlap(player, tree2, GameOver, null, this);
    this.physics.add.collider(tree3, platforms); this.physics.add.overlap(player, tree3, GameOver, null, this);
    this.physics.add.collider(tree4, platforms); this.physics.add.overlap(player, tree4, GameOver, null, this);
    this.physics.add.collider(Box1, platforms); this.physics.add.overlap(player, Box1, GameOver, null, this);
    this.physics.add.collider(Box2, platforms); this.physics.add.overlap(player, Box2, GameOver, null, this);
    this.physics.add.collider(Bird, platforms); this.physics.add.overlap(player, Bird, GameOverBird, null, this);
    this.physics.add.collider(Bird2, platforms); this.physics.add.overlap(player, Bird2, GameOverBird, null, this);
    this.physics.add.collider(Bird3, platforms); this.physics.add.overlap(player, Bird3, GameOverBird, null, this);
    Bird.body.allowGravity = false;
    Bird2.body.allowGravity = false;
    Bird3.body.allowGravity = false;

    cursors = this.input.keyboard.createCursorKeys();

    //pause Function
    this.input.on('pointerdown', function () {
        onClickScreen();
    });

    console.log("Create complete!");

}

function loadPlayer(text)
{
    player.setTexture(Skin);

    game.anims.create({
        key: 'Run',
        frames: game.anims.generateFrameNumbers( Skin , { start: 1, end: 2 }),
        frameRate: Framerate,
        repeat: true
    });
    game.anims.create({
        key: 'Jump',
        frames: game.anims.generateFrameNumbers( Skin , { start: 3, end: 3 }),
        frameRate: Framerate,
        repeat: true
    });
    game.anims.create({
        key: 'Crouch',
        frames: game .anims.generateFrameNumbers( Skin, { start: 4, end: 6 }),
        frameRate: Framerate,
        repeat: true
    });
}

function onClickScreen()
{
    switch(GameState)
    {
        case 0:
            MiddleText.setText("");
            GameState = 1;
            pause = !pause;
            break;
        case 1:
            Pause();
            break;
        case 2:
            // save high score and start new game
            if(score > HighScore) HighScore = score;
            MiddleText.setText("");
            ResetGame();
            pause = false;
            break;
    }
}

function Pause()
{
    if (pause)
    {
        MiddleText.setText("");
    }
    else
    {
        MiddleText.setText("Paused");
    }
    pause = !pause;
}

var speed;
var interval;
var DTime;
var PlayerState; //player state 0 = running, 1 = jumping, 2 = crouching
var LastTime;
var DeadTime = 0;

//runs 60 times a second
function update (time , delta)
{    
    if(!pause){

    this.physics.resume();
    
    //updates highscore
    HighScoreUpdate();

    //updates Score
    score += 1;
    scoreText.setText('Score: ' + score);

    //Move The Floor
    MoveFloor();

    //Spawns a new tree based on time
    DTime += delta;
    if(DTime >= interval)
    {
        if(score <= 2000)
            GetNextTree(Phaser.Math.Between(1, 4));
        else if(score <= 4000)
            GetNextTree(Phaser.Math.Between(1, 6));
        else
            GetNextTree(Phaser.Math.Between(1, 9));
        console.log("Interval");
        DTime = 0;
    }

    // Despawns Trees
    deSpawn();

    //Move the player
    if (cursors.up.isDown && player.body.touching.down || cursors.space.isDown && player.body.touching.down)
    {       
        PlayerState = 1;
        player.setVelocityY(-(speed * 2));
        SFX.play('jumpsfx');
    }
    else if(player.body.touching.down && !cursors.down.isDown) 
    {
        PlayerState = 0;
    }
    else if( cursors.down.isDown && player.body.touching.down)
    {
        PlayerState = 2;       
    }

    //SpeedUp
    if(LastTime + 1000 < score)
    {
        LastTime = score;
        SpeedUp();
    }

    //Keep Player Velocity at 0
    player.setVelocityX(0);
    
    CheckState();
   }
   else{ 
    this.physics.pause(); 
    DeadTime += delta;
    if(cursors.up.isDown && DeadTime > 500 || cursors.space.isDown && DeadTime > 500){
        onClickScreen();
        DeadTime = 0;
    }
    }
}

function HighScoreUpdate()
{
    if(HighScore == 0)
    {
        HighScoreText.setText("");
    }
    else
    {
        HighScoreText.setText("HighScore: " + HighScore);
    }
}

function MoveFloor()
{  
    floor.tilePositionX += treeVelocity / 60;

    BG5.tilePositionX += treeVelocity / 5000;
    BG4.tilePositionX += treeVelocity / 10000;
    BG3.tilePositionX += treeVelocity / 15000;
    BG2.tilePositionX += treeVelocity / 20000;
    BG1.tilePositionX += treeVelocity / 25000;
}

function CheckState()
{
    switch(PlayerState){
        case 0://run
            player.anims.play('Run' , true);        
            break;
        case 1://jump
            player.anims.play('Jump' , true);
            break;
        case 2://crouch
            player.anims.play('Crouch' , true);
            break;
    }
}

var treeIndex;
var treeVelocity;

function SetDefaultVariables()
{
    score = 0;
    SpawnX = config.width * 1.1;
    SpawnY = config.height* 0.65;
    SpawnYBird = config.height * 0.62;
    DespawnX = -(config.width * 0.1);
    Framerate = 6;
    spawned = 0;
    pause = true;
    GameState = 0;
    speed = 600;//jump speed
    interval = 2000;
    DTime = 0;
    PlayerState = 0; 
    treeIndex = 0;
    treeVelocity = 500;
    LastTime = 0;
}

//Moves the Appropriate tree forward when called
function GetNextTree(randomNumber)
{
    if(spawned < 2){
    switch(randomNumber){
        
        case 1:
                if(tree1.x == SpawnX){
                    tree1.setVelocityX(-treeVelocity);
                    spawned++;
                 }
            break;
        case 2:
            if(tree2.x == SpawnX){
                    tree2.setVelocityX(-treeVelocity);
                    spawned++;
                }
            break;
        case 3:
            if(tree3.x == SpawnX){
                    tree3.setVelocityX(-treeVelocity);
                    spawned++;
                }
            break;
        case 4:
            if(tree4.x == SpawnX){
                    tree4.setVelocityX(-treeVelocity);
                    spawned++;
                }
            break;
        case 5:
                if(Bird.x == SpawnX){
                    Bird.setVelocityX(-treeVelocity);  
                    spawned++;                  
                }
                SpeedUp();                
            break;
        case 6:
                if(Box1.x == SpawnX){
                    Box1.setVelocityX(-treeVelocity);
                    spawned++;
                }
            break; 
        case 7:
                if(Box2.x == SpawnX){
                    Box2.setVelocityX(-treeVelocity);
                    spawned++;
                }
            break;
        case 8:
                if(Bird2.x == SpawnX){
                    Bird2.setVelocityX(-treeVelocity);
                    spawned++;
                }
            break;
        case 9:
                if(Bird3.x == SpawnX){
                    Bird3.setVelocityX(-treeVelocity);
                    spawned++;
                }
            break;        
    }
    console.log("spawnTree");
}
}

function SpeedUp()
{
    console.log("Speed UP!!!");
    player.anims.setTimeScale(player.anims.getTimeScale() + 0.1);
    player.anims.setDuration
    treeVelocity += 40;
    interval -= interval / 12;
    speed -= 10;
}

function deSpawn()
{
    if(tree1.x < DespawnX){ tree1.setVelocityX(0); tree1.x = SpawnX; tree1.y = SpawnY; spawned--; }
    if(tree2.x < DespawnX){ tree2.setVelocityX(0); tree2.x = SpawnX; tree2.y = SpawnY; spawned--; }
    if(tree3.x < DespawnX){ tree3.setVelocityX(0); tree3.x = SpawnX; tree3.y = SpawnY; spawned--; }
    if(tree4.x < DespawnX){ tree4.setVelocityX(0); tree4.x = SpawnX; tree4.y = SpawnY; spawned--; }
    if(Box1.x < DespawnX){ Box1.setVelocityX(0); Box1.x = SpawnX; Box1.y = SpawnY; spawned--; }
    if(Box2.x < DespawnX){ Box2.setVelocityX(0); Box2.x = SpawnX; Box2.y = SpawnY; spawned--; }
    if(Bird.x < DespawnX){ Bird.setVelocityX(0); Bird.x = SpawnX; Bird.y = SpawnYBird; spawned--;}
    if(Bird2.x < DespawnX){ Bird2.setVelocityX(0); Bird2.x = SpawnX; Bird2.y = SpawnYBird; spawned--;}
    if(Bird3.x < DespawnX){ Bird3.setVelocityX(0); Bird3.x = SpawnX; Bird3.y = SpawnYBird; spawned--;}

}

function GameOver(player)
{
    MiddleText.setText("Play again?");
    GameState = 2;
    pause = true;
}

function GameOverBird(player)
{
    if(PlayerState != 2)
    {
        GameOver(player);
    }
}

function ResetGame()
{
    //set Variables
    SetDefaultVariables();
    //reset trees
    tree1.setVelocityX(0);
    tree2.setVelocityX(0);
    tree3.setVelocityX(0);
    tree4.setVelocityX(0);
    Box2.setVelocityX(0);
    Box1.setVelocityX(0);
    Bird.setVelocityX(0);
    Bird2.setVelocityX(0);
    Bird3.setVelocityX(0);
    tree1.x = SpawnX; tree1.y = SpawnY;
    tree2.x = SpawnX; tree2.y = SpawnY;
    tree3.x = SpawnX; tree3.y = SpawnY;
    tree4.x = SpawnX; tree4.y = SpawnY;
    Box1.x = SpawnX; Box1.y = SpawnY;
    Box2.x = SpawnX; Box2.y = SpawnY;
    Bird.x = SpawnX; Bird.y = SpawnYBird;
    Bird2.x = SpawnX; Bird2.y = SpawnYBird;
    Bird3.x = SpawnX; Bird3.y = SpawnYBird;

}

// ----------------------------------------------------------------------------------------------------------------
// NFT section
// ----------------------------------------------------------------------------------------------------------------

let mrPixel = "9iPtqBeeTMuAX4rkQqpHti2BKyd8ZXYRUuqynWJm3ShNpoSyowT";
auctionAddress = `5t19JGogcry9DRipPNcLs4mSnHYXQoqazPDMXXcdMixeH2mkgzMvWXjENsHRJzfHAFnTL5FBDHQCzBcnYg4CU1LcJZMmUXAaDcsKdgfBk4sE9BDbLt6Yxkjh6ow65HGCgxkwNAEArMAz8tqZL7GzKx4AvYVkqG3ExKggwDyVrvx7YzN8xeFtEUcnVkDKM8ow7YWW8eee2EidfYArPRd8fxQr5EuZVEiQbzKZ6m4xgtHfhsEptE3pNdt69F94gkytpounxBYpJPqfeZ8hVxLk8qaXTGFiJTDTt2p9D5ue4skZf4AGSLJyuzpMkjdifczQNc784ic1nbTAcjL3FKGHqnkaVwnCxU7go45X9ZFHwdpc6v67vFDoHzAAqypax4UFF1ux84X5G4xK5NFFjMZtvPyjqn2ErNXVgHBs2AkpngBPjnVRiN4sWkhR66NfBNpigU8PaTiB4Rim2FMZSXuyhRySCA1BV8ydVxz45T9VHqHA6WYkXp2ppAHmc29F8MrHX5Ew2x6amraFgvsdgAB3XiiEqEjRc83mhZVL1QgKi5CdeeGNYiXeCkxaRhG3j6r1JdAgzGDAQfN8sdRcEc1aYxbPfbqM1s81NFm7K1UmMUxrfCUp73poGAfV8FvQa2akyascKBaSCqvwuHW2ZP4oMoJHjZjTAgQjQF8cBNF9YLo6wXEtMQT5FYc3bHSgd4xZXCk2oHYjUSACW1Z5e7KZ3Qw1Sa2UvpMdWhbZ5Ncu99WT7v6nHFLJvHEPM7evr41nhCe9Yt3pAq4ee4rKCtEer4vQWq2b5UJSDXDj5VkVepQ5tmeXfXrBc42Yqucy6VeQSE7W66o4hQjwW1iN3yipmdTmpaAEASmbXwCxRSm7g4sNkfA969xo14PZQpBY3QUGqgCWoqJJVFWMhfvD53rzfgJpA4JH5B1fvY99q5iwbsAKdJfZi4fxub9QWZSNQfht4JqXMDmc6XTkWLE4VCxBRQYzF44H2E6mdf5EbZHUrpXj5c2VfC6PZGg9qmrz14aZjafM4M7kRTqMwVB8R9r7kXM1FWidGoprp2fRoJUALAKxKDSTVHX8ejT8zkSKJ5W45dSQjMe3WUDTeKhiy6Fqio2ukV8THaizTp6yZWxMVdu3a15pGBv1kmXZJEnLN9BsxyhnW2iGM7tvwK1jAneXeBH1uVdusR59j5ubCGKeoaS5ToC8Ky6wZ2iCyb2JF5CTvR4sMUg2ksmUm1dk8EoRjJ9i5gkqY`;
auctionAddresses = [auctionAddress];
let auctions = [];

//Explorer Vars
explorerApi = 'https://api.ergoplatform.com/api/v0'
explorerApiV1 = 'https://api.ergoplatform.com/api/v1'

//Skin Vars
//TODO: move to json file
const BonesID = "3277ccd6af2b96be22cf23e067934ecc640f75dcce67439939d5364147c8a83d", GoldID = 2, FutureID = 3, RobotID = 4; // For testing only


function SkinChecker() {
    console.log("Loading Address");
    getAuctionsRaw(mrPixel);
  }


// Get every NFT able to be auctioned from the wallet 
function getAuctionsRaw(walletAddress) {
    getActiveAuctions(walletAddress)
    .then(res => {
      auctionsRaw = res;
      buildAuctions();
    });
}

// Build the list of NFTs currently able to be auctioned from the wallet, from the raw wallet data
function buildAuctions() {
for(let i = 0; i < auctionsRaw.length - 1; i++){
        auctionsRaw[i].assets.forEach((i) => {
            //CheckSkinAvailable(4); 
            CheckSkinAvailable(i.tokenId);
        });
    }
    loadPlayer(Skin);

    // After loading the skin
    //addPhaser();
}

function CheckSkinAvailable(tokenId)
{
    switch(tokenId)
    {
        case BonesID:
            Skin = "bones";
            break;
        case GoldID:
            Skin = "gold";
            break;
        case FutureID:
            Skin = "newdino";
            break;
        case RobotID:
            Skin = "robot";
            break;
        default:
            console.log("notFound");
    }
}

// Get active auctions from supplied address
function getActiveAuctions(addr) {
    return getRequest(`/boxes/unspent/byAddress/${addr}?limit=500`, explorerApiV1)
        .then(res => res.items)
        .then((boxes) => boxes.filter((box) => box.assets.length > 0));
}

// Function for appending requests to the exploreAPI URL
function getRequest(url, api = explorerApi) {
    return fetch(api + url).then(res => res.json())
}

// Async test function to load assets before game load -> Move to another js file

function addPhaser() {
    var gameFrame = document.createElement('iframe');
    gameFrame.src = "link"; // Link to the CyberDinos.html
    document.getElementsByTagName('body').appendChild(script);
}
