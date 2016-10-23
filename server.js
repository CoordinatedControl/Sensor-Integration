var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var io2 = require('socket.io')(3002);

var txPower = -59;

io2.on('connection', function(socket) {

    console.log('Scanner Connected');

    socket.on('one',function(data){
	console.log("usonic distance");
    });
   
    socket.on("usonic", function(data){
	console.log("usonic distance: " + data.usonic);
    });
 
    socket.on("RSSI", function(data) {
	console.log("shit");
	/***	
	var rssi = data.rssi;
	if (rssi == 0){
		return -1.0;
	}
	
	var ratio = rssi*1.0/txPower;

	if( ratio < 1.0){
		var distance = Math.pow(ratio, 10);
		console.log("Distance: " + distance);
	}
	else{
		var distance = (0.89976)*Math.pow(ratio, 7.7095)+0.111;
		console.log("Distance: " + distance);
	}
	****/
    });

    socket.on('disconnect', function() {
        console.log('Scanner Disconnected');
    });
});

app.get('/', function(){
	console.log('hello');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
