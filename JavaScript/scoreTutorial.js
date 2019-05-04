let gameCanvas = document.getElementById('theCanvas');
gameCanvas.height = '700';
gameCanvas.width = '750';

let game = gameCanvas.getContext('2d');

let runGame;
let current_score = 0;
let lives = 3;

const gameOver = () => {
	cancelAnimationFrame(runGame);
	alert("You Lost");
	window.location.reload();
}

const playAgain = () => {
	alert("You Won!!");
	let question = prompt("Would You Like To Play Again? (Y/N)", 'Y');
	switch(question.toLowerCase()){
		case 'yes':
		case 'y':
			cancelAnimationFrame(runGame);
			window.location.reload();
		break;

		case null:
		case 'no':
		case 'n':
			cancelAnimationFrame(runGame);
			alert("Thank You For Playing!");
		break;

		default:
			cancelAnimationFrame(runGame);
			alert(`${question} was not an option, your inability to follow directions is displeasing`);
			alert("GoodBye!");
	}
} 

let ball_x = 20;
let ball_y = 200;
let ball_dx = 3;
let ball_dy = 5;
let ball_radius = 20;

let delta_x;
let delta_y;

const updateValues = () => {
	ball_x += ball_dx;
	ball_y += ball_dy;
	delta_x = ball_x + ball_dx;
	delta_y = ball_y + ball_dy
}

const drawBall = () => {
	game.beginPath();
	game.arc(ball_x, ball_y, ball_radius, 0, Math.PI*2);
	game.fillStyle = 'aqua';
	game.fill();
	game.closePath();

}

let ball_horz_bound = gameCanvas.height - ball_radius;
let ball_vert_bound = gameCanvas.width - ball_radius;

const checkBallBounds = () => {
	if (delta_x <= ball_radius || delta_x >= ball_vert_bound){
		ball_dx = -ball_dx;
	}
	if (delta_y <= ball_radius){
		ball_dy = -ball_dy;
	}
	else if (ball_y === gameCanvas.height - (ball_radius/2)){
		lives --;
		checkLives();
	}
}

let paddle_height = 25;
let paddle_width = 150
let paddle_x = (gameCanvas.width - paddle_width)/4;
let paddle_y = gameCanvas.height - paddle_height;

let paddle_right_bound = gameCanvas.width - paddle_width;

const drawPaddle = () => {
	game.beginPath();
	game.rect(paddle_x, paddle_y, paddle_width, paddle_height);
	game.fillStyle = '#eee';
	game.fill();
	game.closePath();
}

let right_key_pressed = false;
let left_key_pressed = false;

const movePaddle = () => {
	if (right_key_pressed && paddle_x <= paddle_right_bound){
		paddle_x += 9;
	}
	else if (left_key_pressed && paddle_x >= 0){
		paddle_x -= 9;
	}
}

document.addEventListener('keydown', (event) => {
	if (event.keyCode === 39){
		right_key_pressed = true;
	}
	else if (event.keyCode === 37){
		left_key_pressed = true;
	}
});

document.addEventListener('keyup', (event) => {
	if (event.keyCode === 39){
		right_key_pressed = false;
	}
	else if (event.keyCode === 37){
		left_key_pressed = false;
	}
});

let paddle_top_range;
let paddle_left_edge;
let paddle_left_range;
let paddle_right_range;
let paddle_right_edge;

const hitPaddle = () => {
	let paddle_top_range = paddle_y - ball_radius;
	let paddle_left_range = paddle_x - ball_radius;
	let paddle_left_edge = paddle_x;
	let paddle_right_range = paddle_x + paddle_width + ball_radius;
	let paddle_right_edge = paddle_x + paddle_width;

	if (delta_y >= paddle_top_range && 
	   delta_x > paddle_left_edge && 
	   delta_x < paddle_right_edge){
		ball_dy = -ball_dy;
	}
	if ((delta_y > paddle_top_range) && 
		(((delta_x >= paddle_left_range) && (delta_x <= paddle_left_edge)) ||
		 		((delta_x >= paddle_right_edge) && (delta_x <= paddle_right_range))) ){
		ball_dx = -ball_dx;
		ball_dy = -ball_dy;
	}
}

let brick_row_count = 3;
let brick_column_count = 5;
let brick_count = brick_row_count * brick_column_count;
let brick_height = 40;
let brick_width = 142;
let brick_padding = 5;
let brick_offset_left = 10;
let brick_offset_top = 10; 

let bricks = [];

const inititalizeBricks = () => {
	for (let col = 0; col < brick_column_count; col++){
		bricks[col] = [];
		for (let row = 0; row < brick_row_count; row++){
			bricks[col][row] = {x:0, y:0, hit:false};
			bricks[col][row].x = (col * (brick_width + brick_padding)) + brick_offset_left;
			bricks[col][row].y = (row * (brick_height + brick_padding)) + brick_offset_top;
		}
	}
}

const drawBrick = (brick) => {
	game.beginPath();
	game.rect(brick.x, brick.y, brick_width, brick_height);
	game.fillStyle = "red";
	game.fill();
	game.closePath();
}

const drawBricksArray = () => {
	for (let col = 0; col < brick_column_count; col++){
		for (let row = 0; row < brick_row_count; row++){
			if (bricks[col][row].hit === false){
				drawBrick(bricks[col][row]);
			}
		}
	}
}

let brick;
let brick_left;
let brick_right;
let brick_top;
let brick_bottom;

const hitBrick = () => {
	for (let col = 0; col < brick_column_count; col++){
		for (let row = 0; row < brick_row_count; row++){
			brick = bricks[col][row];
			brick_left = brick.x;
			brick_right = brick.x + brick_width;
			brick_top = brick.y;
			brick_bottom = brick.y + brick_height;
			
			if(brick.hit === false){
				if(delta_x >= brick_left && delta_x <= brick_right &&
				   delta_y >= brick_top && delta_y <= brick_bottom){

					ball_dx = -ball_dx;
					ball_dy = -ball_dy;
					brick.hit = true;
					current_score++;
					break;
				}
			}
		}
	}
}

inititalizeBricks();

const ballFuncs = () => {
	drawBall();
	updateValues();
	checkBallBounds();
}

const paddleFuncs = () => {
	drawPaddle();
	movePaddle();
	hitPaddle();
}

const brickFuncs = () => {
	drawBricksArray();
	hitBrick();
}

const updateScore = () => {
	game.font = "22px Arial";
	// game.fillStyle = "#0095DD";
	game.fillStyle = "white";
	game.fillText("Score: " + current_score, 8, 20);

	if (current_score === brick_count){
		playAgain();
	}
}

const checkLives = () => {
	if(lives === 0){
		gameOver();
	}
	else{
		ball_x = 20;
		ball_y = 200;
		ball_dx = 3;
		ball_dy = 5;
	    paddle_x = (gameCanvas.width - paddle_width)/4;
	    paddle_y = gameCanvas.height - paddle_height;
	}
}

const updateLives = () => {
	game.font = "22px Arial";
	game.fillStyle = "white";
	game.fillText("Lives: " + lives, gameCanvas.width-80, 20);
}

const updateGame = () => {
	game.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	ballFuncs();
	paddleFuncs();
	brickFuncs();
	updateScore();
	updateLives();
	runGame = requestAnimationFrame(updateGame);
}

updateGame();






