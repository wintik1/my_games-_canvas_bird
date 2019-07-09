var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var bird = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image(); // Создание объекта
var pipeUp = new Image(); // Создание объекта
var pipeBottom = new Image(); // Создание объекта



//Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

bird.src = "img/bird.png"; // Указание нужного изображения
bg.src = "img/bg.png"; // Аналогично
fg.src = "img/fg.png"; // Аналогично
pipeUp.src = "img/pipeUp.png"; // Аналогично
pipeBottom.src = "img/pipeBottom.png"; // Аналогично

 var gap = 90;

var score = 0;
//Позиция птички

var xPos = 10;
var yPos = 150;
var grav =1.5;


//создание блоков

var pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}




//При нажатии на кнопку

document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);

function moveUp() {
	yPos -=25;
	fly.play();
}

function draw() {
	ctx.drawImage(bg, 0, 0);


	for(i = 0; i < pipe.length; i++){
	
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y); //Блок сверху
	
	ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap); //Блок снизу
		
		pipe[i].x--;
		
		
	if (pipe[i].x == 50) {
		
		pipe.push({
			x : cvs.width,
			y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
		});
	}	
		
		
		
	if (xPos + bird.width >= pipe[i].x 
		&& xPos <= pipe[i].x + pipeUp.width 
		&& (yPos <= pipe[i].y + pipeUp.height 
		|| yPos + bird.height >= pipe[i].y + pipeUp.height + 
			gap) || yPos + bird.height >= cvs.height - fg.height) {
		location.reload(); //Перезапуск странички
	}
		
	if(pipe[i].x == 5)	{
		score++;
		score_audio.play();
	}
		
	}
	
	
	

	ctx.drawImage(fg, 0, cvs.height - fg.height); //передний фон
	
	ctx.drawImage(bird, xPos, yPos);
	
	yPos += grav;
	
	ctx.fillStyle = "#00";// цвет текста
	ctx.font = "24px Verdana"; //размер и имя шрифта
	ctx.fillText("Счёт: " +score, 10, cvs.height - 20);
	
	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;