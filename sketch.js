

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0, bananaScore=0;
var ground,groudimage;
var PLAY=1;
var END=0;
var gamestate=1;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
  
}

  


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  FruitsGroup=new Group();
obstacleGroup=new Group();
  
  monkey = createSprite(50,height-250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(width-70,280, 800, 10);
  ground.velocityX = -4;
}

function draw() {  
 background("skyblue");
  fill("black");
  text("SURVIVAL TIME: "+score, 270, 20);
  text("BANANAS COLLECTED: "+bananaScore,100,20);
  
  if(gamestate===PLAY){
    
 Fruits();    
 obstacle(); 

score = score + Math.round(getFrameRate()/60);    
ground.velocityX = -(4+score*1.5/100);   
if(touches.length>0||keyDown("space")&&monkey.y>=235){
monkey.velocityY = -13;   
 touches=[];
}    
monkey.velocityY = monkey.velocityY + 0.8

if (ground.x < 0){
 ground.x = ground.width/2;   
    }    
if(monkey.isTouching(FruitsGroup)) { 
 bananaScore=bananaScore+1; 
  FruitsGroup.destroyEach();
   }  
 if (monkey.isTouching(obstacleGroup)){
      gamestate = END;
    }
  
  
  
  }  
  
   if (gamestate === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.1;
   
    
    obstacleGroup.setVelocityXEach(0);
    FruitsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FruitsGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 100, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 100, 200);
    
    if (keyDown("r")){
      FruitsGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gamestate = PLAY; 
    }
  }
   monkey.collide(ground); 
  drawSprites();
}

function Fruits(){
if(frameCount % 80===0){
banana=createSprite(400,350,40,40); 
banana.addImage(bananaImage);
banana.y=Math.round(random(120,200))
banana.scale=0.1;
banana.velocityX=-4;
banana.lifetime=200;
FruitsGroup.add(banana);
  }
}
 
function obstacle(){
if(frameCount%300===0){
obstacles=createSprite(250,256,10,10);
obstacles.addImage(obstacleImage);
obstacles.velocityX = -3;
obstacles.lifetime = 200;
obstacles.scale = 0.1 ;
obstacleGroup.add(obstacles);
  }  
}

