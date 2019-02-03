class Entity {

    constructor(image, x, y) {
        this.image = image;
        this.width = this.image.width / 2;
        this.height = this.image.height;
        this.x = x - (this.width / 2);
        this.y = y - (this.height / 2);
        this.state = 0;
        this.currentWeapon = 1;
    }

    draw() {
        context.drawImage(this.image, this.width * this.state, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    animate() {
        this.state = (this.state + 1) % 2;
    }
}

class Player extends Entity {

    constructor(x, y) {
        super(playerImage, x, y);
        this.weapons = [new Weapon(crabLegR), new Weapon(penguin1), new Weapon(crabLegL)];
        this.score = 0;
        this.hp = 300;

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
    constructor(image) {
        super(image, 0, 0);
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Enemy extends Entity {
    constructor(x, y) {
        super(enemyImage, x, y);
    }
}

class Projectile extends Entity {
    constructor(x, y, score, movementVector) {
        super(projectileImage, x, y);
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
