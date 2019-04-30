// -----------------------------------------------------
//                      CANVAS
// -----------------------------------------------------
const gameCanvas = document.getElementById('theCanvas');
gameCanvas.height = '750';
gameCanvas.width = '750';

const game = gameCanvas.getContext('2d');


// -----------------------------------------------------
//                      BALL
// -----------------------------------------------------
let ball_x = 20;
let ball_y = 200;
let ball_dx = 5;
let ball_dy = 3;
let ball_radius = 20;
let ball_color = "rgba(189, 104, 230, 1)";

const drawBall = () => {
	game.beginPath();
	game.arc(ball_x, ball_y, ball_radius, 0, Math.PI*2);
	game.fillStyle = ball_color;
	game.fill();
	game.closePath();
	ball_x += ball_dx;
	ball_y += ball_dy;
}

let ball_horizBound = gameCanvas.height - ball_radius;
let ball_vertBound = gameCanvas.width - ball_radius;

const checkBallBounds = () => {
	if(ball_x + ball_dx > ball_vertBound || ball_x + ball_dx < ball_radius ){
		ball_dx = -ball_dx;
	}
	if(ball_y + ball_dy < ball_radius){
		ball_dy = -ball_dy;
	}
	else if(ball_y + ball_dy > ball_horizBound){
		alert("GAME OVER: YOU LOST!!!");
		clearInterval(run_game);
		document.location.reload();
	}

}

const changeColor = () => {
	let r = Math.floor(Math.random()*256);
	let g = Math.floor(Math.random()*256);
	let b = Math.floor(Math.random()*256);
	return `rgba(${r.toString()}, ${g.toString()}, ${b.toString()}, 1)`;
}

// -----------------------------------------------------
//                      KEYS
// -----------------------------------------------------
let rightKeyPressed = false;
let leftKeyPressed = false;

document.addEventListener('keydown', (event) => {
	if (event.keyCode === 39){
		rightKeyPressed = true;
	}
	else if (event.keyCode === 37){
		leftKeyPressed = true;
	}
})

document.addEventListener('keyup', (event) => {
	if (event.keyCode === 39){
		rightKeyPressed = false;
	}
	else if (event.keyCode === 37){
		leftKeyPressed = false;
	}
})


// -----------------------------------------------------
//                      PADDLE
// -----------------------------------------------------
let paddle_height = 25;
let paddle_width = 150;
let paddle_x = (gameCanvas.width - paddle_width)/2;
let paddle_y = gameCanvas.height - paddle_height;

//NOTE: KEEP PADDLE MOVING AT SAME RATE THAT THE BALL'S X COORDINATE IS CHANGING
//OTHERWISE, YOU ENCOUNTER THE "GLITCH" WHERE BALL GOES INSIDE THE PADDLE
const movePaddle = () => {
	if (rightKeyPressed && paddle_x + paddle_width < gameCanvas.width){
		paddle_x += 5;
	}
	else if (leftKeyPressed && paddle_x > 0){
		paddle_x -= 5;
	}
}

const drawPaddle = () => {
	game.beginPath();
	game.rect(paddle_x, paddle_y, paddle_width, paddle_height);
	game.fillStyle = "#eee";
	game.fill();
	game.closePath();

	movePaddle();
}


const hitPaddle = () => {
	if( ball_y + ball_dy > ball_horizBound - paddle_height && 
		ball_x >= paddle_x && 
		ball_x <= paddle_x + paddle_width){

		ball_dy = -ball_dy;
		ball_color = changeColor();
		brick_colorIndex = Math.floor(Math.random()*5);
	}
	else if(  (ball_y+ball_dy > ball_horizBound - paddle_height) && 
			( ( (ball_x+ball_dx <= paddle_x) && (ball_x+ball_dx >= paddle_x - ball_radius) ) || 
			  ( (ball_x+ball_dx >= paddle_x+paddle_width) && (ball_x+ball_dx <= paddle_x + paddle_width + ball_radius) ) ) ){
		ball_dx = -ball_dx;
	}
}


// -----------------------------------------------------
//                  OBSTACLES/TARGETS
// -----------------------------------------------------

//how many rows of bricks
let brick_rows = 3;

//how many columns of bricks
let brick_columns = 5;

//height of one brick
let brick_height = 25;

//width of one brick
let brick_width = 142;

//array of colors for the bricks
//all bricks are the same color
//that color changes whenever the ball hits the paddle
let brick_colorArray = ["red", "orange", "yellow", "green", "blue"];
let brick_colorIndex = 0;

//space between bricks (both on the sides and on the bottoms)
let brick_padding = 5;

//space between block of bricks and the canvas(on top and on left, kind of like margin)
let brick_offsetTop = 10;
let brick_offsetLeft = 10;

//array to hold all brick objects and their positions
let bricks = [];

//function to draw each brick based on the x and y coordinates provided as arguments
const createBrick = (brick_x, brick_y) => {
	game.beginPath();
	game.rect(brick_x, brick_y, brick_width, brick_height);
	game.fillStyle = brick_colorArray[brick_colorIndex];
	game.fill();
	game.closePath();
}

//initialize the global array of bricks as a two dimensional array
//each index in the bricks array represents a column in the block of bricks
//each column is itself another array which holds all the bricks for that column (1 for each row)
// [col1, row1] [col2, row1] ......
// [col1, row2]
//      :           
//      :
//each index, [col][row], in the two dimensional array will hold an object with three properties:
//an x-coordinate, a y-coordinate, and a boolean that tracks whether the brick was hit by the ball
const initializeBricks = () => {
	for(let column = 0; column < brick_columns; column++){
		bricks[column] = [];
		for(let row = 0; row < brick_rows; row++){
			bricks[column][row] = {x:0, y:0, hit:false};
			bricks[column][row].x = (column*(brick_padding + brick_width)) + brick_offsetLeft;
			bricks[column][row].y = (row*(brick_padding+brick_height)) + brick_offsetTop;
		}
	}
}

//iterate through global array of bricks, and if the brick has not been hit by the ball,
//call the function to draw it
//if the  ball has hit the brick, then it is not redrawn in any subsequent frame
//which effectively makes the brick "disappear" after the first time it is hit by the ball
const drawBricks = () => {
	for(let column = 0; column < brick_columns; column++){
		for(let row = 0; row < brick_rows; row++){
			if(bricks[column][row].hit === false){
				createBrick(bricks[column][row].x, bricks[column][row].y);
			}
		}
	}
}

//iterate through global brick array and if the position of the ball
//is going to hit any of the bricks from either the left, right, top, or bottom
//then make the ball bounce off of the brick and have the brick disappear
//by setting the boolean key of the brick object equal to true, 
//which prevents it from being redrawn on the next frame
const hitBrick = () => {
	for(let col = 0; col < brick_columns; col++){
		for(let row = 0; row < brick_rows; row++){
			if(bricks[col][row].hit === false){
				let x_coord = bricks[col][row].x;
				let y_coord = bricks[col][row].y;
				if( (ball_x+ball_dx >= x_coord-ball_radius) && 
					(ball_x+ball_dx <= x_coord+brick_width+ball_radius) && 
				   	(ball_y+ball_dy >= y_coord-ball_radius) && 
				   	(ball_y+ball_dy <= y_coord+brick_height+ball_radius) ){

				   ball_dy = -ball_dy;
				   ball_dx = -ball_dx;
				   bricks[col][row].hit = true;
				}
			}
		}
	}
}


initializeBricks();
// -----------------------------------------------------
//                      GAME
// -----------------------------------------------------
const update_game = () => {
	game.clearRect(0,0,gameCanvas.width,gameCanvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	hitPaddle();
	hitBrick();
	checkBallBounds();
}

let run_game = setInterval(update_game, 10);