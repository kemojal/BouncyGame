var gameOver = function (game) {}

gameOver.prototype = {
    init: function (score) {
        //alert("You scored: "+score)
    },
    create: function () {

        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        this.game.stage.backgroundColor = " #FFFFFF";

        var playButton = this.game.add.button(this.x, this.y * 2, "play", this.playTheGame, this);
        playButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(playButton).to({
            y: this.y * 1.5
        }, 500, Phaser.Easing.Elastic.Out).start();


        var homeButton = this.game.add.button(this.x, this.y * 2.3, "homebt", this.goHome, this);
        homeButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(homeButton).to({
            y: this.y * 1.8
        }, 700, Phaser.Easing.Elastic.Out).start();

        var style = {
            font: "45px Arial",
            fill: "#ff0057",
            align: "center",
            fontWeight: 700
        };

        var gameovertext = this.game.add.text(this.x, this.y * 0, "GAME OVER", style);
        gameovertext.anchor.set(0.5);
        this.game.add.tween(gameovertext).to({
            y: this.y * 0.35
        }, 500, Phaser.Easing.Elastic.Out).start();

        var style2 = {
            font: "155px Arial",
            fill: "#ff0057",
            align: "center",
            fontWeight: 700
        };

        var scoretext = this.game.add.text(this.x * 2, this.y * 0.9, "0", style2);
        scoretext.anchor.set(0.5);
        this.game.add.tween(scoretext).to({
            x: this.x
        }, 500, Phaser.Easing.Elastic.Out).start();
        scoretext.text = score;

        // best score
        var style3 = {
            font: "35px Arial",
            fill: "#fff",
            align: "center"
        };

        var bestscoretext = this.game.add.text(this.x * 2, this.y, " /0", style3);
        bestscoretext.anchor.set(0.5);
        this.game.add.tween(bestscoretext).to({
            x: this.x * 1.7
        }, 500, Phaser.Easing.Elastic.Out).start();
        if (score > best) {
            bestscoretext.text = '/ ' + score;
        } else {
            bestscoretext.text = '/ ' + best;
        }

        ////
    },
    playTheGame: function () {
        this.game.state.start("TheGame");
    },
    goHome: function () {
        this.game.state.start("GameTitle");
    },
    update: function () {

    }
}
