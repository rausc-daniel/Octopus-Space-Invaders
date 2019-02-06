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
let cooldown = 1000;

const playerImage = new Image();
playerImage.src = "./img/player.png";

const crabLegL = new Image();
crabLegL.src = "./img/crab_leg_l.png";

const crabLegR = new Image();
crabLegR.src = "./img/crab_leg_r.png";

const penguin1 = new Image();
penguin1.src = "./img/penguin_1.png";

const penguin2 = new Image();
penguin2.src = "./img/penguin_2.png";

const penguin3 = new Image();
penguin3.src = "./img/penguin_3.png";

const projectileImage = new Image();
projectileImage.src = "./img/projectile.png";

const enemyImage = new Image();
enemyImage.src = "./img/player.png";

const penguins = [penguin1, penguin2, penguin3]

function keyDown(event) {
    if (event.keyCode == 37 && changeTimer > cooldown) {
        left_arrow = true;
        changeTimer = 0;
    }
    if (event.keyCode == 39 && changeTimer > cooldown) {
        right_arrow = true;
        changeTimer = 0;
    }
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
    if (event.keyCode == 37)
        left_arrow = false;
    if (event.keyCode == 39)
        right_arrow = false;
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
    if (right  && entities["player"].x < canvasWidth - entities["player"].width)
        entities["player"].move(playerSpeed, 0);
    if(left_arrow && entities["player"].currentWeapon > 0)
        entities["player"].currentWeapon--;
    if(right_arrow && entities["player"].currentWeapon < 2)
        entities["player"].currentWeapon++;
    if (space)
        entities["player"].shoot();
    // if (esc)
    //     clearInterval(gameLoop);
}

function drawOverlay() {
    context.fillStyle = "#fff";
    context.fillRect(0,0,1024,100);
    context.strokeStyle = "#ff0000";
    context.lineWidth = "5";
    context.strokeRect(2.5,2.5,1019,97.5);
    context.font="30px Arial"
    context.fillStyle = "#000";
    context.fillText("Score: " + entities["player"].score, 50, 60);
    context.fillText("Health: " + entities["player"].hp, 800, 60);
    context.font="50px Arial"
    context.fillText("Octogeddon Lite", 310, 70);
}

function drawEntities() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < entities["projectiles"].length; i++) {
        let key = entities["projectiles"][i];
        key.draw();
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
        if(detectColission(entities["player"], entities["aliens"][i]) || detectColission(entities["player"].weapons[1], entities["aliens"][i])) {
            entities["player"].hit();
            entities["aliens"].splice(i,1);
        }
        else if(detectColission(entities["player"].weapons[0], entities["aliens"][i]) || detectColission(entities["player"].weapons[2], entities["aliens"][i])) {
            entities["player"].score++;
            entities["aliens"].splice(i,1);
        }
    }
}

function detectColission(a  , b) {
    if(a.centerX - a.collisionWidth / 2 < b.centerX + b.collisionWidth / 2 && 
        a.centerX + a.collisionWidth / 2 > b.centerX - b.collisionWidth / 2 &&
        a.centerY - a.collisionHeight / 2 < b.centerY + b.collisionHeight / 2 && 
        a.centerY + a.collisionHeight / 2 > b.centerY - b.collisionHeight / 2) {
            return true;
        }
    return false;
}