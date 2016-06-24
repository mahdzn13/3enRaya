/*----- Google map -----*/
function initMap() {
  navigator.geolocation.getCurrentPosition(function(p){
    /* Deshabilitar preloader*/

    var lati = p.coords.latitude;
    var long = p.coords.longitude;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: lati, lng: long}
    });


    var info = new google.maps.InfoWindow({
      map : map,
      position: {lat: lati, lng:long},
      content: '<img src="resources/map.png">'
    });
  });
}
initMap();




/*----- First time cfg-----*/
if (localStorage.getItem("colorO") === null && localStorage.getItem("colorX") === null){
    localStorage.setItem("colorO","#e74c3c");
    localStorage.setItem("colorX","#3498db");
}
if (localStorage.getItem("isIA") === null){
    localStorage.setItem("isIA", false);
}
if (localStorage.getItem("p1Name") === null && localStorage.getItem("p2Name") === null){
    localStorage.setItem("p1Name","Aprendiz del 'Maestro'");
    localStorage.setItem("p2Name","John Cena");
}
/*----- Configs -----*/
function config(){
     //Player names
     var p1 = document.getElementById("p1Name").value;
     var p2 = document.getElementById("p2Name").value;
     if (p1 === ""){localStorage.setItem("p1Name","Aprendiz del 'Maestro'");} else{localStorage.setItem("p1Name",p1);}
     if (p2 === ""){ localStorage.setItem("p2Name","John Cena");} else{localStorage.setItem("p2Name",p2);}


    //IA or player
    var ia = document.getElementById("ia").checked;
    var player = document.getElementById("player").checked;
    //Color
    var o = document.getElementById("colorO");
    var colorO = o.options[o.selectedIndex].value;
    var x = document.getElementById("colorX");
    var colorX = x.options[x.selectedIndex].value;

    localStorage.setItem("colorO",colorO);
    localStorage.setItem("colorX",colorX);

    if (ia === true) {
        localStorage.removeItem("isIA");
        localStorage.setItem("isIA", true);
        alert("Activado: Player vs IA");
        console.log(localStorage.isIA);
    }else
    if (player === true){
        localStorage.removeItem("isIA");
        localStorage.setItem("isIA", false);
        alert("Activado: Player vs Player");
        console.log(localStorage.isIA);
    }

}





/*----- JUEGO CANVAS -----*/
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.canvas.width  = window.innerWidth*0.82;
c.canvas.height = window.innerWidth*0.82;
var click = canvas.getBoundingClientRect();

var lado = canvas.width;
var cuadro = lado/3;



//Players
var player1=true; //X
var player2=false; //O
var p1Name = localStorage.getItem("p1Name");
var p2Name = localStorage.getItem("p2Name");
//Score
var p1Score = 0;
var p2Score = 0;
//Reset de victorias
function resetCounter(){
    p1Score = 0;
    p2Score = 0;
    reiniciaWaiter();
    alert("Reiniciado con exito!")
}
//IA definition
var player2IsIA = (localStorage.getItem("isIA") === 'true');
console.log(player2IsIA)

//Variables ganyan S.L.
var celda1 = [false,'N'];
var celda2 = [false,'N'];
var celda3 = [false,'N'];
var celda4 = [false,'N'];
var celda5 = [false,'N'];
var celda6 = [false,'N'];
var celda7 = [false,'N'];
var celda8 = [false,'N'];
var celda9 = [false,'N'];

//Turno
var turn = turno();

//Movimientos
var move = 0;

//Tablero
tablero();

function tablero(){
	c.strokeStyle="#3498db";
	c.fillStyle="black";
	var x = 0;
	var y = 0;
	
	for (i = 0; i < 9; i++) {
		if (i === 3 || i === 6) {
			y += cuadro;
			x = 0;
		}
		c.fillRect(x,y,cuadro,cuadro)
		c.strokeRect(x,y,cuadro,cuadro)
		x += cuadro;
	};
}



//Dibujar X
function dibujarX(x,x1,y,y1,n,n1){
	//Precalculos del diablo
	x = cuadro * 0.9 + cuadro * (n-1);
	y = cuadro * 0.9 + cuadro * (n1-1);
	x1 = x1 + cuadro * 0.1;
	y1 = y1 + cuadro * 0.1;
	//Dibujar
	c.beginPath();
	c.lineWidth=2;
	c.strokeStyle=localStorage.getItem("colorX");
	//Palo Izquierdo
	c.moveTo(x,y);
	c.lineTo(x1,y1);
	//Palo Derecho
	c.moveTo(x1,y);
	c.lineTo(x,y1);
	c.stroke();
}


//Dibujar O
function dibujarO(x,y){
	//las cosas circulares son mas faciles T.T
	c.beginPath();
	c.lineWidth=2;
	c.strokeStyle=localStorage.getItem("colorO");
	c.arc(x,y,cuadro/2.2,0,Math.PI*2);
	c.stroke();
}
//Cambio de turno
function turno(){
	if (player1 === true){
		player1 = false;
		player2 = true;
		return true;
	} else if (player2 === true){
		player1 = true;
		player2 = false;
		return false;
	}
}
//Listener tablero
canvas.addEventListener("click", function(e){
	var x = e.clientX - click.left;
	var y = e.clientY - click.top;
	
	//1-3 done
	if ( x <= cuadro && y <=cuadro){
		if (turn && !celda1[0]){
			dibujarX(cuadro,0,cuadro,0,1,1);
			celda1[0] = true;
			celda1[1] = 'X';
			turn = turno();
		} else if(!turn && !celda1[0]) {
			dibujarO(cuadro*0.5,cuadro*0.5);
			celda1[0] = true;
			celda1[1] = 'O';
			turn = turno();
		}		
	} else
	if ( x > cuadro && x <= cuadro*2 && y <=cuadro){
		if (turn && !celda2[0]){
			dibujarX(cuadro,cuadro,cuadro,0,2,1);
			celda2[0] = true;
			celda2[1] = 'X';
			turn = turno();
		} else if(!turn && !celda2[0]) {
			dibujarO(cuadro*1.5,cuadro*0.5);
			celda2[0] = true;
			celda2[1] = 'O';
			turn = turno();
		}	
	} else
	if ( x > cuadro*2 && x <= cuadro*3 && y <=cuadro){
		if (turn && !celda3[0]){
			dibujarX(cuadro,cuadro*2,cuadro,0,3,1);
			celda3[0] = true;
			celda3[1] = 'X';
			turn = turno();
		} else if(!turn && !celda3[0]) {
			dibujarO(cuadro*2.5,cuadro*0.5);
			celda3[0] = true;
			celda3[1] = 'O';
			turn = turno();
		}	
	} else
	//4-6
	if ( x <= cuadro && y > cuadro && y < cuadro*2 ){
		if (turn && !celda4[0]){
			dibujarX(cuadro,0,cuadro,cuadro,1,2);
			celda4[0] = true;
			celda4[1] = 'X';
			turn = turno();
		} else if(!turn && !celda4[0]) {
			dibujarO(cuadro*0.5,cuadro*1.5);
			celda4[0] = true;
			celda4[1] = 'O';
			turn = turno();
		}
	} else
	if ( x > cuadro && x <= cuadro*2 && y > cuadro && y < cuadro*2 ){
		if (turn && !celda5[0]){
			dibujarX(cuadro,cuadro,cuadro,cuadro,2,2);
			celda5[0] = true;
			celda5[1] = 'X';
			turn = turno();
		} else if(!turn && !celda5[0]) {
			dibujarO(cuadro*1.5,cuadro*1.5);
			celda5[0] = true;
			celda5[1] = 'O';
			turn = turno();
		}
	} else
	if ( x > cuadro*2 && x <= cuadro*3 && y > cuadro && y < cuadro*2 ){
		if (turn && !celda6[0]){
			dibujarX(cuadro,cuadro*2,cuadro,cuadro,3,2);
			celda6[0] = true;
			celda6[1] = 'X';
			turn = turno();
		} else if(!turn && !celda6[0]) {
			dibujarO(cuadro*2.5,cuadro*1.5);
			celda6[0] = true;
			celda6[1] = 'O';
			turn = turno();
		}
	} else
	//7-9
	if ( x <= cuadro && y >= cuadro*2 ){
		if (turn && !celda7[0]){
			dibujarX(cuadro,0,cuadro,cuadro*2,1,3);
			celda7[0] = true;
			celda7[1] = 'X';
			turn = turno();
		} else if(!turn && !celda7[0]) {
			dibujarO(cuadro*0.5,cuadro*2.5);
			celda7[0] = true;
			celda7[1] = 'O';
			turn = turno();
		}
	} else
	if ( x > cuadro*1 && x <= cuadro*2 && y >= cuadro*2){
		if (turn && !celda8[0]){
			dibujarX(cuadro,cuadro,cuadro,cuadro*2,2,3);
			celda8[0] = true;
			celda8[1] = 'X';
			turn = turno();
		} else if(!turn && !celda8[0]) {
			dibujarO(cuadro*1.5,cuadro*2.5);
			celda8[0] = true;
			celda8[1] = 'O';
			turn = turno();
		}
	} else
	if ( x > cuadro*2 && x <= cuadro*3 && y >= cuadro*2 ){
		if (turn && !celda9[0]){
			dibujarX(cuadro,cuadro*2,cuadro,cuadro*2,3,3);
			celda9[0] = true;
			celda9[1] = 'X';
			turn = turno();
		} else if(!turn && !celda9[0]) {
			dibujarO(cuadro*2.5,cuadro*2.5);
			celda9[0] = true;
			celda9[1] = 'O';
			turn = turno();
		}
	}
	//Si la IA esta en partida
	if (turn === false && player2IsIA === true){
		if (victoria() !== true){
			iaPlay();
			move++;
		}
	}
	move++;
	victoria();
})

/*----- DECISION DE LA PARTIDA -----*/
function reiniciaWaiter(){
    setTimeout(function reinicia(){
               move = 0;
               c.lineWidth=1;
               //Players
               player1=true; //X
               player2=false; //O



               //Variables ganyan S.L.
               celda1 = [false,'N'];
               celda2 = [false,'N'];
               celda3 = [false,'N'];
               celda4 = [false,'N'];
               celda5 = [false,'N'];
               celda6 = [false,'N'];
               celda7 = [false,'N'];
               celda8 = [false,'N'];
               celda9 = [false,'N'];

               //Turno
               turn = turno();

               //Tablero
               tablero();
               },1500);
}
function winName(name){
    c.font=(cuadro/4)+"px CheapFire";
    // Create gradient
    var gradient=c.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0","#AAA");
    gradient.addColorStop("0.5","orange");
    gradient.addColorStop("1.0","red");
    // Fill with gradient
    c.fillStyle=gradient;
    c.fillText(name+" wins",cuadro*0.5,cuadro*1.5);
    c.fillText(p1Score + "-" + p2Score,cuadro*1.4,cuadro*2);
}
//A realizar cuando gana X
function winX(){
    p1Score++;
    winName(localStorage.getItem("p1Name")+"(X)");
    reiniciaWaiter();
}
//A realizar cuando gana O
function winO(){
    p2Score++;
    winName(localStorage.getItem("p2Name")+"(O)");
    reiniciaWaiter();
}
//A realizar cuando empate
function tie(){
     c.font=(cuadro/4)+"px CheapFire";
        // Create gradient
        var gradient=c.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop("0","#AAA");
        gradient.addColorStop("0.5","orange");
        gradient.addColorStop("1.0","red");
        // Fill with gradient
        c.fillStyle=gradient;
        c.fillText("Tic, Tac, TIE!",cuadro*0.5,cuadro*1.5);
        c.fillText(p1Score + "-" + p2Score,cuadro*1.4,cuadro*2);
    reiniciaWaiter();
}
function victoria(){
		
		//123
		if (celda1[1] === 'X' && celda2[1] === 'X' && celda3[1] === 'X') {
		    winX();
			return true;
		} else if (celda1[1] === 'O' && celda2[1] === 'O' && celda3[1] === 'O'){
			winO();
            return true;
		} else
		//456
		if (celda4[1] === 'X' && celda5[1] === 'X' && celda6[1] === 'X') {
			  winX();
			return true;
		} else if (celda4[1] === 'O' && celda5[1] === 'O' && celda6[1] === 'O'){
			winO();
			return true;
		} else
		//789
		if (celda7[1] === 'X' && celda8[1] === 'X' && celda9[1] === 'X') {
			  winX();
			return true;
		} else if (celda7[1] === 'O' && celda8[1] === 'O' && celda9[1] === 'O'){
			winO();
			return true;
		} else
		//147
		if (celda1[1] === 'X' && celda4[1] === 'X' && celda7[1] === 'X') {
			  winX();
			return true;
		} else if (celda1[1] === 'O' && celda4[1] === 'O' && celda7[1] === 'O'){
			winO();
			return true;
		} else
		//258
		if (celda2[1] === 'X' && celda5[1] === 'X' && celda8[1] === 'X') {
			  winX();
			return true;
		} else if (celda2[1] === 'O' && celda5[1] === 'O' && celda8[1] === 'O'){
			winO();
			return true;
		} else
		//369
		if (celda3[1] === 'X' && celda6[1] === 'X' && celda9[1] === 'X') {
			  winX();
			return true;
		} else if(celda3[1] === 'O' && celda6[1] === 'O' && celda9[1] === 'O'){
			winO();
			return true;
		} else
		//159
		if (celda1[1] === 'X' && celda5[1] === 'X' && celda9[1] === 'X') {
			winX();
			return true;
		} else if (celda1[1] === 'O' && celda5[1] === 'O' && celda9[1] === 'O'){
			winO();
			return true;
		} else
		//357
		if (celda3[1] === 'X' && celda5[1] === 'X' && celda7[1] === 'X') {
			  winX();
			return true;
		} else if (celda3[1] === 'O' && celda5[1] === 'O' && celda7[1] === 'O'){
			winO();
			return true;
		} else
		//TIE
		if (celda1[1] !== 'N' &&celda2[1] !== 'N' &&celda3[1] !== 'N' &&celda4[1] !== 'N' &&celda5[1] !== 'N' &&celda6[1] !== 'N' &&celda7[1] !== 'N' &&celda8[1] !== 'N' && celda9[1] !== 'N'){
			tie();
			return true;
		}
}


/* IA EASY*/
function iaPlay(){
	var jugada = iaRandom();
	var check = availableMove();
	if (move < 8){	
		while(true){
			if (check[jugada-1] !== false){
				jugada = iaRandom();
			} else {
				iaPaint(jugada);
				break;
			}
		}
	}
}


function availableMove(){
	var available = [true,true,true,true,true,true,true,true,true];
	if (celda1[0] !== true){
		available[0] = false;
	}
	if (celda2[0] !== true){
		available[1] = false;
	}
	if (celda3[0] !== true){
		available[2] = false;
	}
	if (celda4[0] !== true){
		available[3] = false;
	}
	if (celda5[0] !== true){
		available[4] = false;
	}
	if (celda6[0] !== true){
		available[5] = false;
	}
	if (celda7[0] !== true){
		available[6] = false;
	}
	if (celda8[0] !== true){
		available[7] = false;
	}
	if (celda9[0] !== true){
		available[8] = false;
	}
	return available;
}

function iaRandom(){
	return Math.floor((Math.random() * 9) + 1);
}

function iaPaint(jugada){
//1-3 done
	if ( jugada === 1 ){
		dibujarO(cuadro*0.5,cuadro*0.5);
		celda1[0] = true;
		celda1[1] = 'O';
		turn = turno();
	} else
	if ( jugada === 2 ){
		dibujarO(cuadro*1.5,cuadro*0.5);
		celda2[0] = true;
		celda2[1] = 'O';
		turn = turno();
	} else
	if ( jugada === 3 ){
		dibujarO(cuadro*2.5,cuadro*0.5);
		celda3[0] = true;
		celda3[1] = 'O';
		turn = turno();
	} else
	//4-6
	if ( jugada === 4 ){
		dibujarO(cuadro*0.5,cuadro*1.5);
		celda4[0] = true;
		celda4[1] = 'O';
		turn = turno();
	} else
	if ( jugada === 5 ){
		dibujarO(cuadro*1.5,cuadro*1.5);
		celda5[0] = true;
		celda5[1] = 'O';
		turn = turno();
	} else
	if ( jugada === 6 ){
		dibujarO(cuadro*2.5,cuadro*1.5);
		celda6[0] = true;
		celda6[1] = 'O';
		turn = turno();
	} else
	//7-9
	if ( jugada === 7 ){
		dibujarO(cuadro*0.5,cuadro*2.5);
		celda7[0] = true;
		celda7[1] = 'O';
		turn = turno();
	} else
	if ( jugada === 8 ){
		dibujarO(cuadro*1.5,cuadro*2.5);
		celda8[0] = true;
		celda8[1] = 'O';
		turn = turno();
	} else
	if ( jugada === 9 ){
		dibujarO(cuadro*2.5,cuadro*2.5);
		celda9[0] = true;
		celda9[1] = 'O';
		turn = turno();
	}
}
