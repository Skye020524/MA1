class showInventory extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'showInventory',
      active: false });
  }

  init(data) {
      this.player = data.player;
      this.inventory = data.inventory;
  }

  preload(){
      //Load heart image
      this.load.image('heart', 'assets/heart.png');
      this.load.image('Milk', 'assets/collectMilk.png');
      this.load.image('Egg', 'assets/collectEgg.png');
      this.load.image('Powder', 'assets/collectPowder.png');
      this.load.image('Butter', 'assets/collectButter.png');
      this.load.image('Sugar', 'assets/collectSugar.png');
  }

 create () {

      //Place hearts at the top screen
      console.log("***showInventory");
      this.scene.bringToTop("showInventory");

      //black bar
      var rect = new Phaser.Geom.Rectangle(29, 10, 500, 80);
      var graphics = this.add.graphics({ fillStyle: { color: '0xffffff' } });
      graphics.fillRectShape(rect).setScrollFactor(0)

     // Setup heart but visible to false
     this.heartimg1 = this.add.image (70,48,'heart').setScrollFactor(0).setVisible(true).setScale(0.2);
     this.heartimg2 = this.add.image (120,48,'heart').setScrollFactor(0).setVisible(true).setScale(0.2);
     this.heartimg3 = this.add.image (170,48,'heart').setScrollFactor(0).setVisible(true).setScale(0.2);

     this.Milk = this.add.image (235, 50, 'Milk').setScrollFactor(0).setVisible(true).setScale(1);;
     this.Egg = this.add.image (295, 48, 'Egg').setScrollFactor(0).setVisible(true).setScale(1.2);;
     this.Powder = this.add.image (352, 50, 'Powder').setScrollFactor(0).setVisible(true).setScale(0.8);;
     this.Butter = this.add.image (410, 52, 'Butter').setScrollFactor(0).setVisible(true).setScale(0.6);;
     this.Sugar = this.add.image (475, 50, 'Sugar').setScrollFactor(0).setVisible(true).setScale(0.9);;

             
     // Recv an event, call the method
     this.events.on('inventory', this.updateScreen, this)

     //Setup key
    
     this.milkNum = this.add.text(250, 30, window.milk, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0).setScale(0.8);
     this.eggNum = this.add.text(310, 30, window.milk, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0).setScale(0.8);
     this.powderNum = this.add.text(370, 30, window.milk, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0).setScale(0.8);
     this.butterNum = this.add.text(430, 30, window.milk, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0).setScale(0.8);
     this.sugarNum = this.add.text(490, 30, window.milk, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0).setScale(0.8);
      
  } //end of create

  updateScreen(data){
      console.log('Received event inventory', data);

      this.milkNum.setText(data.milk);
      this.eggNum.setText(data.egg);
      this.powderNum.setText(data.powder);
      this.butterNum.setText(data.butter);
      this.sugarNum.setText(data.sugar);


      switch ( data.heart ) {

          case 3: 
              this.heartimg1.setVisible(true)
              this.heartimg2.setVisible(true)
              this.heartimg3.setVisible(true)
              break;
  
          case 2:
              this.heartimg1.setVisible(true)
              this.heartimg2.setVisible(true)
              this.heartimg3.setVisible(false)
              break;
  
          case 1:
              this.heartimg1.setVisible(true)
              this.heartimg2.setVisible(false)
              this.heartimg3.setVisible(false)
              break;
           
          case 0:
              this.heartimg1.setVisible(false)
              this.heartimg2.setVisible(false)
              this.heartimg3.setVisible(false)
              break;    
  
          default:
          break;
      }
  
  }

} // end of class
