//variable for storing the canvas so it can be referenced
let gameCanvas = document.getElementById('theCanvas');


//change canvas dimensions because it auto-defaults to 300 width and 150 height
//regardless of CSS stylings 
gameCanvas.height = "400";
gameCanvas.width = "200";


//variable to store the 2D rendering context, the tool used to paint the canvas
let canvasContext = gameCanvas.getContext('2d');


//method on the 2D rendering context
//tells browswer that code to style/paint the canvas for a specific object begins after this line
////all related code for a specific object must be between the .beginPath() and .closePath() for that object
canvasContext.beginPath();


//used to draw a rectangle on the canvas
//takes four arguments:
//first two arguments are the coordinate points of the top left corner of the rectangle (x,y)
//so this rectangle is going to be positioned 70 pixels from the left of the canvas' left edge
//and 75 pixels from the top of the canvas' top edge
//the next two arguments are the width and height of the rectangle, in that order
//so this rectangle will be 70 pixels wide and 75 pixels high
// canvasContext.rect(70, 75, 70, 75);


//fillStyle is a property that stores the color that will be used by the subsequent fill() method
//color given in hex notation
// canvasContext.fillStyle = "#347813";


//fill() is a method that takes the color stored in the preceding fillStyle property 
//and colors in the last declared object with that color
//so since it comes after the previous two lines, you would have a aqua rectangle  
// canvasContext.fill();


//method on the 2D rendering context
//tells browswer that code to style/paint the canvas for a specific object ends before this line
//all related code for a specific object must be between the .beginPath() and .closePath() for that object
canvasContext.closePath();


//separate path for a separate object
//this time we will draw a circle instead of a rectangle
canvasContext.beginPath();


//used to draw a circle on the canvas
//will only draw a perfect circle if the canvas is a perfect square(height==width)
//otherwise it will draw an oval
//takes five arguments and an optional sixth:
//first two arguments are coordinates of exact center point of the circle (x,y)
//next argument is the arc radius
//the last two arguments are the start and end angles(in radians) repsectively.
//the optional sixth argument is a boolean, which specifies the direction that the circle is drawn in
//false(default) is for clockwise, and true is for counter-clockwise
// canvasContext.arc(200, 200, 50, 0, Math.PI*2);


//store color, which is specified using the name of the color
canvasContext.fillStyle = "red";


//fill in the color
canvasContext.fill();


//end path for the circle
canvasContext.closePath();


//trace a half circle using stroke.
canvasContext.beginPath()


//draws a half circle
//Math.PI*.5 for a quarter circle, Math.PI*1.5 for a three-quarter circle
// canvasContext.arc(400, 300, 30, 0, Math.PI);


//while fillStyle and fill(), will fill out the entire shape with specified color
//strokeStyle and stroke(), will only trace/outline the shape with specified color
//basically like using a colored pencil to draw the shape and then not coloring it in
//strokeStyle stores the color, which is specified using rgba notation
//alpha channel allow for control over how transparent or opaque specified color will be
canvasContext.strokeStyle = "rgba(255,0,0,1)";


//similar to fill(), it takes the color specified by its associated strokeStyle property
//and uses that color to do the trace/outline
canvasContext.stroke();
canvasContext.closePath();










