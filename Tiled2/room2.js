class room2 extends Phaser.Scene {

    constructor() {
        super({ key: 'room2' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory

    }

    preload() {
        this.load.tilemapTiledJSON("room2", "assets/kitchenMap3.json")

        this.load.image("MilkImg","assets/collectMilk.png")
        this.load.image("SpoiledmilkImg","assets/enemySpoiledmilk.png")
        this.load.image("SugarImg","assets/collectSugar.png")
        this.load.image("1_GenericImg","assets/1_Generic_32x32.png")
        this.load.image("10_Birthday_partyImg","assets/10_Birthday_party_32x32.png")
        this.load.image("12_KitchenImg","assets/12_Kitchen_32x32.png")
        this.load.image("foodImg","assets/food.png")
        this.load.image("gather_floors_2_explorationImg","assets/gather_floors_2_exploration.png")

        this.load.spritesheet("gen", "assets/character.png", {
            frameWidth: 64,
            frameHeight: 64,
          });

    }

    create() {
        console.log('*** room2 scene');

        let map = this.make.tilemap({key: "room2"})

        let GenericTiles = map.addTilesetImage("1_Generic_32x32","1_GenericImg")
        let BirthdayTiles = map.addTilesetImage("10_Birthday_party_32x32","10_Birthday_partyImg")
        let KitchenTiles = map.addTilesetImage("12_Kitchen_32x32","12_KitchenImg")
        let FoodTiles = map.addTilesetImage("food","foodImg")
        let gather_floors_2_explorationTiles = map.addTilesetImage("gather_floors_2_exploration","gather_floors_2_explorationImg");
        
        let tilesArray = [GenericTiles,BirthdayTiles,KitchenTiles,FoodTiles,gather_floors_2_explorationTiles]

        this.TileLayer1 = map.createLayer("TileLayer1",tilesArray, 0.0);
        this.wall = map.createLayer("wall",tilesArray, 0.0);
        this.groundlayer = map.createLayer("groundlayer",tilesArray, 0.0);
        this.platformlayer = map.createLayer("platformlayer",tilesArray, 0.0);
        this.uplayer = map.createLayer("uplayer",tilesArray, 0.0);

        

        let start  = map.findObject("ObjectLayer1", (obj) => obj.name === "start");
        this.player = this.physics.add.sprite(start.x, start.y, 'gen');

        // zangaiwuxianzhi
        this.wall.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.wall);

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

    // food

    let sugar  = map.findObject("ObjectLayer1",(obj) => obj.name === "sugar");
    this.Sugar = this.physics.add.sprite(sugar.x, sugar.y, 'SugarImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Sugar, this.collectSugar, null, this);

    let sugar1  = map.findObject("ObjectLayer1",(obj) => obj.name === "sugar1");
    this.Sugar = this.physics.add.sprite(sugar1.x, sugar1.y, 'SugarImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Sugar, this.collectSugar, null, this);

    let milk  = map.findObject("ObjectLayer1",(obj) => obj.name === "milk");
    this.Milk = this.physics.add.sprite(milk.x, milk.y, 'MilkImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Milk, this.collectMilk, null, this);

    let milk1  = map.findObject("ObjectLayer1",(obj) => obj.name === "milk1");
    this.Milk = this.physics.add.sprite(milk1.x, milk1.y, 'MilkImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Milk, this.collectMilk, null, this);

    let spoiledmilk  = map.findObject("ObjectLayer1",(obj) => obj.name === "spoiledmilk");
    this.Spoiledmilk = this.physics.add.sprite(spoiledmilk.x, spoiledmilk.y, 'SpoiledmilkImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Spoiledmilk, this.enemySpoiledmilk, null, this);

    let spoiledmilk1  = map.findObject("ObjectLayer1",(obj) => obj.name === "spoiledmilk1");
    this.Spoiledmilk = this.physics.add.sprite(spoiledmilk1.x, spoiledmilk1.y, 'SpoiledmilkImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Spoiledmilk, this.enemySpoiledmilk, null, this);

    let spoiledmilk2  = map.findObject("ObjectLayer1",(obj) => obj.name === "spoiledmilk2");
    this.Spoiledmilk = this.physics.add.sprite(spoiledmilk2.x, spoiledmilk2.y, 'SpoiledmilkImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Spoiledmilk, this.enemySpoiledmilk, null, this);


    // this.tweens.add({
    //   targets: this.Gasoline,
    //   x: 1500,
    //   flipX: true,
    //   yoyo: true,
    //   duration: 3000,
    //   repeat: -1
    //   })

    //   this.tweens.add({
    //     targets: this.Gasoline1,
    //     x: 1500,
    //     flipX: true,
    //     yoyo: true,
    //     duration: 3000,
    //     repeat: -1
    //     })

    //     this.tweens.add({
    //       targets: this.Gasoline2,
    //       x: 266,
    //       flipX: true,
    //       yoyo: true,
    //       duration: 1000,
    //       repeat: -1
    //       })

    }

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
        }}

        collectSugar(player, sugar){
          console.log("Player collect sugar");
      
          // // play a sound
          // this.hitSnd.play();
      
          // shake screen
          this.cameras.main.shake(300);    
      
          // disable enemy body
          sugar.disableBody (true, true);
       }

       enemySpoiledmilk(player, spoiledmilk){
        console.log("Player collect spoiledmilk");
    
        // // play a sound
        // this.hitSnd.play();
    
        // shake screen
        this.cameras.main.shake(300);    
    
        // disable enemy body
        spoiledmilk.disableBody (true, true);
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

      

}
