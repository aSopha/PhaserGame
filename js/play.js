var playState = {

    create: function() {

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //Text showing what level it currently is
        levelText = game.add.text(8, 0, 'Level: 0', { fontSize : '50px', fill: '#F0F0F0'});
    	levelText.anchor.setTo(0,0);
        updateLevelText();

        //Text showing how much curreny the player has
        currencyText = game.add.text(55, 10, ': 0', { fontSize : '20px', fill: '#F0F0F0'});
    	var currencyPic = game.add.sprite(8, 60, 'coin');
    	currencyPic.addChild(currencyText);
        updateCurrency();



        //Enabling Coins
        coins = game.add.group();
    	coins.enableBody = true;
    	coins.createMultiple(150, 'drop');

        coins.forEach(function(coin) {
            console.log('resized coin');
            coin.body.height = 35;
            coin.body.width = 35;
            coin.body.offset.setTo(-7,-7);
        });



        //Enabling Player
        player.setup();


        //Enabling Weapon
        weapon.setup();
        //Enabling Miias
        baddies.setupAll();

        baddies.papis.setAll('body.bounce.x', 1);
        baddies.papis.setAll('body.bounce.y', 1);
        baddies.papis.setAll('body.collideWorldBounds', true);



        //Controls for the player
        this.wasd = {
      	     up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      	     down:game.input.keyboard.addKey(Phaser.Keyboard.S),
      	     left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      	     right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    	}

        pickUpSound = game.add.audio('meow');
    },

    update: function() {

        if(level.killCount == level.enemiesThisLevel) {
            this.shop();
            level.nextLevel();
            updateLevelText();

        }
        baddies.papis.forEachAlive(function(papi) {
            baddies.papiFire();
        });

        game.physics.arcade.collide(baddies.miias);
        game.physics.arcade.collide(baddies.papis);


        //game.physics.arcade.overlap(player.player, baddies.miias, killPlayer, null, this);
        game.physics.arcade.overlap(weapon.shots, baddies.miias, hitBaddie, null, this);
        game.physics.arcade.overlap(weapon.shots, baddies.papis, hitBaddie, null, this);
        game.physics.arcade.overlap(player.player, coins, pickUp, null, this);

        baddies.miias.forEach(function (baddie) {
            game.physics.arcade.moveToObject(baddie, player.player, 125)
        });


        player.stop();

        baddies.spawnBaddie(game.rnd.integerInRange(0,1));
        if (this.wasd.left.isDown) {
            //  Move left
            player.left();
        }
        if (this.wasd.right.isDown) {
            //  Move right
            player.right();
        }
    	if (this.wasd.up.isDown) {
            //  Move up
            player.up();
        }
    	if (this.wasd.down.isDown) {
            //  Move down
            player.down();
        }
    	//Diagonal Movement
        if(player.xVelocity != 0 && player.yVelocity !=0) {
            player.diagonal();
        }

        //Left mouse button to shoot
        if (game.input.activePointer.isDown)
        {
            weapon.fire(player);
            weapon.fire(player, 180);
        }


    },

    shop: function() {
        game.state.start('shop');
    }
}

function hitBaddie(shot, baddie) {
	level.killCount++;
    shot.kill();
    baddie.kill();
	spawnCoin(baddie);
}

function killPlayer(guy, enemy) {
    guy.kill();
    enemy.kill();
    game.state.start('gameOver');

}

function pickUp(guy, coin) {

/*
    coin.children.forEach(
        function(child) {
            child.kill();
        }
    )*/
	coin.kill();

	player.currency += 1;
	currencyText.text = ': ' + player.currency;
    pickUpSound.play();
}


function spawnCoin(location) {
	let chance = game.rnd.integerInRange(0,3);
	if(chance == 0){
        let coin = coins.getFirstDead();
		coin.reset(location.x, location.y);

        var emitter = game.add.emitter(location.x + 7, location.y + 8, 50);
        emitter.makeParticles('coinParticle');
        emitter.setAlpha(.1, .5);
        emitter.gravity = -50;
        emitter.minParticleSpeed.setTo(-50);
        emitter.maxParticleSpeed.setTo(50);
        emitter.flow(300, 1, 3, 15);
	}
}

function updateLevelText() {
    levelText.text = 'Level: ' + level.currentLevel;
    console.log(level.currentLevel);
}
