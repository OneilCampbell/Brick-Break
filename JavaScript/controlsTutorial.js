let gameCanvas = document.getElementById('theCanvas');
gameCanvas.height = '750';
gameCanvas.width = '750';

let game = gameCanvas.getContext('2d');

let radius = 20;

let x = 100;
let y = 100;

let dx = 5;
let dy = 3;

const drawCircle = () => {
	game.beginPath();
	game.arc(x, y, radius, 0, Math.PI*2);
	game.fillStyle = 'aqua';
	game.fill();
	game.closePath();

	x+=dx;
	y+=dy;
}

let vertBound = gameCanvas.width - radius;
let horizBound = gameCanvas.height - radius;

const boundsCheck = () => {
	if(x+dx > vertBound || x+dx < radius){
		dx = -dx;
	}

	if(y+dy < radius){
		dy = -dy;
	}


	//change the original boundary check function, 
	//so that the ball no longer bounces off of the bottom boundary
	//instead, if paddle misses the ball and hits boundary, 
	//alert the user to the game ending (now there is a way to lose)
	//the interval which was updating the canvas is then cleared,
	//the page is then reloaded to restart the game
	else if(y+dy > horizBound){
		alert("GAME OVER: LOSER!!");
		clearInterval(cycle);
		document.location.reload();
	}
}

//dimensions for the paddle
let paddleHeight = 25;
let paddleWidth = 150;

//coordinates for the starting point of the paddle
let paddleX = (gameCanvas.width - paddleWidth)/2;
let paddleY = gameCanvas.height - paddleHeight;

//function to draw the paddle on the canvas each time
const drawPaddle = () => {
	game.beginPath();
	game.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	game.fillStyle = "#eee";
	game.fill()
	game.closePath();

	//if right or left button was pressed, move the paddle accordingly
	if(rightPressed && paddleX < gameCanvas.width - paddleWidth){
		paddleX += 5;
	}

	else if(leftPressed && paddleX > 0){
		paddleX -= 5;
	}
}

//boolean variables to check if right and left buttons were pressed
let rightPressed = false;
let leftPressed = false;


//function that gets run after keydown event listener is triggered
//it checks to see if the keycode of the triggering event
//is equivalent to the keycode of the right/left cursor (39 and 37 respectively)
//if so, set respective booleans that track whether the button was pressed to true
//to indicate that that button was pressed
const keyPressed = (event) => {
	if(event.keyCode === 39){
		rightPressed = true;
	}
	else if(event.keyCode === 37){
		leftPressed = true;
	}
}


//function that gets run after keyup event listener is triggered
//it checks to see if the keycode of the triggering event
//is equivalent to the keycode of the right/left cursor (39 and 37 respectively)
//if so, set respective booleans that track whether the button was pressed to false
//to indicate that that button was released
const keyReleased = (event) => {
	if(event.keyCode === 39){
		rightPressed = false;
	}
	else if(event.keyCode === 37){
		leftPressed = false;
	}
}

//function to check if the ball is going to bounce in the same area that the paddle occupies
//if so, move the horizontal boundary higher 
//so that the ball appears to bounce/hit off of the paddle
//the same logic that was used to make the ball bounce off the walls, 
//is now refactored to make it bounce off the paddle
const hitPaddle = () => {
	if(y+dy > horizBound - paddleHeight && x >= paddleX && x <= paddleX + paddleWidth){
		dy = -dy;
	}
	else if(  (y+dy > horizBound - paddleHeight) && 
			( (x+dx <= paddleX && x+dx >= paddleX - radius) || 
			  (x+dx >= paddleX && x+dx <= paddleX + paddleWidth + radius) ) ){
		dx = -dx;
	}
}

const updateCanvas = () => {
	game.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	drawCircle();
	drawPaddle();
	hitPaddle();
	boundsCheck();
}


//add event listeners to register when a key is pressed down and then when it is released
//if either event is triggered, run the respective functions provided as the second argument
//boolean is default value, meaning that the event is not currently happening
//in this case, don't have to worry about the boolean after declaring
document.addEventListener("keydown", keyPressed, false);
document.addEventListener("keyup", keyReleased, false);

let cycle = setInterval(updateCanvas, 10);


















