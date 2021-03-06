class Weapon {
    constructor() {
        this.shots;
        this.fireRate = [500,450,400,350,300,250,200,166,133,100,70,35];
        this.fireSpeed = [300,325,350,375,400,450,500,575,650,750,800,1000];
        this.nextFire = 0;
        this.weaponType = 0;
        this.weaponTypeMax = 2;
        this.weaponTypeNames = ['Single Shot', 'Double Shot', 'Triple Shot']

        this.fireRateLevel = 0;
        this.maxFireRateLevel = this.fireRate.length -1;
        this.fireSpeedLevel = 0;
        this.maxFireSpeedLevel = this.fireSpeed.length -1;
    }

    reset() {
        this.fireRateLevel = 0;
        this.fireSpeedLevel = 0;
        this.nextFire = 0;
        this.weaponType = 0;
    }

    setup() {
        this.shots = game.add.group();
        this.shots.enableBody = true;
        this.shots.createMultiple(400, 'ball');
        this.shots.setAll('checkWorldBounds', true);
        this.shots.setAll('outOfBoundsKill', true);
    	this.shots.tracking = false;
    }

    //If the weapon is upgraded to the highest level
    //Return true
    isMax() {
        if(this.weaponType == this.weaponTypeMax) {
            return true;
        }
    }

    upgradeWeapon() {
        if(this.isMax()) {
            console.log('weapon is already maxed out');
            return false;
        }
        this.weaponType++;
        if(this.weaponType == this.weaponTypeMax) {
            return false;
        }
        return true;
    }

    fire(player, offset) {
        if(offset == null) {
            offset = 0;
        }
        if (game.time.now > this.nextFire)
        {
            playShot1();
            this.nextFire = game.time.now + this.fireRate[this.fireRateLevel];
            if(this.weaponType == 0) {
                this.fireSingleShot(player, offset);
            } else if(this.weaponType == 1) {
                this.fireDoubleShot(player, offset);
            } else if(this.weaponType == 2) {
                this.fireTripleShot(player, offset);
            } else if(this.weaponType == 3) {
                this.fireScatterShot(player);
            }
        }
    }

    fireSingleShot(player, offset) {
        let ball = this.shots.getFirstDead();
        let angle = game.physics.arcade.angleToPointer(player.player)
        angle *= 57.295;
        angle += offset;


        ball.reset(player.xPos, player.yPos);
        ball.anchor.setTo(0.5, 0.5);
        ball.game.physics.arcade.velocityFromAngle(angle, this.fireSpeed[this.fireSpeedLevel], ball.body.velocity);
        ball.rotation = game.physics.arcade.angleToPointer(ball) + 1.57 + offset/57;
    }

    fireDoubleShot(player, offset) {
        this.fireSingleShot(player, offset);
        this.fireSingleShot(player, 180);
    }

    fireTripleShot(player, offset) {
        this.fireSingleShot(player, offset);
        this.fireSingleShot(player, 120);
        this.fireSingleShot(player, 240);
    }

    fireScatterShot(player) {

    }

    getFireRateLevel() {
        return this.fireRateLevel;
    }

    setFireRate(newRate) {
        this.fireRateLevel = newRate;
    }

    getFireSpeedLevel() {
        return this.fireSpeedLevel;
    }

    setFireSpeed(newSpeed) {
        this.fireSpeedLevel = newSpeed;
    }

    setWeaponType(newType) {
        this.weaponType = newType;
    }

    getWeaponType() {
        return this.weaponType;
    }

    getWeaponTypeName() {
        return this.weaponTypeNames[this.weaponType];
    }
}
