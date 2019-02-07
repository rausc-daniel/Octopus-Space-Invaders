let left = false;
let left_arrow = false;
let right = false;
let right_arrow = false;
let esc = false;
let space = false;

const playerSpeed = 5;
const projectileSpeed = 1;
const enemySpeed = 0.5;

let changeTimer = 0;
let cooldown = 100;

const playerImage = new Image();
playerImage.src = "./img/octopus.png";

const crabLegL = new Image();
crabLegL.src = "./img/crab_leg_left.png";

const crabLegR = new Image();
crabLegR.src = "./img/crab_leg_right.png";

const penguin = new Image();
penguin.src = "./img/penguin.png";

const projectileImage = new Image();
projectileImage.src = "./img/schneeball.png";

const enemyImage = new Image();
enemyImage.src = "./img/alien.png";

function keyDown(event) {
    if (event.keyCode == 65)
        left = true;
    if (event.keyCode == 68)
        right = true;
    if (event.keyCode == 32)
        space = true;
    if (event.keyCode == 27)
        esc = true;
}

function keyUp(event) {
    if (event.keyCode == 65)
        left = false;
    if (event.keyCode == 68)
        right = false;
    if (event.keyCode == 32)
        space = false;
    if (event.keyCode == 27)
        esc = false;
}

function handleInput() {
    if (left && entities["player"].x > 0)
        entities["player"].move(-playerSpeed, 0);
    if (right && entities["player"].x < canvasWidth - entities["player"].width)
        entities["player"].move(playerSpeed, 0);
    if (left_arrow && entities["player"].currentWeapon > 0)
        entities["player"].currentWeapon--;
    if (right_arrow && entities["player"].currentWeapon < 2)
        entities["player"].currentWeapon++;
    if (space && changeTimer > cooldown) {
        entities["player"].shoot();
        changeTimer = 0;
    }

    // if (esc)
    //     clearInterval(gameLoop);
}

function drawOverlay() {
    context.font = "30px Arial"
    context.fillStyle = "#fff";
    context.fillText("Score: " + entities["player"].score, 50, 60);
    context.fillText("Health: " + entities["player"].hp, 800, 60);
    context.font = "50px Arial"
    context.fillText("Octogeddon Lite", 310, 70);
}

function drawEntities() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < entities["projectiles"].length; i++) {
        entities["projectiles"][i].draw();
        if (entities["projectiles"][i].y < 0)
            entities["projectiles"].splice(i, 1);
    }

    for (let i = 0; i < entities["aliens"].length; i++) {
        let key = entities["aliens"][i];
        key.draw();
    }

    entities["player"].draw();

    drawOverlay();
}

function animateEntities() {
    entities["player"].animate();
}

function handleCollisions() {
    for (let i = 0; i < entities["aliens"].length; i++) {
        if (detectColission(entities["player"], entities["aliens"][i]) || detectColission(entities["player"].weapons[1], entities["aliens"][i])) {
            entities["player"].hit();
            entities["aliens"].splice(i, 1);
        } else if (detectColission(entities["player"].weapons[0], entities["aliens"][i]) || detectColission(entities["player"].weapons[2], entities["aliens"][i])) {
            entities["player"].score++;
            entities["aliens"].splice(i, 1);
        }
        for (let j = 0; j < entities["projectiles"].length; j++) {
            if (entities["aliens"][i] == null || entities["projectiles"][j] == null)
                continue;
            if (detectColission(entities["aliens"][i], entities["projectiles"][j])) {
                entities["aliens"].splice(i, 1);
                entities["projectiles"].splice(j, 1);
                entities["player"].score++;
            }
        }
    }
}

function detectColission(a, b) {
    if (a.centerX - a.collisionWidth / 2 < b.centerX + b.collisionWidth / 2 &&
        a.centerX + a.collisionWidth / 2 > b.centerX - b.collisionWidth / 2 &&
        a.centerY - a.collisionHeight / 2 < b.centerY + b.collisionHeight / 2 &&
        a.centerY + a.collisionHeight / 2 > b.centerY - b.collisionHeight / 2) {
        return true;
    }
    return false;
}