

var dog, happyDog, database, foodS, foodStock;
var addFood,feed;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage ("images/dogImg1.png");
 
}



function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite (200,200,10,10);
  dog.addImage(dogImg)
  dog.scale = 0.3

  foodObj = new Food();

  feed = createButton ("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  
  fedTime = database.ref ('FeedTime');
  fedTime.on ("value", function(data){
    lastFed = data.val();
  });

  textSize(20);
  fill("white");
  text ("Food Left", foodS, 200,100);

  fill (255,255,254);
  textSize (15)
  if (lastFed >= 12) {
      text ("Last Feed: " + lastFed%12 + " PM", 350,30 );
  }
  else if (lastFed == 0){
      text ("Last Feed: 12 AM", 350, 30)
  }
  else{
      text ("Last Feed: " + lastFed + " AM", 350, 30)
  }

  foodObj.display();
  drawSprites();
  //add styles here
  
}

/*function writeStock(x){
  if (x<=0){
    x = 0
  }
  else {
    x = x-1;
  }
  

  database.ref ('/').update({
    Food:x
  })
}
*/

function readStock (data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


