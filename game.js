var	fps = 33; //this is around 30 fps


var stage = document.getElementById("gameCanvas");
	stage.width = 640;
	stage.height = 480;

var ctx = stage.getContext("2d");
	ctx.fillStyle = "blue";
	ctx.font = "bold 20px sans-serif";

//mario background
var background = document.getElementById('background');
var bgX=0;
var bgY=0;

//mario to move with A and D
var marioPath = "img/mario.png";	
var marioWidth = 284;
var marioHeight = 256;
var mWidth = marioWidth / 6;
var mHeight = marioHeight / 4;
var marioImage = new Image();
	marioImage.ready = false;
	marioImage.onload = setAssetReady;
	marioImage.src = marioPath;
var marioX = 300;
var marioY = 145;
var mStartX = mWidth*4;
var mStartY = mHeight*1;
var marioMoving = false;
var marioDirection = "S";
var marioSpeed = 5;

var info = "W and D to move";


//Timing
var timeUpdate = 30;
var timeTick = 0;


//Mario coin
var coinPath = "img/coin.gif";	
var coinWidth = 12;
var coinHeight = 16;
var coinImage = new Image();
	coinImage.ready = false;
	coinImage.onload = setAssetReady;
	coinImage.src = coinPath;
var coinX = 400;
var coinY = 145;
var coinHit = false;



//Timings
var timeUpdate = 30;
var timeTick = 0;




function setAssetReady()
{
	this.ready = true;
}


//Browser Detection
navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    return M;
})();

var browser;
if (navigator.sayswho[0] == "Firefox")
	browser="f";
else if (navigator.sayswho[0] == "Chrome")
	browser="c";
else if (navigator.sayswho[0] == "Safari")
	browser="s";
else  if (navigator.sayswho[0] == "Microsoft")
	browser="m";
else
	browser="f";


var gameloop, mouseX, mouseY, isClicked, score;

//Init values
isClicked = false;
score = 0;



gameloop = setInterval(update, fps);	
document.addEventListener("keydown",keyDownHandler, false);	
document.addEventListener("keyup",keyUpHandler, false);		
stage.addEventListener("click", canvasClick, false);

function canvasClick(event)
{	
	if (browser == "f" || browser == "m")
	{
		mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
		mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}
	isClicked = true;
}	

//------------
//Game Loop
//------------


function update()
{		
	//Clear Canvas
	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, stage.width, stage.height);	
	ctx.drawImage(background, bgX, bgY);

	if (marioImage.ready && coinImage.ready) 
	{
		ctx.drawImage(marioImage,mStartX,mStartY,marioWidth/6,marioHeight/4,marioX,marioY,marioWidth/6,marioHeight/4);
		ctx.drawImage(coinImage,coinX,coinY,coinWidth*4,coinHeight*4);
	}

		if(isClicked)
		{
			/*
			if(hitTestPoint(flagX, flagY, flagWidth, flagHeight, mouseX, mouseY))
			{
				score++;
				flagX = Math.floor(Math.random() * stage.width);
				flagY = Math.floor(Math.random() * stage.height);
			}
			*/
		}

		isClicked=false;


	if (marioMoving)
	{
		if (marioDirection == "L")
		{
			mStartX = mWidth*4;
			mStartY = mHeight*3;			
			if(bgX==0)
			{
			}
			else
			{
				bgX+=10;
				coinX+=10;
			}
			if(marioX==0)
			{
				info = "At the START";
			}
			else
			{
				info = "W and D to move";
				marioX-=marioSpeed;
			}
		}
		else if (marioDirection == "R")
		{
			mStartX = mWidth*4;
			mStartY = mHeight*1;			
			if(bgX==-460)
			{
			}
			else
			{
				bgX-=10;
				coinX-=10;
			}
			if(marioX==600)
			{
				info = "At the END";
			}
			else
			{
				info = "W and D to move";
				marioX += marioSpeed;
			}

		}
		if(collisionTest(coinX,coinY,coinWidth,coinHeight,marioX,marioY))
		{
			info="COINED";
			coinX=Math.floor(Math.random() * 600);
			score++;
		} //End collision with mario and coin
	}

	//Update info
	ctx.fillStyle = "yellow";
	ctx.fillText(info,50,400);


	//Update Score	
	ctx.fillStyle = "black";		//Some text shadowning
	ctx.fillText(score, 33, 33);	//Some text shadowning
	ctx.fillText(score, 32, 32);	//Some text shadowning
	ctx.fillStyle = "white";
	ctx.fillText(score, 30, 30);

}


function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
 
	if (keyPressed == "A")
	{		
		marioDirection = "L";
		marioMoving = true;
	}
	else if (keyPressed == "D")
	{	
		marioMoving = true;
		marioDirection = "R";		
	}
	if (keyPressed == "W")
	{
	}
}


function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	
	if ((keyPressed == "A") || (keyPressed == "D"))
	{
		marioMoving = false;
	}
}

function hitTestPoint(x1, y1, w1, h1, x2, y2)
{
	//x1, y1 = x and y coordinates of object 1
	//w1, h1 = width and height of object 1
	//x2, y2 = x and y coordinates of object 2 (usually midpt)
	if ((x1 <= x2 && x1+w1 >= x2) &&
		(y1 <= y2 && y1+h1 >= y2))
			return true;
	else
		return false;
}


function collisionTest(x1, y1, w1, h1, x2, y2)
{
	//x1, y1 = x and y coordinates of object 1
	//w1, h1 = width and height of object 1
	//x2, y2 = x and y coordinates of object 2 (usually midpt)
	if ((x1 <= x2 && x1+w1 >= x2) &&
		(y1 <= y2 && y1+h1 >= y2))
			return true;
	else
		return false;
}
	
