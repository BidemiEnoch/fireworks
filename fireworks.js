Trail = FireWorks.Trail;
Scene = FireWorks.Scene;
Engine = FireWorks.Engine;
Rand = FireWorks.Rand;
Gravity = FireWorks.Gravity;

w = screen.width;
h = screen.height * 0.78;

window.onload = function() {

   touch = []

   hex="0123456789abcdef";
   //You can manipulate this value set the gravity
   Gravity.y = 3;
   Gravity.x = 0;

   //eventListeners
   var add = window.addEventListener;
   add("touchstart", touchstart);
   add("touchmove", touchmove);
   add("touchend", touchend);

   //creating canvas
   Scene.initCanvas(w, h, "black");
   //width,height,color
   var trail = Trail([150, 100], [150, 300]);
   //trail will go from[x,y],to[x,y]

   //adding trail to current scene
   Scene.insert(trail);

   //updating the engine
   Engine.run();
   setInterval(randFire,2000);
}


function touchstart(e) {
for(var i=0;i<e.touches.length;i++){
touch.push([])
   touch[i][0] = e.touches[i].pageX;
   touch[i][1] = e.touches[i].pageY;
  
   }
}

function touchmove(e) {
for(var i=0;i<touch.length;i++){
if(i==e.touches.length){
touch.splice(i,1);
break;
}
   touch[i][2] = e.touches[i].pageX;
   touch[i][3] = e.touches[i].pageY;
  
   }
}

function touchend() {
for(var i in touch){
var color="#";
for(var j=0;j<3;j++){
color+=hex[Rand(0,hex.length)];
}

   trail = new Trail(
[touch[i][0], touch[i][1]], 
[touch[i][2], touch[i][3]], {
         //how many explosion stages each firework carries
         stages: Rand(1, 2),
         //explosion color
         color:color,
         //number of children after exoplosion
         nodes: Rand(10, 12),
         //how fast your trail is
         velocity: Rand(3,4),
         //how dense your trail is
         trailDensity: Rand(3,6),
         radius:30
      }
   );
   Scene.insert(trail);
   }
  touch=[];
}

function randFire(){
var color="#";
for(var j=0;j<3;j++){
color+=hex[Rand(0,hex.length)];
}  
   trail = new Trail(
[Rand(0,w*0.8), Rand(h*0.8,h)], 
[Rand(40,w*0.7), Rand(h/2,h*0.1)], {
         //how many explosion stages each firework carries
         stages: Rand(1, 2),
         //explosion color
         color:color,
         //number of children after exoplosion
         nodes: Rand(10, 12),
         //how fast your trail is
         velocity: Rand(3,4),
         //how dense your trail is
         trailDensity: Rand(3,6),
         radius:30
      }
   );
   Scene.insert(trail);
}