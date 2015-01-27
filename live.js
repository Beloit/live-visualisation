var com = require("serialport");
var app = require('express')();
var http = require('http').Server(app);

var serialPort = new com.SerialPort("/dev/tty.usbmodem1a12121", {
    baudrate: 115200,
    parser: com.parsers.readline('\r\n')
  });

var live_data;
var count = 0;

serialPort.on('open',function() {
  console.log('Port open');
});

serialPort.on('data', function(data) {
  try {
    live_data = JSON.parse(data);
    console.log(live_data);
    count++;
  }
  catch (e) {
    console.error("Parsing error:", e); 
  } 
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', function(req, res){
  res.json(live_data);
});

app.listen(4000, function(){
  console.log('listening on *:4000');
});