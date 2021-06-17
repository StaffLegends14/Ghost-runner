var Toh,ghost,door,death,over;
var Tohinfinity,ghostrunner,door_img,deathline,blind,ded;
var gamestate = 1;
var doorG,deathG,blingG;
var oof;

function preload(){
  Tohinfinity = loadImage("tower.png");
  ghostrunner = loadImage("ghost-jumping.png");
  door_img = loadImage("door.png");
  deathline = loadImage("climber.png");
  ded = loadImage("lol.png");
  oof = loadSound("death.mp3");
  }

function setup(){
createCanvas(windowWidth,windowHeight);

//create sprite
Toh = createSprite(width/2,height/2,width,height);
ghost = createSprite(width/2,height/2);
ghost.setCollider("rectangle",0,0,100,150)
over = createSprite(width/2,height/2);

//add image
Toh.addImage(Tohinfinity);
Toh.scale = width/height + 1.5;
Toh.velocityY = 4;

ghost.addImage(ghostrunner);
ghost.velocityY = 5;

over.addImage(ded);
over.visible = false;

//group
doorG = new Group();
deathG = new Group();
blindG = new Group();

ghost.debug = true;
}

function draw(){
  //*plays*
  if(gamestate === 1 ){
  if(Toh.y > height + 500){
    Toh.y = height/2;
  }

  if(keyDown(LEFT_ARROW)){
   ghost.x = ghost.x - 5; 
  }

  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 5; 
   }

   if(keyDown("space")){
   ghost.velocityY = - 3;
   }
   
   doors();
            
   if(deathG.isTouching(ghost)){
     ghost.velocityY = 0;
   }

   //dies
   if(blindG.isTouching(ghost) || ghost.y > height){
     gamestate = 0;
     oof.play();
   }

   
   ghost.velocityY = ghost.velocityY + 0.5;
  }

  if(gamestate === 0){
  over.visible = true;
  ghost.velocityY = 0;
  doorG.destroyEach();
  blindG.destroyEach();
  deathG.destroyEach();
  Toh.velocityY = 0;
  }
  
drawSprites();
}

function doors(){
  if(frameCount % 200 === 0){
    door = createSprite(random(0 + 100,width - 100),0);
    door.addImage(door_img);
    door.scale = 4;
    door.velocityY = 4;
    door.lifetime = height/4;
    ghost.depth = door.depth;
    ghost.depth += 1;
    death = createSprite(door.x,door.y + 250);
    death.velocityY = 4;
    death.addImage(deathline);
    death.scale = 2.5;
    death.lifetime = height/4;
    blind = createSprite(death.x,death.y + 10,door.width + 150,1);
    blind.velocityY = 4;
    //blind.visible = false;
    blind.debug = true;
    blind.lifetime = height/4;
    doorG.add(door);
    deathG.add(death);
    blindG.add(blind);
  }
  
}