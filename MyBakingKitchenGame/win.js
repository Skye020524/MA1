class win extends Phaser.Scene {
  constructor() {
    super({
      key: "win",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("WonImg","assets/won.jpg");
    this.scene.bringToTop("win");

  }

  create() {
    console.log("*** win scene");

    // window.music.stop();
    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'WonImg').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("ENTER");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to main scene");
        this.scene.start( "main");
      },
      this
    );

    }}