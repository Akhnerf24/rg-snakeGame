//snake board
const CELL_SIZE = 20;
const CANVAS_SIZE = 500;
//made faster
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
//movement direction
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        position: initPosition(),
        direction: initDirection(),
        score: 0,
        lifeposition: [
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
        ],
    }
}

//snake speed movement
let MOVE_INTERVAL = 200;
//game level
let lifes = []
let level = 1;
let counter = 0;
let currentMoveSpeed = MOVE_INTERVAL;

let snake = initSnake("purple");

let apples = [{
    color: "red",
    position: initPosition(),
},
{
    color: "green",
    position: initPosition(),
}]

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

//draw score
function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake.color) {
        scoreCanvas = document.getElementById("scoreBoard");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

// draw level
function drawLevel(snake) {
    let lvlCanvas;
    lvlCanvas = document.getElementById("currentlevel");

    let lvlCtx = lvlCanvas.getContext("2d");

    lvlCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    lvlCtx.font = "20px Arial";
    lvlCtx.fillstyle = "black";
    lvlCtx.fillText("Level: "+level, 10, lvlCanvas.scrollHeight / 2);
}

//draw speed
function drawSpeed() {
    let speedCanvas;
    speedCanvas = document.getElementById("speed");
    
    let speedCtx = speedCanvas.getContext("2d");

    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "20px Arial";
    speedCtx.fillStyle = "black"
    speedCtx.fillText("Speed: "+currentMoveSpeed + " .ms", 10, speedCanvas.scrollHeight / 2);
}
//draw wall
function drawWall(ctx, x1, y1, x2, y2) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x1 * CELL_SIZE, y1 * CELL_SIZE);
    ctx.lineTo(x2 * CELL_SIZE, y2 * CELL_SIZE);
    ctx.stroke();
}

let walls = []

function isLeveledUp() {
    if (snake.score == 5 && counter == 0) {
        //insert audio
        // play audio here
        alert("Congratualtion Level 1 Completed");
        level = 2;
        currentMoveSpeed = 125;
        walls[0] = {x1: 5, y1: 12, x2: 20, y2: 12};
        counter++;
    } else if (snake.score == 10 && counter == 1) {
        //insert audio
        // play audio here
        alert("Congratualtion Level 2 Completed");
        level = 3;
        currentMoveSpeed = 100;
        walls[0] = {x1: 5, y1: 8, x2: 20, y2: 8};
        walls[1] = {x1: 5, y1: 14, x2: 20, y2: 14};
        counter++;
    } else if (snake.score == 15 && counter == 2) {
        //insert audio
        // play audio here
        alert("Congratualtion Level 3 Completed");
        level = 4;
        currentMoveSpeed = 75;
        walls[0] = {x1: 0, y1: 12, x2: 15, y2: 12};
        walls[1] = {x1: 15, y1:12, x2: 30, y2: 12};
        walls[2] = {x1: 13, y1: 0, x2: 13, y2: 12};
        counter++;
    } else if (snake.score == 20 && counter == 3) {
        //insert audio
        // play audio here
        alert("Congratualtion Level 4 Completed");
        level = 5;
        currentMoveSpeed = 50;
        walls[0] = {x1: 0, y1: 12, x2: 15, y2: 12};
        walls[1] = {x1: 15, y1:12, x2: 30, y2: 12};
        walls[2] = {x1: 13, y1: 0, x2: 13, y2: 12};
        walls[3] = {x1: 13, y1: 0, x2: 13, y2: 30};
        counter++;
    } else if (snake.score == 25 && counter == 4) {
        alert("You Win");
        //insert audio
        // play audio here
    }
}



//drawLife
function drawLife(ctx, life) {
    let lifeImg = document.getElementById("life")
    setTimeout(function () {
      ctx.drawImage(lifeImg, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }, REDRAW_INTERVAL / 2)
  }


function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");
        
        //draw canvas
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        //draw snake head
        var imgHead = document.getElementById("snake");
        ctx.drawImage(imgHead, snake.head.x * CELL_SIZE, snake.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        //draw snake body
        for (let i = 1; i < snake.body.length; i++) {
            var imgBody = document.getElementById("body");
            ctx.drawImage(imgBody, snake.body[i].x * CELL_SIZE, snake.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        
        //draw apple
        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];

            var img = document.getElementById("apple");
            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        
        //draw life
        for (let i = 0; i < lifes.length; i++) {
            drawLife(ctx, lifes[i])
        }

        //draw wall
        if (level > 1) {
            for (let i = 0; i< level -1; i++){
                drawWall(ctx, walls[i].x1, walls[i].y1, walls[i].x2, walls[i].y2);
            }
        }
        
        //draw level
        drawLevel(snake);
        //draw speed
        drawSpeed(snake);
        //draw score
        drawScore(snake);
        
        
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apples) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;
            snake.body.push({x: snake.head.x, y: snake.head.y});
        }
    }
    isLeveledUp();
}

function wallCollision(x, y) {
    let isCollide = false;
    if (level > 1){
        for (let i = 0; i< level; i++) {
            if (x == walls[i].x1 && y >= walls[i].y1 && y < walls[i].y2 || y == walls[i].y1 && x >= walls[i].x1 && x < walls[i].x2 ) {
                isCollide = true;
            }
        }
    }
    return isCollide;
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples);
}

function checkCollision(snakes) {
    let isCollide = false;
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        console.log("collide", snake.color);
        if (snake == snake) {
            snake = initSnake("purple");
            setTimeout(function() {
                move(snake);
            }, MOVE_INTERVAL);
        } 
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake, DIRECTION.DOWN);
    }

})

function initGame() {
    move(snake);
}

initGame();
