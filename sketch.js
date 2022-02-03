var PLAY = 1;
var END = 0;
var gameState = PLAY;

var r1, j1, c1;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg;
var jumpSound , checkPointSound, dieSound;




function preload(){
 r1 = loadAnimation("run-1.png", "run-2.png", "run-3.png", "run-4.png", "run-5.png", "run-6.png", "run-7.png", "run-8.png", "run-9.png", "run-10.png", "run-11.png", "run-12.png", "run-13.png", "run-14.png", "run-15.png", "run-16.png", "run-17.png", "run-18.png", "run-19.png");
 j1 = loadAnimation("j-1.png", "j-2.png", "j-3.png", "j-4.png", "j-5.png", "j-6.png", "j-7.png", "j-8.png", "j-9.png", "j-10.png", "j-11.png", "j-12.png", "j-13.png", "j-14.png", "j-15.png", "j-16.png");
 c1 = loadImage("collision.png");

groundImage = loadImage("ground2.png");
  
cloudImage = loadImage("cloud.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");

restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")

jumpSound = loadSound("jump.mp3")
dieSound = loadSound("die.mp3")
checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {

    createCanvas(1600,600)

foxBunny = createSprite(50,160,20,50);
foxBunny.addAnimation("foxBunnyRunning", r1);
foxBunny.addAnimation("foxBunnyCollided", c1);
foxBunny.addAnimation("foxBunnyJumping", j1)


foxBunny.scale = 0.5;

ground = createSprite(200,550,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;

gameOver = createSprite(600,100);
gameOver.addImage(gameOverImg);

restart = createSprite(600,300);
restart.addImage(restartImg);


gameOver.scale = 1;
restart.scale = 1;

invisibleGround = createSprite(200,550,400,10);
invisibleGround.visible = false;


obstaclesGroup = createGroup();
cloudsGroup = createGroup();


foxBunny.setCollider("rectangle",0,0,150,200);
foxBunny.debug = false

score = 0;

}

function draw() {

background(180);


//text("Score: "+ score, 1400,100);


if(gameState === PLAY){

  gameOver.visible = false;
  restart.visible = false;
  
  ground.velocityX = -(4 + 3* score/100)
  
  score = score + Math.round(getFrameRate()/60);
  
  /*if(score>0 && score%100 === 0){
     checkPointSound.play() 
  }*/
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  if(keyDown("space")&& foxBunny.y >= 400 ) {
      foxBunny.velocityY = -12;
      jumpSound.play();
      foxBunny.changeAnimation("foxBunnyJumping", j1);
      
      }else{

        setTimeout(() => {
            foxBunny.changeAnimation("foxBunnyRunning", r1)
        } ,4000 )
      }
  
  
  
  foxBunny.velocityY = foxBunny.velocityY + 0.8

  
  spawnClouds();

  
  spawnObstacles();
  
  if(obstaclesGroup.isTouching(foxBunny)){
      
      jumpSound.play();
      gameState = END;
      dieSound.play()
    
  }
}
 else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
  
    foxBunny.changeAnimation("foxBunnyCollided", c1);
  
   
   
    ground.velocityX = 0;
    foxBunny.velocityY = 0
    
   
    
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
   
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);    

   if(mousePressedOver(restart)) {
    reset();
  }
 }


foxBunny.collide(invisibleGround);




drawSprites();
}


function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
score = 0;
foxBunny.changeAnimation("foxBunnyRunning", r1);

}




function spawnObstacles(){
if (frameCount % 60 === 0){
 var obstacle = createSprite(600,535,10,40);
 obstacle.velocityX = -(6 + score/100);
 
 
  var rand = Math.round(random(1,6));
  switch(rand) {
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
    case 4: obstacle.addImage(obstacle4);
            break;
    case 5: obstacle.addImage(obstacle5);
            break;
    case 6: obstacle.addImage(obstacle6);
            break;
    default: break;
  }
 
        
  obstacle.scale = 0.5;
  obstacle.lifetime = 300;
 

  obstaclesGroup.add(obstacle);
}
}

function spawnClouds() {

if (frameCount % 60 === 0) {
  var cloud = createSprite(600,320,40,10);
  cloud.y = Math.round(random(80,120));
  cloud.addImage(cloudImage);
  cloud.scale = 1;
  cloud.velocityX = -3;
  
  
  cloud.lifetime = 200;
  
  cloud.depth = foxBunny.depth;
  foxBunny.depth = foxBunny.depth + 1;
  

  cloudsGroup.add(cloud);
}
}
