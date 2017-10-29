class Player {
    constructor() {
        this.player
        this.speed = [210,240,280,315,350,375,400,450,500,600,650,700];
        this.speedLevel = 0;
        this.maxSpeedLevel = this.speed.length -1;
        this.currency = 0;
        this.health = 5;
        this.dead = false;
    }

    killPlayer() {
        this.player.kill();
        this.dead = true;
    }
    reset() {
        this.health = 5;
        this.speedLevel = 0;
        this.currency = 0;
        this.dead = false;
    }
    get xVelocity() {
        return this.player.body.velocity.x;
    }

    get yVelocity() {
        return this.player.body.velocity.y;
    }

    get xPos() {
        return this.player.x;
    }

    get yPos() {
        return this.player.y;
    }

    getSpeed() {
        return this.speed;
    }

    getSpeedLevel() {
        return this.speedLevel;
    }

    setSpeed(newSpeed) {
        this.speedLevel = newSpeed;
    }
    //Function takes in a number and subtracts it from players hp
    //Returns the remaining hp
    takeDamage(damage) {
        this.health -= damage;
        return this.health;
    }

    //Move Up
    up() {
        this.player.body.velocity.y = -1*this.speed[this.speedLevel];
    }

    //Move Right
    right() {
        this.player.body.velocity.x = this.speed[this.speedLevel];
    }

    //Move Down
    down() {
        this.player.body.velocity.y = this.speed[this.speedLevel];
    }

    //Move Left
    left() {
        this.player.body.velocity.x = -1*this.speed[this.speedLevel];
    }

    //Stop the player
    stop() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
    }

    //Adjusts speed to diagonal
    diagonal() {
        this.player.body.velocity.y *= 0.709;
        this.player.body.velocity.x *= 0.709;
    }

    setup() {
        this.player = game.add.sprite(game.world.width/2, game.world.height/2, 'player');
        this.player.anchor.setTo(0.5, 0.5);
    	game.physics.arcade.enable(this.player);
        this.player.body.width = 10;
        this.player.body.height = 10;
        this.player.body.offset.setTo(10,10);
    	this.player.enableBody = true;
    	this.player.physicsBodyType = Phaser.Physics.ARCADE;
    	this.player.body.collideWorldBounds = true;
    }

    spendCurrency(amountSpent) {
        if(amountSpent > this.currency) {
            console.log('not enough money');
            return false;
        } else {
            this.currency -= amountSpent;
            updateCurrency();
            return true;
        }
    }


}
