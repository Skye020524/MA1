var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [main, story, task, howtoplay, world, room1, room2, gameOver, showInventory, win]
};

var game = new Phaser.Game(config);
window.heart = 3
window.milk = 0
window.powder = 0
window.sugar = 0
window.butter = 0
window.egg = 0
