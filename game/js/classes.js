class Entity {

    constructor(image, x, y, collisionWidth, collisionHeight) {
        this.image = image;
        this.width = this.image.width / 2;
        this.height = this.image.height;
        this.centerX = x;
        this.centerY = y;
        this.x = x - (this.width / 2);
        this.y = y - (this.height / 2);
        this.collisionWidth = collisionWidth == null || collisionWidth == 0 ? this.width : collisionWidth;
        this.collisionHeight = collisionHeight == null || collisionHeight == 0 ? this.height : collisionHeight;
        this.state = 0;
    }

    draw() {
        context.drawImage(this.image, this.width * this.state, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        context.lineWidth = 1;
        context.strokeRect(this.centerX - this.collisionWidth / 2, this.centerY - this.collisionHeight / 2, this.collisionWidth, this.collisionHeight);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
        this.centerX += x;
        this.centerY += y;
    }

    animate() {
        this.state = (this.state + 1) % 2;
    }
}

class Player extends Entity {

    constructor(x, y, collisionWidth, collisionHeight) {
        super(playerImage, x, y, collisionWidth, collisionHeight);
        this.weapons = [new Weapon(crabLegR, 10, 25, 25, 25), new Weapon(penguin1, 50, 10, 20, 20), new Weapon(crabLegL, 90, 25, 25, 25)];
        this.score = 0;
        this.hp = 300;
        this.currentWeapon = 1;

        this.leftVector = new Vector(-0.5, 1).normalize();
        this.upVector = new Vector(0, 1).normalize();
        this.rightVector = new Vector(0.5, 1).normalize();
    }

    draw() {
        for (let i = 0; i < this.weapons.length; i++) {
            this.weapons[1].image = this.currentWeapon == 0 ? penguin1 : this.currentWeapon == 1 ? penguin2 : penguin3;
            let current = this.weapons[i];
            current.moveTo(this.x + 10, this.y - 10);
            current.draw();
        }
        context.strokeStyle = "#0f0";
        super.draw();
    }

    animate() {
        for (let i = 0; i < this.weapons.length; i++) {
            let current = this.weapons[i];
            current.animate();
        }
    }

    shoot() {
        entities["projectiles"].push(new Projectile(this.weapons[1].x, this.weapons[1].y, 10, this.currentWeapon == 0 ? this.leftVector : this.currentWeapon == 0 ? this.leftVector : this.rightVector));
    }

    hit() {
        this.hp--;
    }
}

class Weapon extends Entity {
    constructor(image, offsetX, offsetY, collisionWidth, collisionHeight) {
        super(image, 0, 0, collisionWidth, collisionHeight);
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        console.log(this.centerX + " / " + this.centerY);
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.centerX = x + this.offsetX;
        this.centerY = y + this.offsetY;
        console.log(this.centerX + " / " + this.centerY);
    }

    draw() {
        context.strokeStyle = "#f00";
        super.draw();
    }
}

class Enemy extends Entity {
    constructor(x, y, collisionWidth, collisionHeight) {
        super(enemyImage, x, y, collisionWidth, collisionHeight);
    }

    draw() {
        context.strokeStyle = "#00f";
        super.draw();
    }
}

class Projectile extends Entity {
    constructor(x, y, score, movementVector, collisionWidth, collisionHeight) {
        super(projectileImage, x, y, collisionWidth, collisionHeight);
        this.score = score;
        this.movementVector = movementVector * projectileSpeed;
    }

    hit() {
        entities["player"].score += this.score;
    }

    move() {
        console.log("penis");

        super.move(this.movementVector.x * deltaTime, this.movementVector.y * deltaTime);
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        return new Vector(this.x / this.magnitude(), this.y / this.magnitude())
    }

    scale(c) {
        return new Vector(this.x * c, this.y * c);
    }
}