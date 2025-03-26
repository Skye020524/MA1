class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory

    }

    preload() {
        this.load.tilemapTiledJSON("room1", "assets/kitchenMap2.json")

        this.load.image("PowderImg","assets/collectPowder.png")
        this.load.image("GasolineImg","assets/enemyGasoline.png")
        this.load.image("ButterImg","assets/collectButter.png")
        this.load.image("12_KitchenImg","assets/12_Kitchen_32x32.png")
        this.load.image("foodImg","assets/food.png")
        this.load.image("gather_floors_2_explorationImg","assets/gather_floors_2_exploration.png")

        this.load.spritesheet("gen", "assets/character.png", {
            frameWidth: 64,
            frameHeight: 64,
          });

    }

    create() {
        console.log('*** room1 scene');

        let map = this.make.tilemap({key: "room1"})

        let KitchenTiles = map.addTilesetImage("12_Kitchen_32x32","12_KitchenImg")
        let FoodTiles = map.addTilesetImage("food","foodImg")
        let gather_floors_2_explorationTiles = map.addTilesetImage("gather_floors_2_exploration","gather_floors_2_explorationImg");
        
        let tilesArray = [KitchenTiles,FoodTiles,gather_floors_2_explorationTiles]

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

    let powder  = map.findObject("ObjectLayer1",(obj) => obj.name === "powder");
    this.Powder = this.physics.add.sprite(powder.x, powder.y, 'PowderImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Powder, this.collectPowder, null, this);

    let powder1  = map.findObject("ObjectLayer1",(obj) => obj.name === "powder1");
    this.Powder = this.physics.add.sprite(powder1.x, powder1.y, 'PowderImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Powder, this.collectPowder, null, this);

    let gasoline  = map.findObject("ObjectLayer1",(obj) => obj.name === "gasoline");
    this.Gasoline = this.physics.add.sprite(gasoline.x, gasoline.y, 'GasolineImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Gasoline, this.enemyGasoline, null, this);

    let gasoline1  = map.findObject("ObjectLayer1",(obj) => obj.name === "gasoline1");
    this.Gasoline1 = this.physics.add.sprite(gasoline1.x, gasoline1.y, 'GasolineImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Gasoline, this.enemyGasoline, null, this);

    let gasoline2  = map.findObject("ObjectLayer1",(obj) => obj.name === "gasoline2");
    this.Gasoline2 = this.physics.add.sprite(gasoline2.x, gasoline2.y, 'GasolineImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Gasoline, this.enemyGasoline, null, this);

    let butter  = map.findObject("ObjectLayer1",(obj) => obj.name === "butter");
    this.Butter = this.physics.add.sprite(butter.x, butter.y, 'ButterImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Butter, this.collectButter, null, this);

    let butter1  = map.findObject("ObjectLayer1",(obj) => obj.name === "butter1");
    this.Butter = this.physics.add.sprite(butter1.x, butter1.y, 'ButterImg')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);
    this.physics.add.overlap(this.player, this.Butter, this.collectButter, null, this);



    this.tweens.add({
      targets: this.Gasoline,
      x: 1500,
      flipX: true,
      yoyo: true,
      duration: 3000,
      repeat: -1
      })

      this.tweens.add({
        targets: this.Gasoline1,
        x: 1500,
        flipX: true,
        yoyo: true,
        duration: 3000,
        repeat: -1
        })

        this.tweens.add({
          targets: this.Gasoline2,
          x: 266,
          flipX: true,
          yoyo: true,
          duration: 1000,
          repeat: -1
          })

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

          if(
            this.player.x > 880 &&
            this.player.y > 1200 &&
            this.player.y < 1300
    
          ){
    
            console.log("jump to room2");
            this.room2();
          }
        }}//end of update

        
        

        room2(player,tile){
          console.log("Function to jump to room2 scene");
          this.scene.start("room2",);
        }

        collectButter(player, butter){
          console.log("Player collect butter");
      
          // // play a sound
          // this.hitSnd.play();
      
          // shake screen
          this.cameras.main.shake(300);    
      
          // disable enemy body
          butter.disableBody (true, true);
       }

       enemyGasoline(player, gasoline){
        console.log("Player collect gasoline");
    
        // // play a sound
        // this.hitSnd.play();
    
        // shake screen
        this.cameras.main.shake(300);    
    
        // disable enemy body
        gasoline.disableBody (true, true);
     }

       collectPowder(player, powder){
        console.log("Player collect powder");
    
        // // play a sound
        // this.hitSnd.play();
    
        // shake screen
        this.cameras.main.shake(300);    
    
        // disable enemy body
        powder.disableBody (true, true);
     }

      

}
