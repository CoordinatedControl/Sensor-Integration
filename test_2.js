var Sonar = require('raspi-sonar').Sonar;
var sonarPin1 = new Sonar(29);

var noble = require('noble');
var io = require('socket.io-client');
var socket =io.connect('http://192.168.43.26:3002');
var address = '78a5048e1a0f';

//var RSSI_THRESHOLD = -90;
//var EXIT_GRACE_PERIOD = 2000;


socket.on('connect', function () {
	console.log('Connected to server successfully!');
	socket.emit('one', {name:"abc"});
});
var emitRssi =  function(){
	socket.emit("RSSI", {rssi: rssi});
};
sonarPin1.read(function(duration){
	var distaonce = 343.0*duration/1000000*0.5;
	console.log("reading data");
	socket.emit("usonic", {usonic:distance});
});

noble.on('stateChange', function(state) {
	if(state == 'poweredOn')
		noble.startScanning([], true);
	else
		noble.stopScanning();
});

noble.on('discover', function(peripheral){
  	if(peripheral.uuid == address){
    		console.log("UUID: " + peripheral.uuid + ", RSSI: " + peripheral.rssi);
//socket.emit("RSSI", {rssi: rssi});
		peripheral.updateRssi(function(error, rssi){
			console.log('RSSI: ' + peripheral.rssi + ', updated RSSI: ' + rssi);
			emitRssi.apply(this, []);
		});		
  	}
});
