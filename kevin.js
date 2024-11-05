const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let isGameRunning = false;
let playerX = canvas.width / 2-25;
let playerY = canvas.height -30;
let playerWidth=50;
let playerHeight =10;

let blockX = Math.random() * canvas.width;
let blockY=0;

let blockSize=30;
let speed=2;
let score=0;
let missedBlocks =0;
let maxMissedBlocks =10;


canvas.width = 400;
canvas.height=600;

//const moveLeft = 37;
//const moveRight = 39;
const moveLeft = 'ArrowLeft';
const moveRight= 'ArrowRight';
let keyState = {};

document.addEventListener('keydown', (event) => {
    keyState[event.code] = true;
});
document.addEventListener('keyup', (event) => {
    keyState[event.code] = false;
});

 
//ayy the gameloop now
function gameLoop(){
    console.log('Game Loop is running!');
    if(isGameRunning){
        updateGame();
         
    }
    renderGame();
    requestAnimationFrame(gameLoop);
        
}

function startGame(){
    isGameRunning=true;
    score=0;
    missedBlocks=0;
    blockY=0;
    blockX=Math.random() * canvas.width;
    gameLoop();
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled=false;

}

function stopGame(){
    isGameRunning = false;
    document.getElementById('startButton').disabled= false;
    document.getElementById('stopButton').disabled=true;
}

function updateGame(){

    console.log('Updating Game....');
    console.log('Player Position: ', playerX, playerY);
    console.log('Block Position: ', blockX, blockY);
    if(keyState[moveLeft] && playerX > 0){
        playerX -= 5;
    }
    if(keyState[moveRight] && playerX < canvas.width - playerWidth){
        playerX +=5;
    }

    //ayt gvng less update block position
    blockY += speed;

    if(blockY > canvas.height){
        missedBlocks++;
        if(missedBlocks >= maxMissedBlocks){
            isGameRunning = false;
            displayGameOver();
        }else{
            blockY=0;
            blockX = Math.random() * canvas.width;
        }
        //blockX = Math.random() * canvas.width;
    }

    // el Collision detection

    if(
        blockY + blockSize > playerY &&
        blockY < playerY + playerHeight &&
        blockX + blockSize > playerX &&
        blockX < playerX + playerWidth
    ){
        score++;
        blockY=0;
        blockX = Math.random() * canvas.width;
    }
}

function renderGame(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    //let's make player human ig draw head for now
    ctx.fillStyle ='#ffcc00';
    ctx.beginPath();
    ctx.arc(playerX + playerWidth / 2, playerY - 10, 15, 0, Math.PI *2);
    ctx.fill();

    //drawing the player's body
    ctx.fillStyle='#ffcc00';
    ctx.fillRect(playerX + playerWidth / 4, playerY, playerWidth/2, playerHeight);

    //draw arms (simple lines)
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth=4;
    ctx.beginPath();
    ctx.moveTo(playerX, playerY+playerHeight/2);
    ctx.lineTo(playerX-15, playerY + playerHeight);
    ctx.moveTo(playerX + playerWidth , playerY + playerHeight/2);
    ctx.lineTo(playerX + playerWidth + 15, playerY + playerHeight);
    ctx.stroke();

    //drawing legs simple lines
    ctx.beginPath();
    ctx.moveTo(playerX + playerWidth/4, playerY + playerHeight);
    ctx.lineTo(playerX + playerWidth / 4 -10, playerY+playerHeight+20);
    ctx.moveTo(playerX + playerWidth*3/4, playerY + playerHeight);
    ctx.lineTo(playerX + playerWidth*3/4+10, playerY + playerHeight + 20);
    ctx.stroke();

 //ayy i wanna add hair 
    ctx.fillStyle='#663300';
    ctx.beginPath();
    ctx.arc(playerX + playerWidth/2, playerY-25, 20, 0, Math.PI);


    /*gotta draw the player feel me gvng
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(playerX,playerY, playerWidth, playerHeight);*/

    //the falling block

    ctx.fillStyle='#ff0000';
    ctx.fillRect(blockX, blockY, blockSize, blockSize);

    //display score
    ctx.fillStyle='#000000';
    ctx.font='20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    //display the blocks missed naa
    ctx.fillText('Missed: ' + missedBlocks, 10, 60);

    //as die game over is dan display message
    if(!isGameRunning){
        displayGameOver();
    }

}

// this my function to display el gameto is over
function displayGameOver(){
    ctx.fillStyle='#ff0000';
    ctx.font='30px Arial';
    ctx.fillText('Game Over!', canvas.width/4, canvas.height/2);
    ctx.font='20px Arial';
    ctx.fillText('Click Start to PLay Again', canvas.width/4, canvas.height / 2 + 40);

}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('stopButton').addEventListener('click', stopGame);