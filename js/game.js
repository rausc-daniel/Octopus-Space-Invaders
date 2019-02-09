const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

const canvasWidth = 1024;
const canvasHeight = 768;
const canvasMiddle = canvasWidth / 2;

const deltaTime = 1000 / 60;
let timer = 0;

let gameLoop = null;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let entities = {}


window.onload = function () {
    entities = {
        player: new Player(canvasMiddle, canvasHeight - 100, 30, 60),
        projectiles: [],
        aliens: []
    }

    // Game Loop
    gameLoop = setInterval(() => {
        // Input
        handleInput();   
        
        for (let i = 0; i < entities["projectiles"].length; i++) {
            let key = entities["projectiles"][i];
            key.move();
        }

        // AI Logic
        if(Math.random() < 0.05) {
            entities["aliens"].push(new Enemy((Math.random() * (canvasWidth + 100)) - 00, 100, 80, 30));
        }
        let playerPos = new Vector(entities["player"].x, entities["player"].y);
        for(let i = 0; i < entities["aliens"].length; i++) {
            let target = new Vector(playerPos.x - entities["aliens"][i].x, playerPos.y - entities["aliens"][i].y).normalize();
            entities["aliens"][i].move(target.x * deltaTime * enemySpeed, target.y * deltaTime * enemySpeed);
        }

        handleCollisions();
        
        if(entities["player"].hp == 1)
            entities["player"].state = 1;
        if(entities["player"].hp == 0){
            clearInterval(gameLoop);

                window.location.href = "kik.danielrauschenberger.de/highscores";

        }

        // Logic
        if (timer > 500) {
            animateEntities();
            timer = 0;
        }
        
        // Render
        drawEntities();

        timer += deltaTime;
        changeTimer += deltaTime;
        
    }, deltaTime);
}

// Input Handler
document.addEventListener("keydown", (event) => keyDown(event));
document.addEventListener("keyup", (event) => keyUp(event));