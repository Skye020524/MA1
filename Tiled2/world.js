class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    this.load.tilemapTiledJSON("world1", "assets/kitchenMap1.json")

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");

    // this.load.image("CharacterImg","assets/character.png")
    this.load.image("BrokeneggImg","assets/enemyBrokenegg.png")
    this.load.image("EggImg","assets/collectEgg.png")
    this.load.image("MilkImg","assets/collectMilk.png")
    this.load.image("1_GenericImg","assets/1_Generic_32x32.png")
    this.load.image("12_KitchenImg","assets/12_Kitchen_32x32.png")
    this.load.image("gather_floors_2_explorationImg","assets/gather_floors_2_exploration.png")
  

    this.load.spritesheet("gen", "assets/character.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    
  }

  create() {
    console.log("*** world scene");   

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });

    let map = this.make.tilemap({key: "world1"})

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");

    let GenericTiles = map.addTilesetImage("1_Generic_32x32","1_GenericImg")
    let KitchenTiles = map.addTilesetImage("12_Kitchen_32x32","12_KitchenImg")
    let gather_floors_2_explorationTiles = map.addTilesetImage("gather_floors_2_exploration","gather_floors_2_explorationImg");
  
    

    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];

    let tilesArray = [GenericTiles,KitchenTiles,gather_floors_2_explorationTiles]

    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    //this.streetLayer = map.createLayer("streetLayer",tilesArray,0,0);
    //this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);

    this.TileLayer1 = map.createLayer("TileLayer1",tilesArray, 0.0);
    this.groundlayer = map.createLayer("groundlayer",tilesArray, 0.0);
    this.platformlayer = map.createLayer("platformlayer",tilesArray, 0.0);
    this.uplayer = map.createLayer("uplayer",tilesArray, 0.0);


    // gen is the alias in preload 
    let start  = map.findObject("ObjectLayer1", (obj) => obj.name === "start");
    this.player = this.physics.add.sprite(start.x, start.y, 'gen');
    // this.player = this.physics.add.sprite(300, 1100, 'gen');

    // zangaiwuxianzhi
    this.groundlayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.groundlayer);
    
    this.platformlayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.platformlayer);

    this.uplayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.uplayer);
    

    // debug player
    window.player = this.player

    this.anims.create({
      key: "gen-up",
      frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-left",
      frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-down",
      frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-right",
      frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

  //   this.anims.create({
  //     key:'enemyBrokenAnimation',
  //     frames:this.anims.generateFrameNumbers('broken',
  //     { start:0, end:3 }),
  //     frameRate:8,
  //     repeat:-1
  // });

    // # adjust the width & height
    this.player.body.setSize(this.player.width * 0.8, this.player.height * 0.8)

    // create the arrow keys
this.cursors = this.input.keyboard.createCursorKeys();

// Camera follow player
// this.cameras.main.startFollow(this.player);
this.cameras.main.startFollow(this.player);
// this.cameras.main.centerOn(this.player.x, this.player.y);
this.cameras.main.setFollowOffset(
  -this.cameras.main.width / 5,
  -this.cameras.main.height / 5
);


this.cameras.main.startFollow(this.player);
// this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    

    // Add main player here with physics.add.sprite

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);

    ///////food
    let milk  = map.findObject("ObjectLayer1",(obj) => obj.name === "milk");
    this.Milk = this.physics.add.sprite(milk.x, milk.y, 'MilkImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Milk, this.collectMilk, null, this);

    let egg  = map.findObject("ObjectLayer1",(obj) => obj.name === "egg");
    this.Egg = this.physics.add.sprite(egg.x, egg.y, 'EggImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Egg, this.collectEgg, null, this);

    let egg1  = map.findObject("ObjectLayer1",(obj) => obj.name === "egg1");
    this.Egg = this.physics.add.sprite(egg1.x, egg1.y, 'EggImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Egg, this.collectEgg, null, this);

    let egg2  = map.findObject("ObjectLayer1",(obj) => obj.name === "egg2");
    this.Egg = this.physics.add.sprite(egg2.x, egg2.y, 'EggImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Egg, this.collectEgg, null, this);

    let egg3  = map.findObject("ObjectLayer1",(obj) => obj.name === "egg3");
    this.Egg = this.physics.add.sprite(egg3.x, egg3.y, 'EggImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Egg, this.collectEgg, null, this);

    let egg4  = map.findObject("ObjectLayer1",(obj) => obj.name === "egg4");
    this.Egg = this.physics.add.sprite(egg4.x, egg4.y, 'EggImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Egg, this.collectEgg, null, this);

    let egg5  = map.findObject("ObjectLayer1",(obj) => obj.name === "egg5");
    this.Egg = this.physics.add.sprite(egg5.x, egg5.y, 'EggImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Egg, this.collectEgg, null, this);

    let brokenegg  = map.findObject("ObjectLayer1",(obj) => obj.name === "brokenegg");
    this.Brokenegg = this.physics.add.sprite(brokenegg.x, brokenegg.y, 'BrokeneggImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Brokenegg, this.enemyBrokenegg, null, this);
    // let start  = map.findObject("ObjectLayer1",(obj) => obj.name === "start");
    // this.Start = this.add.sprite(start.x, start.y, 'CharacterImg')
    
    
    // this.enemy1 = this.add.sprite(300, 400, 'enemyBrokenegg').play('enemyBrokeneggAnim').setScale(1);
    
    this.tweens.add({
        targets: this.Brokenegg,
        x: 1500,
        flipX: true,
        yoyo: true,
        duration: 3000,
        repeat: -1
        })
 
  } /////////////////// end of create //////////////////////////////

  update() {let speed = 200;

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play("gen-left", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play("gen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play("gen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play("gen-down", true);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);

      if(
        this.player.x > 880 &&
        this.player.y > 1200 &&
        this.player.y < 1300

      ){

        console.log("jump to room1");
        this.room1();
      }
    }} /////////////////// end of update //////////////////////////////

  room1(player,tile){
    console.log("Function to jump to room1 scene");
    this.scene.start("room1",);
  }

    collectMilk(player, milk){
      console.log("Player collect milk");
  
			// // play a sound
      // this.hitSnd.play();

			// shake screen
	    this.cameras.main.shake(300);    

      // disable enemy body
      milk.disableBody (true, true);

      
   }

   collectEgg(player, egg){
    console.log("Player collect egg");

    // // play a sound
    // this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);    

    // disable enemy body
    egg.disableBody (true, true);
 }

 enemyBrokenegg(player, brokenegg){
  console.log("Player collect brokenegg");

  // // play a sound
  // this.hitSnd.play();

  // shake screen
  this.cameras.main.shake(300);    

  // disable enemy body
  brokenegg.disableBody (true, true);
}



} //////////// end of class world ////////////////////////
