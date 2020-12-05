const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Body = Matter.Body;
const Bodies = Matter.Bodies;

var engine,world;
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var particle;
var score = 0;
var scoreArray = [500,100,300];
var turn = 0;
var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,790,width,20);

  for(var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 30; j <=width-30; j=j+50){ 
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 30; j <=width-30; j=j+50) {
    plinkos.push(new Plinko(j,375));
  }

  // for(var i=1;i<=11;i++){
  //   num = random(1,11);
  //   scoreArray.push(num*50);
  // }

  particles.push(new Particle(100,100,20))
}
 
function draw() {
  background("black");
  Engine.update(engine);

  textSize(20);
  text(mouseX+" , "+mouseY,10,450);
  text("Score: "+score,20,30);

  // for(var i=1;i<=11;i++){
  //   text(scoreArray[i])
  // }

  // for(var x=0;x<800;x++){
  //   if(particle.position.x === x && particle.position.y>370){
  //     if(x>0 && x<100){
  //       score = score+scoreArray[0];
  //     }
  //     if(x>0 && x<100){
  //       score = score+scoreArray[0];
  //     }
  //   }
  // }

  // for(var i=0;i<particles.length && particles.length>0;i++){
  //   if(particles[i].position.x>0 && particles[i].position.x<270){
  //     score = score+scoreArray[0]
  //   }
  // }

  for(var i=20;i<=300;i=i+80){
    text("500",i,520);
  }
  for(var i=340;i<=540;i=i+80){
    text("100",i,520);
  }
  for(var i=585;i<=770;i=i+80){
    text("300",i,520);
  }

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  // if(frameCount%60===0){
  //   particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
  //   score++;
  // }
  // for (var j = 0; j < particles.length; j++) { 
  //   particles[j].display();
  // }

  for (var k = 0; k < divisions.length; k++) {   
    divisions[k].display();
  }
  ground.display();

  if(particle != null){
    particle.display();
    if(particle.body.position.y>760){
      if(particle.body.position.x>0 && particle.body.position.x<315){
        score = score+500;
      }
      if(particle.body.position.x>320 && particle.body.position.x<550){
        score = score+100;
      }
      if(particle.body.position.x>555 && particle.body.position.x<800){
        score = score+300;
      }
      if(turn>4){
        turn++;
      }
      particle = null; 
    }
  }
  console.log(turn);

  // if(particle.body.speed<=0){
  //   mousePressed();
  // }

  if(turn>5){
    gameState = "end";
    particle = null;
    push();
    textSize(70);
    textStyle(BOLD);
    fill("red");
    text("GAME OVER",180,350);
    pop();
  }
}

function mousePressed(){
  if(gameState === "play"){
    if(turn<=4){
      turn++;
    }
    particle = new Particle(mouseX,10,10,10);
  }
}