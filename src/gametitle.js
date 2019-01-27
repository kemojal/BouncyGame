var gameTitle = function (game) {}

gameTitle.prototype = {
    create: function () {
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        this.game.stage.backgroundColor = "#FF0047";

        ballTrail = this.game.add.sprite(this.x, this.y * 0.5, "trail");
        ballTrail.anchor.setTo(0.5, 0.5);
        ballTrail.alpha = 0.3

        //this.game.stage.backgroundColor = "#1FC6A8";
        gameTitle = this.game.add.sprite(this.x, this.y, "gametitle");
        gameTitle.anchor.setTo(0.5, 0.5);
        this.game.add.tween(gameTitle).to({
            y: this.y * 0.5
        }, 700, Phaser.Easing.Elastic.Out).start();

        ball = this.game.add.sprite(this.x, this.y * 0, "ball");
        ball.anchor.setTo(0.5, 0.5);
        this.game.add.tween(ball).to({
            y: this.y
        }, 700, Phaser.Easing.Elastic.Out).start();

        playButton = this.game.add.button(this.x, this.y * 2, "play", this.playTheGame, this);
        playButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(playButton).to({
            y: this.y * 1.5
        }, 500, Phaser.Easing.Elastic.Out).start();

        // info button
        infoButton = this.game.add.button(this.x * 0, this.y * 0.1, "infobt", this.showInfo, this);
        infoButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(infoButton).to({
            x: this.x * 0.2
        }, 500, Phaser.Easing.Elastic.Out).start();

        /*

        //leader booard
        leadButton = this.game.add.button(this.x * 0, this.y * 0.1, "leadbt", this.playTheGame, this);
        leadButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(leadButton).to({
            x: this.x
        }, 500, Phaser.Easing.Elastic.Out).start();
        */

        //mute button
        muteButton = this.game.add.button(this.x * 2, this.y * 0.1, "mutebt", this.showSound, this);
        muteButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(muteButton).to({
            x: this.x * 1.8
        }, 500, Phaser.Easing.Elastic.Out).start();

        // pop up menu
        popmenu = this.game.add.sprite(this.x, this.y * 0, "popy");
        popmenu.anchor.setTo(0.5, 0.5);
        popmenu.y = -popmenu.height;
        // menu back button
        //mute button
        backButton = this.game.add.button(0, popmenu.height / 4 + 10, "back", this.hidepop, this);
        backButton.anchor.setTo(0.5, 0.5);
        popmenu.addChild(backButton)

        // game text
        // best score
        var style = {
            font: " 18px Arial",
            fill: "#ffffff",
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 150
        };
        var infotext = this.game.add.text(0, 0, " This Game is Created By Kemo Jallow Using Awesome  Phaser Framework with Much Love", style);
        infotext.anchor.set(0.5);
        popmenu.addChild(infotext)

        // best score
        var style = {
            font: " bold 22px Arial",
            fill: "#ffffff",
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 100
        };
        var infotext = this.game.add.text(0, -popmenu.height / 4, "INFO", style);
        infotext.anchor.set(0.5);
        popmenu.addChild(infotext)


        // --------------------------------------------- sound pop -----------------------//
        // pop up menu
        popmenuSound = this.game.add.sprite(this.x, this.y, "popy");
        popmenuSound.anchor.setTo(0.5, 0.5);
        popmenuSound.y = 2 * this.y + popmenuSound.height / 2;
        // menu back button
        //mute button
        backButton = this.game.add.button(0, popmenuSound.height / 4 - 30, "back", this.hidepopSound, this);
        backButton.anchor.setTo(0.5, 0.5);
        popmenuSound.addChild(backButton)

        // sfx
        sfxButton = this.game.add.button(popmenuSound.width / 4, -popmenuSound.width / 4, "sfx", this.muteSFX, this);
        sfxButton.anchor.setTo(0.5, 0.5);
        popmenuSound.addChild(sfxButton)

        // sfx
        musicButton = this.game.add.button(-popmenuSound.width / 4, -popmenuSound.width / 4, "music", this.muteMusic, this);
        musicButton.anchor.setTo(0.5, 0.5);
        popmenuSound.addChild(musicButton)




    },
    update: function () {

        if (playMusic == false) {
            this.game.add.tween(musicButton).to({
                alpha: 0.5
            }, 500, Phaser.Easing.Elastic.Out).start();

            this.game.add.tween(musicButton.scale).to({
                x: 0.5,
                y: 0.5
            }, 100, Phaser.Easing.Elastic.Out).start();

        } else {

            this.game.add.tween(musicButton).to({
                alpha: 1
            }, 500, Phaser.Easing.Elastic.Out).start();

            this.game.add.tween(musicButton.scale).to({
                x: 1,
                y: 1
            }, 100, Phaser.Easing.Elastic.Out).start();

        }

        // mute sfx
        if (playSfx == false) {
            this.game.add.tween(sfxButton).to({
                alpha: 0.5
            }, 100, Phaser.Easing.Elastic.Out).start();

            this.game.add.tween(sfxButton.scale).to({
                x: 0.5,
                y: 0.5
            }, 100, Phaser.Easing.Elastic.Out).start();

        } else {

            this.game.add.tween(sfxButton).to({
                alpha: 1
            }, 100, Phaser.Easing.Elastic.Out).start();

            this.game.add.tween(sfxButton.scale).to({
                x: 1,
                y: 1
            }, 100, Phaser.Easing.Elastic.Out).start();

        }


    },
    playTheGame: function () {
        this.game.state.start("TheGame");
    },
    showInfo: function () {
        // diable the sound and the leaderboard buttons
        // leadButton.inputEnabled = false;
        muteButton.inputEnabled = false;

        this.game.stage.backgroundColor = "#FFF";
        this.game.add.tween(popmenu).to({
            y: this.y * 1.2
        }, 1200, Phaser.Easing.Elastic.Out).start();

        // start button
        this.game.add.tween(playButton).to({
            y: this.y * 2.1
        }, 100, Phaser.Easing.Linear.In).start();

        // game title

        this.game.add.tween(gameTitle).to({
            y: this.y * 0.45
        }, 1000, Phaser.Easing.Elastic.Out).start();
    },
    hidepop: function () {

        this.game.stage.backgroundColor = "#FF0047";
        this.game.add.tween(popmenu).to({
            y: -popmenu.height / 2
        }, 300, Phaser.Easing.Linear.In, ).start();

        this.game.add.tween(gameTitle).to({
            y: this.y * 0.5
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // play button
        this.game.add.tween(playButton).to({
            y: this.y * 1.5
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // enable the sound and the leaderboard buttons back
        //leadButton.inputEnabled = true;
        muteButton.inputEnabled = true;
    },
    showSound: function () {

        // disable the sound and the leaderboard buttons back
        this.game.stage.backgroundColor = "#FEFEFE";
        //leadButton.inputEnabled = false;
        infoButton.inputEnabled = false;
        //this.game.stage.backgroundColor = "#FF3";
        this.game.add.tween(popmenuSound).to({
            y: 2 * this.y - popmenuSound.height / 3
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // start button
        this.game.add.tween(playButton).to({
            y: this.y * 2.1
        }, 500, Phaser.Easing.Linear.In).start();

        this.game.add.tween(ball).to({
            y: this.y * 0.45
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // game title

        this.game.add.tween(gameTitle).to({
            y: this.y * 0.45
        }, 1000, Phaser.Easing.Elastic.Out).start();
    },
    hidepopSound: function () {
        this.game.stage.backgroundColor = "#FFF0047";
        this.game.add.tween(popmenuSound).to({
            y: 2 * this.y + popmenuSound.height
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // start button
        this.game.add.tween(playButton).to({
            y: this.y * 1.5
        }, 1000, Phaser.Easing.Elastic.Out).start();

        this.game.add.tween(ball).to({
            y: this.y
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // game title

        this.game.add.tween(gameTitle).to({
            y: this.y * 0.5
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // enable the sound and the leaderboard buttons back
        //leadButton.inputEnabled = true;
        infoButton.inputEnabled = true;
    },
    muteSFX: function () {
        playSfx = !playSfx
    },
    muteMusic: function () {

        playMusic = !playMusic
    }
}
