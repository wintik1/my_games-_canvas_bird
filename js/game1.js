/* Sass Document */
//создание canvas
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



//Создание объектов- рисунков

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();


//Записывание рисунков в объекты

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

//Позиция птички
xPos = 50;
yPos = 250;


//РАсстояние между колоннами для пролета
var gap = 100;
   //Сдвигает птичку
 document.addEventListener("keydown", function(evt) {
		
		if(evt.keyCode == 38 ) {
		 yPos -=  10;	
		}
	    if(evt.keyCode == 40) {
		   yPos +=10;
	   }
	 	if(evt.keyCode == 39) {
		 xPos += 10;
	 }
	 	if(evt.keyCode == 37) {
			xPos -= 10;
		}
	 
	});


//Координаты новых блоков

var pipe = [];
 
pipe[0] = {
	 x : cvs.width,
	 y : 0
 }

function draw() {
	//Рисует задний фон
	ctx.drawImage(bg, 0, 0);
		
	
	//Рисует птичку
	ctx.drawImage(bird, xPos, yPos);
	
	for(var i = 0; i < pipe.length; i++){
	  
		//Рисует блоки
	ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
	ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		pipe[i].x--;
		
		if(pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
			console.log(pipeUp);
		}
	}
	
	
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	
	requestAnimationFrame(draw);
}


pipeBottom.onload = draw;