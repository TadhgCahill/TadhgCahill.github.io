//define elements
var hook = document.getElementById("hook");

//define initial positions
var x = 300;

//intervals
var downExists = false;
var up;
var down;
let fired = false;
var checkCaught;
var fishY;
var bootY;
var timeVar = 10000;
var speed = 20;
var hasStarted = false;

var score = 0;//current score of game
//must write scorebard saved to a text doc
startDiv();
function reel(){ //animation of hook going up
	document.getElementById('fisherman').src= "fisherman2.png";
	//change animation of hook to going up
	clearInterval(start);
	if(downExists)
		clearInterval(down);
	up = setInterval(function(){ hook.style.top = x + "px"; x--; },
            20); // 20ms = 50 frames per second
}

function slack(){ //animation of hook going down
	document.getElementById('fisherman').src= "fisherman1.png";
	
	clearInterval(up);
	downExists = true;
	down = setInterval(function(){ hook.style.top = x + "px"; x++; },
            20); // 20ms = 50 frames per second
}

//automatically starts animation of hook going down
const start = setInterval(function(){ hook.style.top = x + "px"; x++; },
            20); // 20ms = 50 frames per second

function bootOrFish(){
	var randomNum = Math.floor(Math.random() * 2); //random boolean generator
	if(randomNum)
		Boot();
	else
		Fish();
}
			
function Fish(){
	//make fish
	var fishStart = 100;
	speed-= 1;
	const fishElement = document.createElement("img");
	fishElement.id = "fish";
	fishElement.src = "./images/fish.gif";
	document.body.append(fishElement);

	var fish = fishElement;
	
	// fish comes from a random part of screen
	fishY = Math.floor(Math.random() * 476) + 172 + "px"; //numbers are right
	
	fish.style.top = fishY;
	
	//collision detection
	fishLeft = setInterval(function(){ 
	fish.style.right = fishStart + "px"; 
	fishStart++; }, speed); // 20ms = 50 frames per second
	
	checkCaught = setInterval(function(){ 
		var HookXY = hook.getBoundingClientRect();
		var fishXY = fish.getBoundingClientRect();
		
		if(Math.trunc(HookXY.left) == Math.trunc(fishXY.left) && 
		   Math.trunc(HookXY.bottom) >= Math.trunc(fishXY.top) && 
		   Math.trunc(HookXY.top) <= Math.trunc(fishXY.bottom)){
			fishCaught();
			clearInterval(checkCaught);
		}
		
	}, 20);
}

function fishCaught(){
	score++;
	//play sound effect (probably pop)

	//remove that instance of fish
	fish.remove();
}

function Boot(){
	//make boot
	var fishStart = 100;
	speed-= 1;
	const bootElement = document.createElement("img");
	bootElement.id = "boot";
	bootElement.src = "boot.png";
	document.body.append(bootElement);

	var boot = bootElement;

	// boot comes from a random part of screen
	bootY = Math.floor(Math.random() * 476) + 172 + "px"; //numbers are right
	
	boot.style.top = bootY;
	
	bootLeft = setInterval(function(){ boot.style.right = fishStart + "px"; 
	fishStart++; }, speed); // 20ms = 50 frames per second
	
	checkCaught = setInterval(function(){ 
		var HookXY = hook.getBoundingClientRect();
		var bootXY = boot.getBoundingClientRect();
		
		if(Math.trunc(HookXY.left) == Math.trunc(bootXY.left) && 
		   Math.trunc(HookXY.bottom) >= Math.trunc(bootXY.top) && 
		   Math.trunc(HookXY.top) <= Math.trunc(bootXY.bottom)){
			lose();
			clearInterval(checkCaught);
		}
		
	}, 20);
}

function temp(){
	location.reload();
}

function lose(){
	//add user to score board
	//display score board
	hook.remove();
	const gameOver = document.createElement("div");

	//option to play new game
	const playAgain = document.createElement('button');
	playAgain.textContent = 'Play Again?';
	playAgain.addEventListener("click", function() { 
		location.reload(); 
	  }); 

	  //enter username
	  const name = document.createElement('input');
	  name.textContent = "enter name";
	  nameBtn = document.createElement('button');
	  nameBtn.textContent = 'enter';
	  nameBtn.addEventListener("click", function() { 
		console.log(name.value); //change to add to txt
	  }); 

	
	gameOver.appendChild(document.createTextNode("Game Over"));
	gameOver.appendChild(document.createElement('br'));

	gameOver.appendChild(document.createTextNode("Score: "));
	gameOver.appendChild(document.createTextNode(score));
	gameOver.appendChild(document.createElement('br'));

	//gameOver.appendChild(name);
	//gameOver.appendChild(nameBtn);
	//gameOver.appendChild(document.createElement('br'));

	gameOver.appendChild(playAgain);

	gameOver.style.backgroundColor = "white";
	gameOver.style.border = "thin solid black";
	gameOver.style.position = "fixed";
	gameOver.style.left = 800 + "px";//fix
	gameOver.style.top = 300 + "px";//fix
	document.body.appendChild(gameOver);
}

function startDiv(){
	const gameStart = document.createElement("div");
	gameStart.appendChild(document.createTextNode("catch some fish and dodge the boots!"));
	gameStart.appendChild(document.createElement('br'));

	gameStart.appendChild(document.createTextNode("press space to reel in the line"));
	gameStart.appendChild(document.createElement('br'));

	gameStart.style.backgroundColor = "white";
	gameStart.style.border = "thin solid black";
	gameStart.style.position = "fixed";
	gameStart.style.left = 800 + "px";//fix
	gameStart.style.top = 300 + "px";//fix

	document.body.appendChild(gameStart);
	document.addEventListener('keypress', tFunction);
	function tFunction(e){
		if(!hasStarted){
			hasStarted = true;
			if (e.key == " "){
				gameStart.remove();
	
				bootOrFish();
				var fishGame = setInterval(() => {bootOrFish();
					timeVar = timeVar - 50;
					
				}, timeVar);
				
				document.body.onkeydown = function(e) {
					if(!fired) {
						fired = true;
						if (e.key == " ") {
							reel();
						}
					}
				  
				}
				
				document.body.onkeyup = function(e) {
				  if (e.key == " ") {
					fired = false;
					slack();
				  }
				}
			}
							
		}
	}
		
	
}
