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
    height : birdHeight
}

//putket
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;
let gap = 600;

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
    topPipeImg.src = "./images/toppipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./images/bottompipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //laittaa putken joka 1,5 sec
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    bird.y += 1

    if(bird.y >= board.height) {
        reset()
    }

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(topPipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
        context.drawImage(bottomPipeImg, pipe.x, pipe.y + gap, pipe.width, pipe.height)
    }
}

function placePipes() {
    let y = 420
    if(pipeArray.length) y = pipeArray[pipeArray.length - 1].y
    if(y <= 0) y = 420

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
    bird.y -= 50
}

function reset() {
    bird.y = birdY
    bird.x = birdX
    pipeArray = []
}

window.addEventListener("click", click);