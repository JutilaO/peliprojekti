let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//lintu
let birdWidth = 34;
let birdHeight = 24
let birdX = boardWidth/7;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight,
    gravity : 0
}

//putket
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let gap = 650;
let started = false;
let score = 0;

//fysiikat
let velocityX = -0.9;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //lataa kuvat
    birdImg = new Image();
    birdImg.src = "./images/flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    bottomPipeImg = new Image();
    topPipeImg.src = "./images/toppipe.png";
    bottomPipeImg.src = "./images/bottompipe.png";

    upSound = new Audio();
    scoreSound = new Audio();
    upSound.src = "./sounds/up.mp3";
    scoreSound.src = "./sounds/score.mp3";

    context.font = "34px monospace";
    context.fillStyle = "orange";

    context.fillText("Click to begin", 50, 50);
    requestAnimationFrame(update);
    setInterval(placePipes, 1750); //laittaa putken joka 1,75 sec
}

function update() {
    requestAnimationFrame(update);
    if(started === false) return;

    context.clearRect(0, 0, board.width, board.height);
    bird.y += 1.2

    //linnun piirto
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;

        //putkien piirto
        context.drawImage(topPipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
        context.drawImage(bottomPipeImg, pipe.x, pipe.y + gap, pipe.width, pipe.height);

        //reset linnun osuessa putkeen
        if(bird.x + bird.width >= pipe.x && bird.x <= pipe.x + pipeWidth && (bird.y <= pipe.y + pipeHeight || bird.y + bird.height >= pipe.y + gap) || bird.y >= board.height || bird.y <= 0) reset();

        //pisteytys
        if(pipe.x <= birdX && pipe.passed === false){
            score++;
            pipe.passed = true;
            scoreSound.play();
        }
    }
    context.fillText("Score: " + score, 50, 85);
}

function placePipes() {
    if(started === false) return;

    let y = 420;
    if(pipeArray.length) y = pipeArray[pipeArray.length - 1].y;
    if(y <= 0) y = 420;

    let pipe = {
        x : pipeX,
        y : Math.floor(Math.random() * y + 1) - y,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(pipe);
}

function click() {
    bird.y -= 55;
    upSound.play()
    if(started === false) started = true;
}

function reset() {
    bird.y = birdY;
    bird.x = birdX;
    pipeArray = [];
    started = false;
    score = 0;
    context.clearRect(0, 0, boardWidth, boardHeight);
    context.fillText("Click to begin", 50, 50);
}

window.addEventListener("click", click);