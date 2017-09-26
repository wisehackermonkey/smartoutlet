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


//by helper library for print() and others!
require('wise-helper');

