var Leap = require('leapjs');
var sphero = require('sphero');
var bb8 = sphero("dfcccf25784a41c7a1e5dc765d43d8ed");

var controller = new Leap.Controller({frameEventName:'deviceFrame',enableGestures: true});
bb8.connect(function () {
  console.log("BB8 connected");
  bb8.color("blue");
});

controller.on('ready', function() {
    console.log("ready");
});
controller.on('connect', function() {
    console.log("connect");
});
controller.on('disconnect', function() {
    console.log("disconnect");
});
controller.on('focus', function() {
    console.log("focus");
});
controller.on('blur', function() {
    console.log("blur");
});
controller.on('deviceStreaming', function() {
    console.log("deviceConnected");
});
controller.on('deviceStopped', function() {
    console.log("deviceDisconnected");
});

controller.connect();
console.log("\nWaiting for device to connect...");
var speed = 90;
controller.on('frame', function(frame) {

  if(frame.hands[0]){
    console.log(frame.hands[0]._translation);
    var prevFrame = controller.frame(1);
    var gesture = frame.hands[0]._translation;
    var instruction;

    if(gesture[0] > 4){
      instruction = 'turnRight'
    } else if(gesture[0] < -4){
      instruction = 'turnLeft'
    }
    if(gesture[1] > 4){
      speed +=10
    } else if(gesture[1] < -4){
      speed -=10
    }
    if(gesture[2] > 4){
      instruction = 'moveBackwards'
    } else if(gesture[2] < -4){
      instruction = 'moveForwards'
    }

    switch( instruction ){

      case "moveForwards":
        console.log('Moving forwards');
        bb8.color("green");
        bb8.roll(speed,0);
        break;

      case "moveBackwards":
        console.log('Moving backwards');
        bb8.color("green");
        bb8.roll(speed,180);
        break;

      case "turnLeft":
        console.log('Turning left');
        bb8.color("green");
        bb8.roll(speed,270);
        break;

      case "turnRight":
        console.log('Turning right');
        bb8.color("green");
        bb8.roll(speed,90);
        break;

      case "stop":
        console.log("Stopping");
        bb8.color("red");
        bb8.roll(0,0);
        break;
    }
  }
});
