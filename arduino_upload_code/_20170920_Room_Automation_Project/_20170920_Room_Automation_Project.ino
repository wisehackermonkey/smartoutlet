// Remote Outlet Switch Automation using Arduino Uno
// by oran c
// 2017-09-20
// oranbusiness@gmail.com
// This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// for more info https://creativecommons.org/licenses/by-nc-sa/4.0/
// TODO p5.js serial communication
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-output-from-p5-js/
// Arduino| remote
// pin | pin
// 11=1 - btn 3
// 10=2 - btn 3
// 9=3 - btn 2
// 8=4 - btn 2
// 7=5 - btn 1
// 6=6 - btn 1
// 5=7 - btn 5
// 4=8 - btn 5
// 3=9 - btn 4
// 2=10 - btn 4
// gnd = gnd
// +5v=+5v
// pin mapping
/*
max speed testing
let 1 = 1 miliscond ei 1000 milisecond = 1 second
1
10
50
65
70
71
72
73
74 x
75 t - unstable
80 t - unstable
90 t - mosty stable
100 t - slitly unstable
200
300 t
500 t - stable
1000 t - slow
*/
int MAXSPEED = 90;
int LEDPIN = 13;
int NUMPINS = 8,
ONBTTN1 = 7,
OFFBTN1 = 6,
ONBTTN2 = 8,
OFFBTN2 = 9,
ONBTTN3 = 11,
OFFBTN3 = 10,
ONBTTN4 = 2,
OFFBTN4 = 3,
ONBTTN5 = 5,
OFFBTN5 = 4;
String inString = "";
int BTNONNARR[5] =
{
	ONBTTN1,
	ONBTTN2,
	ONBTTN3,
	ONBTTN4,
	ONBTTN5
};

int BTNOFFARR[5] =
{
	OFFBTN1,
	OFFBTN2,
	OFFBTN3,
	OFFBTN4,
	OFFBTN5
};

void on(int pinNum)
{
	digitalWrite(pinNum, HIGH);
}

void off(int pinNum)
{
	digitalWrite(pinNum, LOW);
}

int getPinNum(int buttonNumber, String state)
{
	if (buttonNumber >= 1 && buttonNumber <= 5)
	{
		buttonNumber = buttonNumber - 1;
		if (state == "ON")
		{
			return BTNONNARR[buttonNumber];
		}
		else
			if (state == "OFF")
			{
				return BTNOFFARR[buttonNumber];
			}
		else
		{
			Serial.println("getPinNum() Neither 1(HIGH) or 0 (LOW)!");
		}
		Serial.print("getPinNum() buttonNumber: ");
		Serial.print(buttonNumber);
		Serial.print(", state: ");
		Serial.println(state);
	}
	else
	{
		Serial.println("getPinNum() # out of range");
	}
}

void blinkPattern(int btnNum){
		int pause = 500;
		for(int i=0; i<=btnNum -1; i++){
		    digitalWrite(LEDPIN, HIGH);
			delay(pause);

			digitalWrite(LEDPIN, LOW);
			delay(pause);
		}
		

}
void btnOn(int btnNum, int DELAY)
{
	int onPin = getPinNum(btnNum, "ON");
	int offPin = getPinNum(btnNum, "OFF");
	if (DELAY >= MAXSPEED)
	{
		digitalWrite(onPin, HIGH);
		delay(DELAY);
		digitalWrite(onPin, LOW);
		digitalWrite(offPin, LOW);

		blinkPattern(btnNum);
	}
	else
	{
		Serial.println("ERROR btnOn() DELAY to fast DELAY >= " + String(MAXSPEED));
	}
}

void btnOff(int btnNum, int DELAY)
{
	int onPin = getPinNum(btnNum, "ON");
	int offPin = getPinNum(btnNum, "OFF");
	if (DELAY >= MAXSPEED)
	{
		digitalWrite(offPin, HIGH);
		delay(DELAY);
		digitalWrite(onPin, LOW);
		digitalWrite(offPin, LOW);

		blinkPattern(btnNum);

	}
	else
	{
		Serial.println("ERROR btnOff() DELAY to fast DELAY >= " + String(MAXSPEED));
	}
}

void button(int btnNum, int state, int DELAY)
{
	if (state == 1)
	{
		btnOn(btnNum, DELAY);
		Serial.println("Switch #" + char(btnNum) + ": ON");
	}
	else
		if (state == 0)
		{
			Serial.println("Switch #" + char(btnNum) + ": OFF");
			btnOff(btnNum, DELAY);
		}
	else
	{
		Serial.println("button() incorrect STATE ether 0 or 1");
	}
}

void setup()
{
	// set pinmode output
	pinMode(ONBTTN1, OUTPUT);
	pinMode(OFFBTN1, OUTPUT);
	pinMode(ONBTTN2, OUTPUT);
	pinMode(OFFBTN2, OUTPUT);
	pinMode(ONBTTN3, OUTPUT);
	pinMode(OFFBTN3, OUTPUT);
	pinMode(ONBTTN4, OUTPUT);
	pinMode(OFFBTN4, OUTPUT);
	pinMode(ONBTTN5, OUTPUT);
	pinMode(OFFBTN5, OUTPUT);
	pinMode(LEDPIN, OUTPUT);

	Serial.begin(9600);
	Serial.println("wating for serial.....");
	while (!Serial)
	{
		; // wait for serial port to connect. Needed for native USB port only
	}
	Serial.println("Serial Found!");
	Serial.println("Enter Button # (1-5) to turn on.\nTo turn on switch #1\nEXAMPLE| ON : 3,1 | OFF : 3,0 |");
}

void loop()
{
	/*
	wait for serial
	setup user input
	parse buttonNumber, state
	3,1
	or
	3,0
	or
	1,1
	or
	1,0
	for button number#
	set button on if 1
	else
	off if 0*/
	// https://stackoverflow.com/questions/11068450/arduino-c-language-parsing-string-with-delimiter-input-through-serial-interfa#14306981
	while (Serial.available() > 0)
	{
		int inChar = Serial.read();
		inString += (char) inChar;
		if (inChar == '\n')
		{
			int commaIndex = inString.indexOf(',');
			String rawBtnNumber = inString.substring(0, commaIndex);
			String rawBtnState = inString.substring(commaIndex + 1, inString.length());
			int btnNumber = rawBtnNumber.toInt();
			int btnState = rawBtnState.toInt();
			Serial.print("btnNumber: %" + String(btnNumber + 99) + "%, btnState: %" + String(btnState) + "%\n");
			button(btnNumber, btnState, 500);
			inString = "";
		}
	}
}
