let gameCanvas = document.getElementById('theCanvas');

gameCanvas.height = "750";
gameCanvas.width = "750";

let game = gameCanvas.getContext('2d');


//global variables to keep track of and update object position
//use as coordinates when defining the object (x,y)
let x = 50;
let y = 200;

//******* to do multiple objects simultaneously, just duplicate ********

// let x1 = 400;
// let y1 = 200;

// let x2 = 150;
// let y2 = 300;

// let x3 = 200;
// let y3 = 450;

// let x4 = 340;
// let y4 = 100;


//global variables to save and/or change the amount that each component of the object's
//position coordinate is being changed by
//'d' stands for delta which in math means 'change'
//add pos value to x, moves object right, neg value moves it left
//similarly if you add pos to y, moves object down, neg value moves it up
let dx = 3;
let dy = 5;

//******* to do multiple objects simultaneously, just duplicate ********

// let dx1 = 3;
// let dy1 = 6;

// let dx2 = 3;
// let dy2 = 6;

// let dx3 = 3;
// let dy3 = 7;

// let dx4 = 3;
// let dy4 = 5;

//set variable to keep store the radius of the circle for reference later, both to draw
//the circle and in the function that keeps the circle from going off screen
let radius = 30;

//helper function to draw blue circle
//best to keep object paths in seprate functions so that the code looks cleaner
//and if you are drawing multiple objects, this methodology keeps them separate
const drawCircle = () => {

	game.beginPath();
	game.arc(x, y, radius, 0, Math.PI*2);
	game.fillStyle = "rgba(0, 0, 255, 1)";
	game.fill();
	game.closePath();

	//******* to do multiple objects simultaneously, just duplicate ********

 	// game.beginPath();
	// game.arc(x1, y1, radius, 0, Math.PI*2);
	// game.fillStyle = "rgba(200, 50, 10, 1)";
	// game.fill();
	// game.closePath();

	// game.beginPath();
	// game.arc(x2, y2, radius, 0, Math.PI*2);
	// game.fillStyle = "rgba(25, 70, 0, 1)";
	// game.fill();
	// game.closePath();

	// game.beginPath();
	// game.arc(x3, y3, radius, 0, Math.PI*2);
	// game.fillStyle = "rgba(5, 110, 220, 1)";
	// game.fill();
	// game.closePath();

	// game.beginPath();
	// game.arc(x4, y4, radius, 0, Math.PI*2);
	// game.fillStyle = "rgba(55, 10,68, 1)";
	// game.fill();
	// game.closePath();
}


//variables to calculate the boundaries
//since the circle is considered from it's center, have to subtract off the radius 
//to account for outer edge of the circle
let verticalWalls = gameCanvas.width - radius;
let horizontalWalls = gameCanvas.height - radius;


//function to check if the circle will be out of bounds after the next update to its position
//if so, then set the rate of change(dy/dx) to the inverse (negate it), which will reverse
//the direction that the circle is traveling, effectively keeping it in bounds
//(radius,radius) is as far, left and up, that the circle can travel while still remaining in balance
//(verticalWalls, horizontalWalls) is as far, right and down, the circle can travel
//so if the circle is going to exceed either of those bounds, reverse its direction 
const keepInBounds = () => {

	if(x+dx > verticalWalls || x+dx < radius){
		dx = -dx;
	}

	if(y+dy > horizontalWalls || y+dy < radius){
		dy = -dy;
	}

	//******* to do multiple objects simultaneously, just duplicate ********

	// if(x1+dx1 > verticalWalls || x1+dx1 < radius){
	// 	dx1 = -dx1;
	// }

	// if(y1+dy1 > horizontalWalls || y1+dy1 < radius){
	// 	dy1 = -dy1;
	// }

	// if(x2+dx2 > verticalWalls || x2+dx2 < radius){
	// 	dx2 = -dx2;
	// }

	// if(y2+dy2 > horizontalWalls || y2+dy2 < radius){
	// 	dy2 = -dy2;
	// }

	// if(x3+dx3 > verticalWalls || x3+dx3 < radius){
	// 	dx3 = -dx3;
	// }

	// if(y3+dy3 > horizontalWalls || y3+dy3 < radius){
	// 	dy3 = -dy3;
	// }

	// if(x4+dx4 > verticalWalls || x4+dx4 < radius){
	// 	dx4 = -dx4;
	// }

	// if(y4+dy4 > horizontalWalls || y4+dy4 < radius){
	// 	dy4 = -dy4;
	// }
}


//in order to get things to move on the canvas, we will be using a function and a helper
//in combination with setInterval() to repaint the object in a different position each time
//which will give the appearance of movement
const move = () => {

	//built-in function used to clear an area of all paths/drawings
	//similar to when declaring a rectangle, this function takes 4 arguments:
	//the first two are the coordinates of the top left corner of the rectangle
	//while the second two specify the dimensions of the rectangle
	//or in this case the area we want to clear
	//since we start at the upper left corner of the canvas and our rectangle
	//spans the entire height and width of the canvas, it will create a blank slate
	//each time the function is called, eraing the old drawing and then creating the new one
	//so it will give the impression of movement
	game.clearRect(0,0,gameCanvas.width, gameCanvas.height);

	//call function to actually draw the circle
	drawCircle();

	//update x and y values so that object will be drawn in a different position 
	//each time the function is called
	x += dx;
	y += dy;

	//******* to do multiple objects simultaneously, just duplicate ********

	// x1 += dx1;
	// y1 += dy1;

	// x2 += dx2;
	// y2 += dy2;

	// x3 += dx3;
	// y3 += dy3;

	// x4 += dx4;
	// y4 += dy4;

	//call function to keep circle from going off screen
	keepInBounds();

}

let cycle = setInterval(move, 10);
















