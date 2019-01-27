var preload = function (game) {}

preload.prototype = {
    preload: function () {
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        klogo = this.game.add.sprite(this.x, this.y * 0.5, "klogo");
        klogo.anchor.setTo(0.5, 0.5);

        var loadingBar = this.add.sprite(this.x, this.y * 1.5, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.spritesheet("numbers", "assets/numbers.png", 100, 100);
        this.game.load.image("gametitle", "assets/gametitle.png");
        this.game.load.image("play", "assets/play.png");
        this.game.load.image("ball", "assets/ball.png");
        this.game.load.image("bally", "assets/bally.png");
        this.game.load.image("flor", "assets/flor.png");
        this.game.load.image("enemies", "assets/enemies.png");
        this.game.load.image("pausebt", "assets/pause.png");
        this.game.load.image("homebt", "assets/home.png");

        this.game.load.image("infobt", "assets/info.png");
        this.game.load.image("leadbt", "assets/lead.png");
        this.game.load.image("mutebt", "assets/mute.png");


        this.game.load.image("menu", "assets/menu.png");
        this.game.load.image("back", "assets/backbutton.png");
        this.game.load.image("trail", "assets/trail.png");
        this.game.load.image("burst", "assets/burst.png");
        this.game.load.image("pburst", "assets/playerBurst.png");

        this.game.load.image("popy", "assets/popy.png");
        this.game.load.image("sfx", "assets/sfx.png");
        this.game.load.image("music", "assets/music.png");
        this.game.load.image("pausedMenu", "assets/pausedMenu.png");

        this.game.load.audio('hit1', 'music/hit.mp3');


        this.game.load.audio('bgMusic5', "music/X.ogg")




    },
    create: function () {

        ball = this.game.add.sprite(this.x, this.y * 0, "ball");
        ball.anchor.setTo(0.5, 0.5);
        this.game.add.tween(ball).to({
            y: this.y
        }, 700, Phaser.Easing.Elastic.Out).start();

        //adding music
        bgMusic = this.game.add.audio('bgMusic5', 1, true);
        hit = this.game.add.audio('hit1');

        //this.game.sound.setDecodedCallback([bgMusic, hit], this.start, this);
        this.game.state.start("GameTitle");



    },
    start: function () {
        this.game.state.start("GameTitle");
    }
}
