var tower,tower_image;

var score;

var ghost_jumping,ghost_standing;

var ghost,ghost_Image,ghost_Jumping;

var door_Image;
 
var climber_Image;

var door_Group,climber_Group,invisible_block_Group;
  
var gameState="STAND";

function preload(){
  tower_image = loadImage("tower.png");
  
  ghost_Image = loadImage("ghost-standing.png");
  ghost_Jumping = loadImage("ghost-jumping.png");

  door_Image = loadImage("door.png");

  climber_Image = loadImage("climber.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,60,150);
  tower.addImage(tower_image); 
  tower.velocityY=4;
  
  score=0;
  
  ghost = createSprite(300,300,100,150);
  ghost.addImage("walking",ghost_Image);
  ghost.scale=0.6;
  
  door_Group=new Group;
  climber_Group=new Group;
  invisible_block_group = new Group;
}

function draw(){
  background ("black");
  
  if(keyDown("s")&& gameState==="STAND"){
    gameState="PLAY"
  }
  
  if(gameState==="PLAY"){
  
  if (tower.y>600){
    tower.y=300;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-3;
  }

    ghost.velocityY=ghost.velocityY+0.3;

  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown(RIGHT_ARROW)){  
    ghost.x=ghost.x+3;
  }
  
  if(ghost.isTouching(climber_Group)){
    ghost.velocityY=0; 
  }
  
  score = score+ Math.round (frameCount/100)
    
  if (invisible_block_group.isTouching(ghost)||ghost.y>600){
    gameState="END";
  }  
    
    
  }
  else if(gameState==="END"){
    
        
    tower.velocityY=0;
    
    ghost.velocityY=ghost.velocityY+0.3;
    
    door_Group.destroyEach();
    climber_Group.destroyEach();
    invisible_block_group.destroyEach();
       
    textSize (30); 
    fill("red");
    text ("GAME OVER",200,300);
    tower.destroy();
   
  }
  
  
  textSize(20);
  fill("yellow");
  text("SCORE:"+ score,300,50);
  
  drawSprites();
  
  
  
}

function door(){
  if(frameCount % 100===0){
    var door = createSprite(round(random(100,500)),0,50,10);
    door.velocityY=2;
    door.addImage(door_Image);
    door_Group.add(door);
    ghost.depth=door.depth;
    ghost.depth++;
    
    var climber = createSprite(door.x,door.y+50,20,30);
    climber.velocityY=2;
    climber.addImage(climber_Image);
    climber_Group.add(climber);
    ghost.depth=climber.depth;
    ghost.depth++;
     
    var invisible_block = createSprite(climber.x,climber.y+20,50,3);
    invisible_block.velocityY=2; 
    invisible_block_group.add(invisible_block);
    
  }
}
