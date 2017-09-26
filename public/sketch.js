/*
	Oran C
	Oranbusiness@gmail.com
	2017-09-25
	light switch remote outlet controller javascript
*/

var socket;

var SERVER_URL = window.location.origin;

var buttons = {
	number: null,
	state: null
};

var btn1on,
	btn2on,
	btn3on,
	btn4on,
	btn5on;
	
var btn1off,
	btn2off,
	btn3off,
	btn4off,
	btn5off;

var btnStates = {
	btn1on:false,
	btn2on:false,
	btn3on:false,
	btn4on:false,
	btn5on:false,
	btn1off:false,
	btn2off:false,
	btn3off:false,
	btn4off:false,
	btn5off:false
};

var textMidOne = "1";
var textMidTwo = "2";
var textMidThree = "3";
var textMidFour = "4";
var textMidFive = "5";

var rightSpacing = 20;
var leftSpacing = 20;

var vertSpaceing = 20;

var on  = [null, null, null, null, null];
var off = [null, null, null, null, null];

function pressButton(buttonNum, state){
	if(buttonNum >= 1 && buttonNum <= 5){
		if(state === 1 || state === 0)
		{
			print(`Pressed Button#${buttonNum}, ${(state === 1)? "On" : "OFF"}`);

			buttons.number = buttonNum;
			buttons.state = state;

			socket.emit('buttonPress', buttons);
		}else{
			print("ERROR: pressButton() button state is not 1 or 0 !");
		}
	}else{
		print("ERROR: pressButton() Button # is out of range!");
	}
}

var buttonOn = [
	function(){pressButton(1, 1); image(lightOn, 0,0/*lightOn.height/4*/,lightOn.height/4, lightOn.width/4);},
	function(){pressButton(2, 1); image(lightOn, 0,lightOn.height/4,lightOn.height/4, lightOn.width/4);},
	function(){pressButton(3, 1); image(lightOn, 0,lightOn.height/4* 2,lightOn.height/4, lightOn.width/4);},
	function(){pressButton(4, 1); image(lightOn, 0,lightOn.height/4* 3,lightOn.height/4, lightOn.width/4);},
	function(){pressButton(5, 1); image(lightOn, 0,lightOn.height/4* 4,lightOn.height/4, lightOn.width/4);},
	];


var buttonOff = [
	function(){pressButton(1, 0); image(lightOff, 0,0                ,   lightOff.height/4, lightOff.width/4);},
	function(){pressButton(2, 0); image(lightOff, 0,lightOff.height/4,   lightOff.height/4, lightOff.width/4);},
	function(){pressButton(3, 0); image(lightOff, 0,lightOff.height/4* 2,lightOff.height/4, lightOff.width/4);},
	function(){pressButton(4, 0); image(lightOff, 0,lightOff.height/4* 3,lightOff.height/4, lightOff.width/4);},
	function(){pressButton(5, 0); image(lightOff, 0,lightOff.height/4* 4,lightOff.height/4, lightOff.width/4);},
	];

function setup() {

	createCanvas(window.innerWidth, window.innerHeight);
	background(50);

	socket = io.connect(SERVER_URL);

	socket.on('connected', function(data){
			alert(data);
		}
	);

	lightOn = loadImage("./lighton.jpg");
	lightOff = loadImage("./lightoff.jpg");
	
	
	
	for(var i in on){
		on[i] = createButton("ON");
		on[i].position(width / 2 - leftSpacing, (vertSpaceing) * i );
		on[i].mousePressed(buttonOn[i]);
	}

	for(var j in off){
		on[j] = createButton("OFF");
		on[j].position(width / 2 + rightSpacing, (vertSpaceing) * j );
		on[j].mousePressed(buttonOff[j]);
	}	 
}

function draw() 
{
}