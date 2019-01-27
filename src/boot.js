var boot = function (game) {
    console.log("%cStarting my awesome game", "color:white; background:red");
};

boot.prototype = {
    preload: function () {
        this.game.load.image("loading", "assets/loading.png");
        this.game.load.image("klogo", "assets/klogo.png");

    },
    create: function () {
        playMusic = true
        playSfx = true
        this.game.stage.backgroundColor = "#FF0047";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        //this.scale.setScreenSize();
        this.game.state.start("Preload");
    }
}
