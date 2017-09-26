/*20170924_remote_outlet_switch_v2
by oran c
this program is to turn off and on a remote powerswitch i bought from china for $25 for a pack of 5 switches. this is the interface to turn them off and on with the arduino using nodejs to controll the buttons.

button layout
on 1 off 
on 2 off
on 3 off
on 4 off
on 5 off

for each switch the button has to be pressed on
then off to cicle states.

i soldered a transistor to each on and off button
to allow the arduino controll the buttons.*/



/*
Todo list
speed up arduino

retry unpluged serial port
https://stackoverflow.com/questions/18551293/node-js-serialport-events-stop-working-after-reconnecting-to-port

port to raspi  from arduino code to run on  so i dont
	use two devices
*/
//by helper library for print() and others!
require('wise-helper');



var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var SerialPort = require('serialport');


app.use(express.static('public'));

var serialPortName = process.argv[2];

var port = 80;



if(typeof serialPortName === "undefined")
{
	console.error("You need to specify the serial port serial port name when your");
	console.error("Example : node server.js <portname>");
	console.error("Example : node server.js COM3");
	console.error("Example : node server.js /dev/ttyACM0");
}





function connectSerialArduino(){
	var arduino = new SerialPort(serialPortName,{
			baudRate: 9600,
			parser: SerialPort.parsers.readline('\n\r')
		}
	);

	io.on('connection', function(socket)
		{
			print("Client Connected");
			socket.on("buttonPress", function(btn){
					if(btn)
					{

						//write button number & on off state
						//to serial port
						arduino.write(`${btn.number},${btn.state}\n`);
						print(`Data Sent: ${btn.number},${btn.state}`);
					}else{
						print("WARNING: buttonPress not getting data");
					}
				}
			);
		}
	);


	arduino.on('data',function (data) {
		print("Serial Port : Receiving Data - ",data);
	});
	arduino.on('close',function(){
		print("Serial Port : Closed.");
	});


	//TODO retry if serial port is closed or disconected
	arduino.on('error', function(error){
		console.error('Serial Port : ' + error);
		// arduino.close(reconnectArduino);
		// print("ARDUINO connected!");	
	});


}

/*var reconnectArduino = function () {
  console.log('Attempting Reconect to arduino');
  setTimeout(function(){
    console.log('RECONNECTING TO ARDUINO');
    connectSerialArduino();
  }, 2000);
};
*/
connectSerialArduino();


//start express webserver 
//on process port or normal port if already in use
server.listen(process.env.PORT || port);

print("remote outlet switch Server is Runninghttp://localhost:" + port);