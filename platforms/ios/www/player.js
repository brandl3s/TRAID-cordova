//if this file is linked properly, then the console will print out "app.js ready to share documentaries"
console.log("player.js ready to load the video page");

 var timeout;

document.getElementById('player').addEventListener('ended',function(){
     window.location.href = "../reaction/index.html";
 },false);


 // -- Screen Saver Timer --

 var goHome = function() {
     location.href = '../index.html';
     clearTimeout(timeout);
 }

 var clear = function() {
   if (timeout) {
     clearTimeout(timeout);
     timeout = null;
     setTimer();
   }
 };

 var setTimer = function() {
   timeout = setTimeout(goHome, 100000);
 };

 document.addEventListener('keypress', clear);
 document.addEventListener('touch', clear);
 setTimer();
