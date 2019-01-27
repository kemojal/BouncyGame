var theGame = function (game) {
    spriteNumber = null;
    number = 0;
    workingButtons = true;
    higher = true;
    score = 0;
    best = 0;
}

theGame.prototype = {
    create: function () {
        bgColors = ["#FD00FD", "#FF0047", "#673AB7", "#0F9D58", "#FF9800", "#9C27B0"];
        //playMusic    = true
        //playSfx    = true
        if (playMusic) {
            if (!bgMusic.isPlaying) {
                bgMusic.play('', 0, 1, true);
            }
        }
        level = 1
        this.game.time.events.start();
        //this.game.stage.backgroundColor = bgColors[0]
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // enable the arcade physics
        //  Set the world (global) gravity
        //this.game.physics.arcade.gravity.y = 100;
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        particleCanBurst = false;
        best = localStorage.getItem("topFlappyScore") == null ? 0 : localStorage.getItem("topFlappyScore");
        score = 0;
        leftOrRigh = this.game.rnd.integerInRange(2, 2);
        flor = this.game.add.sprite(this.x, this.y * 1.5, "flor");
        flor.anchor.setTo(0.5, 0.5);
        //flor.y = 2*this.y  - flor.height/2;
        m = 2 * this.y - flor.height / 2;
        this.game.add.tween(flor).to({
            y: m
        }, 500, Phaser.Easing.Elastic.Out).start();

        /*// tile sprite
        tile = this.game.add.tileSprite(this.x * 1.6, flor.y * 0.5, 380, 552, "trail");
        //tile.anchor.setTo(0.5, 0.5);
        //tile.alpha = 0.3 */


        ballTrail = this.game.add.sprite(this.x, flor.y * 0.5, "trail");
        ballTrail.anchor.setTo(0.5, 0.5);
        ballTrail.alpha = 0.3




        ball = this.game.add.sprite(this.x, this.y * 0.5, "bally");
        ball.anchor.setTo(0.5, 0.5);
        ball.scale.setTo(0.25, 0.25);
        ball.alpha = 1;
        rotate = this.add.tween(ball).to({
            angle: ball.angle + 180
        }, 400, Phaser.Easing.Linear.None, false, 100);

        t = this.game.add.tween(ball).to({ //kill tween
            alpha: 0
        }, 100, Phaser.Easing.Linear.In, ).to({
            alpha: 0
        }, 900, Phaser.Easing.Linear.In, )
        //ballTrail.x = ball.x
        this.makePartiles()
        this.burstplayer()

        yenemies = this.game.add.group();
        yenemies.enableBody = true;
        yenemies.createMultiple(250, 'enemies');
        yenemies.setAll("alpha", 1)


        // Enable physics on those sprites
        this.game.physics.enable([flor, ball], Phaser.Physics.ARCADE);
        flor.body.immovable = true;
        ball.body.gravity.y = 9000;
        ball.body.setCircle(15);
        //floor
        flor.body.rotation = 15;
        // ball.body.bounce.set(0.5);
        this.game.world.bringToTop(flor);


        pausebt = this.game.add.button(this.x * 2.8, 0.1 * this.y, 'pausebt', this.pauseGame, this, 2, 1, 0);
        pausebt.anchor.setTo(0.5, 0.5);
        this.game.add.tween(pausebt).to({
            x: this.x * 1.8
        }, 500, Phaser.Easing.Elastic.Out).start();
        // Add a input listener that can help us return from being paused
        // this.game.input.onDown.add(this.unpause, self);

        var style = {
            font: "72px Arial",
            fill: "#fff",
            align: "center"
        };

        scoretext = this.game.add.text(this.x, this.y * 0, "0", style);
        scoretext.anchor.set(0.5);
        this.game.add.tween(scoretext).to({
            y: this.y * 0.35
        }, 500, Phaser.Easing.Elastic.Out).start();

        //this.game.input.onTap.add(this.onTap, this);
        timer = this.game.time.events.loop(Phaser.Timer.SECOND * 0.5, this.spawnblock, this);
        //this.game.input.onTap.add(this.onTap, this);
        timerChangeMode = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.changeMode, this);

        timerChangeMode = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.changeLevel, this);


    },
    round45: function (x) {
        return Math.ceil(x / 90) * 90;
    },
    update: function () {
        this.game.physics.arcade.collide(ball, flor);
        this.game.physics.arcade.collide(this.emitter2, flor);
        this.physics.arcade.overlap(yenemies, ball, this.hitBlock, null, this);
        /*if (ball.body.touching.down) {
            angle = ball.angle
            angle = this.round45(angle)
            this.game.add.tween(ball).to({
                angle: angle
            }, 10, Phaser.Easing.Linear.In).start();


        }*/
        if (this.game.input.activePointer.isDown && ball.body.touching.down) {
            ball.body.velocity.y = -1500;
            rotate.start();

            //jumpSound.play();
        }
        yenemies.forEach(function (item) {
            if ((item.x < -2 * this.x) || (item.x > 2 * this.x + 100)) {
                item.kill();
            }
        }, this);


        //this.physics.arcade.collide(flor, this.emitter2);


        // handle the showing of the trail
        if (ball.body.touching.down) {
            // emitter.start(true, 500, null, 10);
            this.game.add.tween(ballTrail.scale).to({
                x: 1,
                y: 1
            }, 100, Phaser.Easing.Elastic.Out).start();

            if (particleCanBurst) {
                // play particle
                this.emitter.x = ball.x;
                this.emitter.y = ball.y + ball.height;
                this.emitter.start(true, 500, null, 50);

                particleCanBurst = false
            }

            angle = ball.angle
            angle = this.round45(angle)
            this.game.add.tween(ball).to({
                angle: angle
            }, 10, Phaser.Easing.Linear.In).start();

        } else {
            this.game.add.tween(ballTrail.scale).to({
                x: 0.5,
                y: 1
            }, 100, Phaser.Easing.Elastic.Out).start();
            particleCanBurst = true
        }

        // update particles
        this.emitter.forEachAlive(function (particle) {
            particle.alpha = this.game.math.clamp(particle.lifespan / 100, 0, 1);
        }, this);


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
    makePartiles: function () {
        this.emitter = this.game.add.emitter(0, 0, 200);
        this.emitter.makeParticles('burst');
        this.emitter.gravity = 2000;
        this.emitter.setAlpha(0, 0.1);
        this.emitter.setScale(0.1, 1, 1, 1);
        this.emitter.minParticleSpeed.setTo(-400, -400);
        this.emitter.maxParticleSpeed.setTo(400, 0);
    },
    burstplayer: function () {
        this.emitter2 = this.game.add.emitter(0, 0, 200);
        this.emitter2.makeParticles('pburst');
        this.emitter2.gravity = 2000;
        this.emitter2.setAlpha(0.3, 1);
        this.emitter2.setScale(0.5, 2, 0.5, 2);
        this.emitter2.minParticleSpeed.setTo(-200, -600);
        this.emitter2.maxParticleSpeed.setTo(200, 0);
    },
    pauseGame: function () {





        this.game.paused = true;

        // --------------------------------------------- sound pop -----------------------//
        // pop up menu
        popmenuSound = this.game.add.sprite(this.x, this.y, "popy");
        popmenuSound.anchor.setTo(0.5, 0.5);
        //popmenuSound.y = 2 * this.y + popmenuSound.height / 2;
        popmenu.tint = 0x00ffff
        // menu back button
        //mute button
        backButton = this.game.add.button(0, popmenuSound.height / 4 - 30, "back", this.unpause, this);
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
    unpause: function () {

        this.game.paused = false;
        popmenuSound.destroy();
        yenemies.forEachAlive(function (item) {
            item.kill();
        }, this);

    },
    addCube: function (x, y, dx, dir) {
        var t = this.game.rnd.integerInRange(30, 30) * 100;
        var yenemy = yenemies.getFirstDead();
        yenemy.reset(x + dx, y);
        //yenemy.body.immovable = true;
        yenemy.anchor.setTo(0.5, 0.5);
        yenemy.scale.setTo(0.5, 0.5);
        yenemy.checkWorldBounds = true;
        yenemy.body.setCircle(15);
        /*
        this.game.add.tween(yenemy).to({
            x: -x + dx 
        }, t).start(); */
        if (dir == 'left') {
            yenemy.body.velocity.x = -350
        } else
        if (dir == 'right') {
            yenemy.body.velocity.x = 350
        }
        this.game.add.tween(yenemy).to({
            y: flor.y - flor.height / 2 - 15 - this.game.rnd.integerInRange(0, 1) * 45
        }, t * 0.2, Phaser.Easing.Quadratic.InOut, 800).start();

        this.game.add.tween(yenemy).to({
            angle: "+180"
        }, t * 0.15, Phaser.Easing.Quadratic.InOut).delay(100).start();

        this.game.add.tween(yenemy.scale).to({
            y: 0.5,
            x: 0.5
        }, t * 0.2, Phaser.Easing.Quadratic.InOut).delay(200).start();



    },
    addCube2: function (x, y, dx, dir) {
        var t = this.game.rnd.integerInRange(30, 30) * 100;
        var yenemy = yenemies.getFirstDead();
        yenemy.reset(x + dx, y);
        //yenemy.body.immovable = true;
        yenemy.anchor.setTo(0.5, 0.5);
        yenemy.scale.setTo(0.5, 0.5);
        yenemy.checkWorldBounds = true;
        //yenemy.body.setCircle(15);
        if (dir == 'left') {
            yenemy.body.velocity.x = -350
        } else
        if (dir == 'right') {
            yenemy.body.velocity.x = 350
        }
        this.game.add.tween(yenemy).to({
            y: flor.y - flor.height / 2 - 15 - this.game.rnd.integerInRange(0, 1) * 45
        }, t * 0.2, Phaser.Easing.Quadratic.InOut, 800).start();

        this.game.add.tween(yenemy).to({
            angle: "+180"
        }, t * 0.15, Phaser.Easing.Quadratic.InOut).delay(100).start();

        this.game.add.tween(yenemy.scale).to({
            y: 0.5,
            x: 0.5
        }, t * 0.2, Phaser.Easing.Quadratic.InOut).delay(200).start();

        // second ball
        var yenemy2 = yenemies.getFirstDead();
        yenemy2.reset(x + dx, y + 145);
        //yenemy.body.immovable = true;
        yenemy2.anchor.setTo(0.5, 0.5);
        yenemy2.checkWorldBounds = true;
        //yenemy2.body.setCircle(15);

        if (dir == 'left') {
            yenemy2.body.velocity.x = -350
        } else
        if (dir == 'right') {
            yenemy2.body.velocity.x = 350
        }
        this.game.add.tween(yenemy2).to({
            y: y - 145
        }, t * 0.4, Phaser.Easing.Quadratic.InOut, 500).delay(200).to({
            y: y + 145
        }, t * 0.4, Phaser.Easing.Quadratic.InOut, 500).loop().start();

        this.game.add.tween(yenemy2).to({
            angle: "+180"
        }, t * 0.15, Phaser.Easing.Quadratic.InOut).delay(100).start();

        this.game.add.tween(yenemy2.scale).to({
            y: this.game.rnd.integerInRange(1, 1),
            x: this.game.rnd.integerInRange(1, 1)
        }, t * 0.2, Phaser.Easing.Quadratic.InOut).delay(200).start();



    },
    changeMode: function () {
        leftOrRigh = this.game.rnd.integerInRange(1, 2);
        timer.delay = this.game.rnd.integerInRange(8, 10) * 100
        n = this.game.rnd.integerInRange(0, 6)
        this.game.stage.backgroundColor = bgColors[n]
    },
    changeLevel: function () {
        level = this.game.rnd.integerInRange(1, 3);
    },
    hitBlock: function (player, enemies) {
        this.game.time.events.stop();
        player.kill();

        if (playSfx) {
            hit.play()
        }
        hit.volume = 0.3
        t.start();

        t.onComplete.add(this.gameOver, this)
        this.emitter2.x = ball.x;
        this.emitter2.y = ball.y + ball.height / 2;
        this.emitter2.start(true, 1000, null, 5);


    },
    gameOver: function () {
        localStorage.setItem("topFlappyScore", Math.max(score, best));
        if (bgMusic.isPlaying) {
            bgMusic.stop();
        }
        this.game.state.start("GameOver", true, false, score);
    },
    spawnblock: function () {

        if (level == 1) {
            this.level1();
        } else if (level == 2) {
            this.level2();
        } else {
            this.level3();
        }
        //this.game.rnd.integerInRange(1, 1)
        score += 1;
        scoretext.text = score;
    },
    level1: function () {

        startX = 0
        if (leftOrRigh == 1) {
            startX = -2 * this.x - 100;
            dx = 2 * this.x - 30
            dir = 'right'
        } else {
            startX = 2 * this.x + 100;
            dx = 0
            dir = 'left'
        }
        this.addCube(startX, flor.y, dx, dir);

        //startY -= 40;
        timer.delay = this.game.rnd.integerInRange(5, 5) * 100
    },
    level2: function () {

        startX = 0
        if (leftOrRigh == 1) {
            startX = -2 * this.x - 100;
            dx = 2 * this.x - 30
            dir = 'right'
        } else {
            startX = 2 * this.x + 100;
            dx = 0
            dir = 'left'
        }
        this.addCube(startX, flor.y, dx, dir);
        this.addCube(startX, flor.y - this.game.rnd.integerInRange(-2, 2) * 45, dx, dir);

        //startY -= 40;
        timer.delay = this.game.rnd.integerInRange(4, 4) * 100
    },
    level3: function () {

        startX = 0
        if (leftOrRigh == 1) {
            startX = -2 * this.x - 100;
            dx = 2 * this.x - 30
            dir = 'right'
        } else {
            startX = 2 * this.x + 100;
            dx = 0
            dir = 'left'
        }
        this.addCube2(startX, flor.y, dx, dir);

        //startY -= 40;
        timer.delay = this.game.rnd.integerInRange(4, 4) * 100
    },
    render: function () {

        //this.game.debug.bodyInfo(ball, 32, 32);
        //  this.game.debug.body(flor);
        //this.game.debug.body(ball);
        //yenemies.forEach(function (item) {
        // this.game.debug.body(item);
        // }, this);

    },
    muteSFX: function () {
        playSfx = !playSfx
    },
    muteMusic: function () {

        playMusic = !playMusic
    }

}
