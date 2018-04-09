
import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { element } from 'protractor';
import { Element } from '@angular/compiler';
//import { VirtualJoysticks } from './VirtualJoystick';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {

    elem: any;
    aframe: any;
    timeout: any;

    title = 'Space-C'; //Project Fun
	NewVirtualJoystick: any;
	
	constructor(private zone: NgZone){


	}
  
	//@ViewChild(VirtualJoysticks) VirtualJoystick;
//   constructor(ref: ElementRef,VirtualJoystickz:VirtualJoysticks) {
//         this.elem = ref.nativeElement;
//         //this.VirtualJoystick = VirtualJoystickz.VirtualJoystick;

//         //console.log(this.VirtualJoystick);
        
//     }
    
    
ngAfterViewInit(){

	this.zone.runOutsideAngular(() => {

	//this.NewVirtualJoystick = this.VirtualJoystick.createJoy;

	//console.log(this.NewVirtualJoystick);

        let requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout( callback, 1000 / 60 );
                        };
                    });

        //this.VirtualJoystick = new this.VirtualJoystick.VirtualJoystick1();
        //this is all the variables for the star background
let stars = [];
let numStars = 20; //<- 40 maybe good for mobile //250; <- that is good for desktop screen size//2000

let exitReload = 0;
let bulletPower = 0;
let bulletLoop;
let bulletSpeed = 0;
let shootStickTouch = false;
let playersSizeW;
let playerSizeH;
let bulletSizeW;
let bulletSizeH;
let slowMoWatch = 0;
let slowMotion = false;
let slowMoDelay;
let x = 0;
let y = 0;
let ctx;
let slowHue = 240;
let slowShade = 100;
let slowBrightness = 60;
let borderHue = 50;
let borderShade = 29;
let borderBrightness = 61;
let KeyboardBulletDelay = 10;
	
// Obtain a reference to the canvas element
// using its id.
	
let canvas = <HTMLCanvasElement> document.getElementById("canvas");
ctx = canvas.getContext("2d");


// starting hue for the explosion
let hue = 120;

let menu: boolean = true;
let mousePos;

let canvas2 = <HTMLCanvasElement> document.getElementById("canvas"),
   	ctx2 = canvas2.getContext("2d");
	   
	   
// Create all the stars
for(let i = 0; i < numStars; i++) {
	let x = Math.round(Math.random() * canvas.width);
	let y = Math.round(Math.random() * canvas.height);
	let length = 1 + Math.random() * 2;
	let opacity = Math.random();
		
	// Create a new star and draw
	let star = new Star(x, y, length, opacity);
		
	// Add the the stars array
    stars.push(star);
		
		
}
	   
	   

//setInterval(animateStar, 1000 / fps);

	
	// now we will setup our basic variables for the demo
 let canvas1 = <HTMLCanvasElement> document.getElementById("canvas"),
   	ctx1 = canvas1.getContext("2d"),
		//full screen dimensions
		//cw = canvas1.width,
		//ch = canvas1.height,
		// firework collection
		fireworks = [],
		// particle collection
		particles = [],
		
		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
		limiterTotal = 5,
		limiterTick = 0,
		// this will time the auto launches of fireworks, one launch per 80 loop ticks
		timerTotal = 60, //75
		timerTick = 0,
		mousedown = false;
		// mouse x coordinate,
		//mx,
		// mouse y coordinate
		//my;
		
	// // set canvas dimensions
	canvas1.width = canvas.width;
	canvas1.height = canvas.height;
	
	let joystick: any;
	let shootStick: any;			
	
	let playerSize = 0;
	let bulletSize = 0;
	
	let playerPositionX = 0;
	let playerPositionY = 0;
	

	
	let playArea = 0;
	
	//var entities = [];
	let RandomShipFleet = [];
	let HunterFleet = [];
	let StalkerFleet = [];
	let BlackBox = [];
	let BHEnemys = [];
	let InfectedFleet = [];

	let randomShipInterval;
	let hunterShipInterval;
	let stalkerShipInterval;
	let lifePupInterval;
	let bulletPupInterval;
	let blackBoxInterval;
	let infectedShipInterval;
	
	let score = 0;
	let lives = 3;
	
	
	let bulletClip = [];
	let LifePowerPack = [];
	let BulletPowerPack = [];
	let LazerBattery = [];
	//var numOfEnemyShips = 4;
	
	let bullet = new Object();
	let bulletPC = new Object();

	let bigLazer = new Object();
	
	let Enemy1 = new Object();
	let Enemy2 = new Object();
	let Enemy3 = new Object();
	let Enemy4 = new Object();
	let Enemy5 = new Object();
	let Enemy6 = new Object();
	
	let LifePup = new Object();
	let BulletPup = new Object();
	
	let joyStickX = 0;
	let joyStickY = 0;
	let shootStickX = 0;
	let shootStickY = 0;
	let joyDirX = "";
	let joyDirY = "";
	let shootStickDirX = "";
	let shootStickDirY = "";
	let joyTouch = false;

	let moveReady = false;
	let shootReady = false;
	
	
    document.getElementById("score").style.display = "none";
	document.getElementById("restartBtn").style.display = "none";
    document.getElementById("RotWarBox").style.display = "none";

    document.getElementById("MoveStickInfo").style.display = "none";
	document.getElementById("ShootStickInfo").style.display = "none";
	
	//This was a temporary fix to rotate the screen

    // document.getElementById('canvas').addEventListener('touchstart', canvasTap);

    // function canvasTap(){

    //     if(canvas.width <= 300 && exitReload == 0){

    //         document.getElementById("RotWarBox").style.display = "inline-block";

	// 	}        
    // }

    document.getElementById('closeRotWar').addEventListener('touchstart', closeRotWar);

    function closeRotWar(){

        document.getElementById("RotWarBox").style.display = "none";
    }
	
	
	
    //when the game is quit, the screen goes back to normal and the page is reloaded or a message appears

	document.getElementById('exitGame').addEventListener('touchstart', rgTap);
	document.getElementById('exitGame').addEventListener('click', rgTap);
    
    function rgTap(){

        //window.location.reload();
		//if(canvas.width > 500){
			
		//this will take you out of fullscreen mode
			// if (document.exitFullscreen) {
            //         document.exitFullscreen();
            // }
			// // } else if (document.msExitFullscreen) {
			// // 		document.msExitFullscreen();
			// // } else if (document.mozCancelFullScreen) {
			// // 		document.mozCancelFullScreen();
			// else if (document.webkitExitFullscreen) {
			// 		document.webkitExitFullscreen();
			// }

			playerPositionX = canvas.width * .50;
			playerPositionY = canvas.height * .50;
			
			//this will update the players position if the screen size changes
			x = playerPositionX;
			y = playerPositionY;

			menu = true;
			moveReady = false;
			shootReady = false;
			slowMotion = false;
			clearTimeout(slowMoDelay);
			clearInterval(randomShipInterval);
			clearInterval(hunterShipInterval);
			clearInterval(stalkerShipInterval);
			clearInterval(lifePupInterval);
			clearInterval(bulletPupInterval);
			clearInterval(blackBoxInterval);
			clearInterval(infectedShipInterval);
			exitReload = 0;
			score = 0;
			lives = 3;
			bulletSpeed = 0;
			bulletPower = 0;
			KeyboardBulletDelay = 10;
			RandomShipFleet = [];
			HunterFleet = [];
			StalkerFleet = [];
			bulletClip = [];
			LifePowerPack = [];
			BulletPowerPack = [];
			BlackBox = [];
			BHEnemys = [];
			InfectedFleet = [];
			LazerBattery = [];
			document.getElementById("title").style.display = "block";
			document.getElementById("score").style.display = "none";
			document.getElementById("exitGame").style.display = "none";
			document.getElementById("play").style.display = "inline-block";
			document.getElementById("restartBtn").style.display = "none";
			document.getElementById("ShootStickInfo").style.display = "none";
			document.getElementById("MoveStickInfo").style.display = "none";

			if(canvas.width >= 596){
				
				document.getElementById("highscore").style.display = "inline-block";
				document.getElementById("desktopOptions").style.display = "inline-block";
			 }

			// console.log(joystick);
			
			if(joystick != undefined && shootStick != undefined){

				joystick.destroy();
				shootStick.destroy();
			}

			document.getElementById("shootStick").style.display = "none";
			document.getElementById("container").style.display = "none";
			
			//window.location.reload();
			//alert("reload");
		//}
		// else if(canvas.width < 499){
		// 	if(canvas.width < 261){
				
		// 		if (document.exitFullscreen) {
        //             document.exitFullscreen();
        //         }
		// 		// } else if (document.msExitFullscreen) {
		// 		// 	document.msExitFullscreen();
		// 		// } else if (document.mozCancelFullScreen) {
		// 		// 	document.mozCancelFullScreen();
		// 		// } else if (document.webkitExitFullscreen) {
		// 		// 	document.webkitExitFullscreen();
		// 		// }
				
				
		// 		window.location.reload();
		// 	}
		// 	else{
		// 		alert("Please rotate your device and tap this button again to properly quit.");
		// 	}
		// 	//alert("hit the button");
		// }
    }

    document.getElementById('restartBtn').addEventListener('touchstart', restartBtnTap);

    function restartBtnTap(){

        slowMotion = false;
		clearTimeout(slowMoDelay);
		clearInterval(randomShipInterval);
		clearInterval(hunterShipInterval);
		clearInterval(stalkerShipInterval);
		clearInterval(lifePupInterval);
		clearInterval(bulletPupInterval);
		clearInterval(blackBoxInterval);
		clearInterval(infectedShipInterval);
		//this will create new enemies
		randomShipInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy1 = Object.assign({}, RandomShip);
				Enemy1.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy1.y = Math.round(Math.random() * (canvas.height * .90));
				Enemy1.direction = Math.round(Math.random() * 7);
				
				if (exitReload == 0 || x > Enemy1.x && x < Enemy1.x && //TODO: Figure out a way to get the enemys to ONLY spawn around the player
					y > Enemy1.y && y < Enemy1.y + (playerSize * 15)) {
						
					RandomShipFleet.push(Enemy1);
				
				}
			}
		}, 1100);
		
		hunterShipInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy2 = Object.assign({}, Hunter);
				Enemy2.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy2.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || x < Enemy2.x + (playerSize * 15)  && x + (playerSize * 15)  > Enemy2.x &&
					y < Enemy2.y + (playerSize * 15) && y + (playerSize * 15) > Enemy2.y) {
					
					HunterFleet.push(Enemy2);
				}
				
			}
		}, 5000);	
		
		stalkerShipInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy3 = Object.assign({}, Stalker);
				Enemy3.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy3.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || x < Enemy3.x + (playerSize * 15)  && x + (playerSize * 15)  > Enemy3.x &&
					y < Enemy3.y + (playerSize * 15) && y + (playerSize * 15) > Enemy3.y) {
						
					StalkerFleet.push(Enemy3);
				}
			}
		}, 9000);	
		
		
		lifePupInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let LifePup = Object.assign({}, LifePowerUp);
				LifePup.x = Math.round(Math.random() * (canvas.width * .90));
				LifePup.y = Math.round(Math.random() * (canvas.height * .90));
				
				if(exitReload == 0){
						
					LifePowerPack.push(LifePup);
				}
			}
		}, 25000); //60000
		
		bulletPupInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let BulletPup = Object.assign({}, BulletPowerUp);
				BulletPup.x = Math.round(Math.random() * (canvas.width * .90));
				BulletPup.y = Math.round(Math.random() * (canvas.height * .90));
				
				if(exitReload == 0){
						
					BulletPowerPack.push(BulletPup);
				}
			}
		}, 20000);	//30000	


		blackBoxInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy4 = Object.assign({}, BlackHole);
				Enemy4.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy4.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || x < Enemy4.x + (playerSize * 15)  && x + (playerSize * 15)  > Enemy4.x &&
					y < Enemy4.y + (playerSize * 15) && y + (playerSize * 15) > Enemy4.y) {
						
					BlackBox.push(Enemy4);
				}
			}
		}, 55000);	

		infectedShipInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy5 = Object.assign({}, InfectedShip);
				Enemy5.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy5.y = Math.round(Math.random() * (canvas.height * .90));
				Enemy5.direction = Math.round(Math.random() * 7);
				
				if (exitReload == 0 || x < Enemy5.x + (playerSize * 15)  && x + (playerSize * 15)  > Enemy5.x &&
					y < Enemy5.y + (playerSize * 15) && y + (playerSize * 15) > Enemy5.y) {
						
					InfectedFleet.push(Enemy5);
				}
			}
		}, 30000);		
		exitReload = 0;
		score = 0;
		lives = 3;
		bulletSpeed = 0;
		bulletPower = 0;
		KeyboardBulletDelay = 10;
		RandomShipFleet = [];
		HunterFleet = [];
		StalkerFleet = [];
		bulletClip = [];
		LifePowerPack = [];
		BulletPowerPack = [];
		BlackBox = [];
		BHEnemys = [];
		InfectedFleet = [];
		LazerBattery = [];
        document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
		document.getElementById("restartBtn").style.display = "none";
		document.getElementById("score").style.display = "inline-block";
		document.getElementById("exitGame").style.display = "inline-block";
		document.getElementById("title").style.display = "none";
    }
	
    document.getElementById("exitGame").style.display = "none";

    document.getElementById('container').addEventListener('touchend', containerTapEnd);

    function containerTapEnd(){

        joyDirX = "";
		joyDirY = "";
		joyTouch = false;
    }

    document.getElementById('container').addEventListener('touchstart', containerTap);

    function containerTap(){

        joyTouch = true; // the joystick was touched and now in the Update function it will be checking the direction of the joystick
        moveReady = true;//this checks the joystick to see if the player knows what it does. First touch starts the game
        document.getElementById("MoveStickInfo").style.display = "none"; //hides the message
        //document.getElementById("ShootStickInfo").style.marginTop = "-13.8%";
    }

    document.getElementById('shootStick').addEventListener('touchstart', shootStickTap);
    
    function shootStickTap(){

        //console.log("shoot stick");
			
			shootReady = true; //this checks the shootStick to see if the player knows what it does. First touch starts the game
            //document.getElementById("MoveStickInfo").style.marginTop = "-14%";

            document.getElementById("ShootStickInfo").style.display = "none";
			
			if(bulletPower >= 9){
				
				bulletSpeed = 100;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 8){
				
				bulletSpeed = 125;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 7){
				
				bulletSpeed = 150;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 6){
				
				bulletSpeed = 175;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 5){
				
				bulletSpeed = 200;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 4){
				
				bulletSpeed = 225;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 3){
				
				bulletSpeed = 250;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 2){
				
				bulletSpeed = 300;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 1){
				
				bulletSpeed = 325;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 0){
				
				bulletSpeed = 350;
				//console.log(bulletSpeed);
			} 
			
			BulletsFire();
			
			//console.log(bulletSpeed);
			shootStickTouch = true;
    }

    document.getElementById('shootStick').addEventListener('touchend', shootStickTapEnd);

    function shootStickTapEnd(){

        shootStickTouch = false;
		//console.log(shootStickTouch);					
		shootStickDirX = "";
		shootStickDirY = "";
		clearInterval(bulletLoop);
    }

	document.getElementById('play').addEventListener('click', playTap);
	//document.getElementById('play').addEventListener('touchstart', playTap);
    //when the play button is pressed the full screen is started, the joystick is set up and the enemy interval is started

    function playTap(){

		//------------------------------this guys sets up full screen for the browsers--------------------------//


        if (!document.fullscreenElement) {  // current working methods
				if (document.documentElement.requestFullscreen) {
						document.documentElement.requestFullscreen();
				}
				else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullScreen();
					//if(Element.ALLOW_KEYBOARD_INPUT)
		} 
		}
    //----------------------End of full screen------------------------------------------//
		
		menu = false;
		
		document.getElementById("exitGame").style.display = "inline-block";
		document.getElementById("highscore").style.display = "none";
		document.getElementById("desktopOptions").style.display = "none";
		
		setTimeout(function() {
			
			//this.VirtualJoystick.createJoy();
			//this makes the joystick
		 joystick = new VirtualJoystick({
				container: document.getElementById('container'),
				mouseSupport: true,
				limitStickTravel: true,
				stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
                      baseX: joyStickX, // this size is only good for mobile maybe not tablets
                      baseY: joyStickY, // this size is only good for mobile maybe not tablets
				stickRadius: 25
			});	
			
		 shootStick = new VirtualJoystick({
				container: document.getElementById('shootStick'),
				mouseSupport: true,
				limitStickTravel: true,
				stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
                      baseX: shootStickX, // this size is only good for mobile not tablets
                      baseY: shootStickY, // this size is only good for mobile not tablets
				stickRadius: 25
			});

		}, 400);

		
			
			
		//this will create new enemies
		randomShipInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy1 = Object.assign({}, RandomShip);
				Enemy1.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy1.y = Math.round(Math.random() * (canvas.height * .90));
				Enemy1.direction = Math.round(Math.random() * 7);
				
				if (exitReload == 0 || x > Enemy1.x && x < Enemy1.x && //TODO: Figure out a way to get the enemys to ONLY spawn around the player
					y > Enemy1.y && y < Enemy1.y + (playerSize * 15)) {
						
					RandomShipFleet.push(Enemy1);
				
				}
			}
			//$("#result").html(entities.length);
			//console.log(entities);
		}, 1100);
		
		hunterShipInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy2 = Object.assign({}, Hunter);
				Enemy2.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy2.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || x < Enemy2.x + (playerSize * 15)  && x + (playerSize * 15)  > Enemy2.x &&
					y < Enemy2.y + (playerSize * 15) && y + (playerSize * 15) > Enemy2.y) {
					
					HunterFleet.push(Enemy2);
				}
				
			}
			//console.log(entities);
		}, 5000);	
		
		stalkerShipInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy3 = Object.assign({}, Stalker);
				Enemy3.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy3.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || x < Enemy3.x + (playerSize * 15)  && x + (playerSize * 15)  > Enemy3.x &&
					y < Enemy3.y + (playerSize * 15) && y + (playerSize * 15) > Enemy3.y) {
						
					StalkerFleet.push(Enemy3);
				}
			}
			//console.log(entities);
		}, 9000);	
		
		
		lifePupInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let LifePup = Object.assign({}, LifePowerUp);
				LifePup.x = Math.round(Math.random() * (canvas.width * .90));
				LifePup.y = Math.round(Math.random() * (canvas.height * .90));
				
				if(exitReload == 0){
						
					LifePowerPack.push(LifePup);
				}
			}
			//console.log(entities);
		}, 25000); //60000
		
		bulletPupInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let BulletPup = Object.assign({}, BulletPowerUp);
				BulletPup.x = Math.round(Math.random() * (canvas.width * .90));
				BulletPup.y = Math.round(Math.random() * (canvas.height * .90));
				
				if(exitReload == 0){
						
					BulletPowerPack.push(BulletPup);
				}
			}
			//console.log(entities);
		}, 20000);	//30000	


		blackBoxInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy4 = Object.assign({}, BlackHole);
				Enemy4.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy4.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || x < Enemy4.x + (playerSize * 15)  && x + (playerSize * 15)  > Enemy4.x &&
					y < Enemy4.y + (playerSize * 15) && y + (playerSize * 15) > Enemy4.y) {
						
					BlackBox.push(Enemy4);
				}
			}
			//console.log(Enemy4);
		}, 55000);	

		infectedShipInterval = setInterval(function(){

			if(moveReady == true && shootReady == true){
                
                let Enemy5 = Object.assign({}, InfectedShip);
				Enemy5.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy5.y = Math.round(Math.random() * (canvas.height * .90));
				Enemy5.direction = Math.round(Math.random() * 7);
				
				if (exitReload == 0 || x < Enemy5.x + (playerSize * 15)  && x + (playerSize * 15)  > Enemy5.x &&
					y < Enemy5.y + (playerSize * 15) && y + (playerSize * 15) > Enemy5.y) {
						
					InfectedFleet.push(Enemy5);
				}
			}
			//console.log(Enemy5);
		}, 30000);		
        
        document.getElementById("play").style.display = "none";
        document.getElementById("title").style.display = "none";
        document.getElementById("score").style.display = "inline-block";
        document.getElementById("MoveStickInfo").style.display = "inline-block";
		document.getElementById("ShootStickInfo").style.display = "inline-block";
		document.getElementById("shootStick").style.display = "inline-block";
		document.getElementById("container").style.display = "inline-block";
    }
	

	// Start listening to resize events and
	// draw canvas and character sizes.
	initialize(); // this is the function that will look at the browser window size and will resize everything

	function initialize() {
	// Register an event listener to
	// call the resizeCanvas() function each time
	// the window is resized.
		window.addEventListener('resize', resizeCanvas, false);
		
	// Draw canvas border for the first time.
		resizeCanvas();
	}
	
	// Display custom canvas.
	function redraw() {
		//ctx.strokeStyle = 'blue';
		//ctx.lineWidth = '1';
		//ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
		
		//Resize character sizes
		playersSizeW = canvas.width * .01;
		playerSizeH = canvas.height * .01;
		
		bulletSizeW = canvas.width * .004;
		bulletSizeH = canvas.height * .004;
		
		playerSize = (playersSizeW + playerSizeH); //playerSize is about 19.43999 px
		bulletSize = (bulletSizeW + bulletSizeH);
		
		
		//when the screen size changes, the player will be redirected to the center of the screen
		playerPositionX = canvas.width * .50;
		playerPositionY = canvas.height * .50;
		
		//this will update the players position if the screen size changes
		x = playerPositionX;
        y = playerPositionY;
		
		canvas1.width = canvas.width;
		canvas1.height = canvas.height;
					
		
	}
	// Runs each time the DOM window resize event fires.
	// Resets the canvas dimensions to match window,
	// then draws the new borders accordingly.
	function resizeCanvas() {

		canvas.width = 0;
		canvas.height = 0;
		
		//This will dynamically resize the game play area		
		canvas.width = (window.innerWidth) * .72;
		canvas.height = (window.innerHeight) * .80; //.80
		stars = []; // this will clear the stars array before pushing in more with new width
		
		//console.log("Canvas Width " + canvas.width);
		//$("#result").html(canvas.width); //display the screen size/////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		// Create all the stars
		for(let i = 0; i < numStars; i++) {
			let x = Math.round(Math.random() * canvas.width);
			let y = Math.round(Math.random() * canvas.height);
			let length = 1 + Math.random() * 2;
			let opacity = Math.random();
		
			// Create a new star and draw
			let star = new Star(x, y, length, opacity);
		
		// Add the the stars array
		stars.push(star);
		
		
	}
		// if(canvas.width <= 428){		
			
		// 	joyStickX = (window.innerWidth) * .68;
		// 	joyStickY = (window.innerHeight) * .30;
			
		// }
	
		if(canvas.width >= 241){
			
			shootStickX = (window.innerWidth) * .91;
			shootStickY = (window.innerHeight) * .55;	
			
			joyStickX = (window.innerWidth) * .07;
			joyStickY = (window.innerHeight) * 0.55;


			//old joystick layout
			//******************************************/
			// joyStickX = (window.innerWidth) * .93;
			// joyStickY = (window.innerHeight) * .55;	
			
			// shootStickX = (window.innerWidth) * .07;
			// shootStickY = (window.innerHeight) * 0.55;
			//******************************************/

			// if(canvas.width > 450){

			// 	joyStickX = (window.innerWidth) * .96;
			// 	joyStickY = (window.innerHeight) * .70;
			// 	//console.log("Yo");	
			// }
			
		}
		
		if(canvas.width <= 300){

			document.getElementById("play").style.display = "none";
			document.getElementById("restartBtn").style.display = "none";
			document.getElementById("ShootStickInfo").style.display = "none";
			document.getElementById("MoveStickInfo").style.display = "none";
			document.getElementById("desktopOptions").style.display = "none";
            // document.getElementById("rotWar").style.display = "inline-block";
            
			document.getElementById("highscore").style.display = "inline-block";
			
			moveReady = false;
			shootReady = false;
			slowMotion = false;
			clearTimeout(slowMoDelay);
			clearInterval(randomShipInterval);
			clearInterval(hunterShipInterval);
			clearInterval(stalkerShipInterval);
			clearInterval(lifePupInterval);
			clearInterval(bulletPupInterval);
			clearInterval(blackBoxInterval);
			clearInterval(infectedShipInterval);
			exitReload = 0;
			score = 0;
			lives = 3;
			bulletSpeed = 0;
			bulletPower = 0;
			KeyboardBulletDelay = 10;
			RandomShipFleet = [];
			HunterFleet = [];
			StalkerFleet = [];
			bulletClip = [];
			LifePowerPack = [];
			BulletPowerPack = [];
			BlackBox = [];
			BHEnemys = [];
			InfectedFleet = [];
			LazerBattery = [];
			document.getElementById("title").style.display = "block";
			document.getElementById("score").style.display = "none";
			document.getElementById("exitGame").style.display = "none";

			if(menu == false && joystick != undefined && shootStick != undefined){

				joystick.destroy();
				shootStick.destroy();
			}
			menu = true;

			document.getElementById("shootStick").style.display = "none";
			document.getElementById("container").style.display = "none";

			//this will take you out of fullscreen mode
			if (document.exitFullscreen) {
                    document.exitFullscreen();
            }
			// } else if (document.msExitFullscreen) {
			// 		document.msExitFullscreen();
			// } else if (document.mozCancelFullScreen) {
			// 		document.mozCancelFullScreen();
			else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
			}
			
		}
		else if(canvas.width >= 350 && menu == false){

            document.getElementById("play").style.display = "none";

		}		
		 else if(canvas.width > 350 && canvas.width <= 595){
			
			document.getElementById("play").style.display = "inline-block";
            
			document.getElementById("highscore").style.display = "none";
			document.getElementById("desktopOptions").style.display = "none";

			if(menu == false){

				document.getElementById("shootStick").style.display = "inline-block";
				document.getElementById("container").style.display = "inline-block";
			}
			
			 if(exitReload == 1){

                document.getElementById("play").style.display = "none";
			 }
             //document.getElementById("rotWar").style.display = "none";
		 }
		 else if(canvas.width >= 596){

			document.getElementById("play").style.display = "inline-block";
            
			document.getElementById("highscore").style.display = "inline-block";
			document.getElementById("desktopOptions").style.display = "inline-block";
		 }	
		
		//console.log("Canvas Height " + canvas.height);		
		
		redraw();
	}
		
		//this is the players starting position. This is the center of the play area
		playerPositionX = canvas.width * .50;
		playerPositionY = canvas.height * .50;
		
		x = playerPositionX; //player 1 positioning
		y = playerPositionY;
		
        // This is the players velocity, speed, friction and an array of keys that are being pressed    
        let velY = 0,
            velX = 0,
            speed = 6,
            friction = 0.3, //0.98
            keys = [];
			
		let timeout;	

        function update() { //------------player movement with keyboard---------------------------------//
			
			//the update function does two things, draws the characters and enemies and tracks their movement positions
			
			//this will track what keys are pressed and will update the players position			
			
			//this is for the arrow keys control

            if (keys[87]) { // up arrow key[38] w key[87]
                if (velY > -speed) {
                    //velY -= 6;

					//shootStickDirX = "";
					//shootStickDirY = "up";

					if(slowMotion == true){

						velY -= (canvas.height) * 0.005;
					}
					else if(slowMotion == false){

						velY -= (canvas.height) * 0.01;
					}					
					
					//$("#result").html("X: " + x + " Y: " + y);
                }
				
			}

            if (keys[83]) { // down arrow key[40] s key[83]
                if (velY < speed) {
                    //velY += 6;

					//shootStickDirX = "";
					//shootStickDirY = "down";

					if(slowMotion == true){

						velY += (canvas.height) * 0.005;
					}
					else if(slowMotion == false){

						velY += (canvas.height) * 0.01;
					}
							
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[68]) { // right arrow key[39] a key[68]
                if (velX < speed) {
                    //velX += 6;

					//shootStickDirX = "right";
					//shootStickDirY = "";

					if(slowMotion == true){

						velX += (canvas.width) * 0.005;
					}
					else if(slowMotion == false){

						velX += (canvas.width) * 0.01;
					}
					
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[65]) { // left arrow key[37] d key[65]
                if (velX > -speed) {
                    //velX -= 6;

					//shootStickDirX = "left";
					//shootStickDirY = "";

					if(slowMotion == true){

						velX -= (canvas.width) * 0.005;
					}
					else if(slowMotion == false){

						velX -= (canvas.width) * 0.01;
					}

							
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }			

			if(keys[39] && keys[38]){ //arrow keys right up

				shootStickDirX = "right";
				shootStickDirY = "up";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
			}

			else if(keys[39] && keys[40]){ //arrow keys right down

				shootStickDirX = "right";
				shootStickDirY = "down";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
			}

			else if(keys[37] && keys[40]){ //arrow keys left down

				shootStickDirX = "left";
				shootStickDirY = "down";
	
				if(bulletPower == 0 && KeyboardBulletDelay == 10){
                    let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
			}

			else if(keys[37] && keys[38]){ //arrow keys left up

				shootStickDirX = "left";
				shootStickDirY = "up";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
			}

			else if (keys[37]) { // left arrow key[37] d key[65]

				shootStickDirX = "left";
				shootStickDirY = "";


				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
            }
			else if (keys[39]) { // right arrow key[39] a key[68]

				shootStickDirX = "right";
				shootStickDirY = "";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
            }
			else if (keys[40]) { // down arrow key[40] s key[83]

				shootStickDirX = "";
				shootStickDirY = "down";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
            }
			else if (keys[38]) { // up arrow key[38] w key[87]

				shootStickDirX = "";
				shootStickDirY = "up";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					let bullet = Object.assign({}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
            }

			document.body.addEventListener("keydown", function (e) { // these make the keyboard do
				keys[e.keyCode] = true;
			});
			document.body.addEventListener("keyup", function (e) {
				keys[e.keyCode] = false;

			});
			
			
			//-----------------player movement with keyboard end --------------------------------------------//
			
			
		
			
			
			
			//-----------------player movement with VirtualJoyStick.js Thank You!-------------------------------//
			
		if(joyTouch == true && exitReload == 0){
			
			if (joystick.up()) {
	
				joyDirY = "up";
				joyDirX = "";
						
				if (joystick.right()) {
						
					joyDirX = "right";

					}
						
					if (joystick.left()) {

						joyDirX = "left";

					}
				}

				if (joystick.down()) {

					joyDirY = "down";
					joyDirX = "";
						
					if (joystick.right()) {

						joyDirX = "right";
					}
					if (joystick.left()) {
						
						joyDirX = "left";
					}
				}
					
					
				if (joystick.right()) {

					joyDirX = "right";
					joyDirY = "";
						
					if(joystick.up()){
							
						joyDirY = "up";
					}
					if(joystick.down()){
							
						joyDirY = "down";
					}
						
				}
				if (joystick.left()) {

					joyDirX = "left";
					joyDirY = "";
						
					if(joystick.up()){
							
						joyDirY = "up";
					}
					if(joystick.down()){
							
						joyDirY = "down";
					}
				}
				
					//console.log(joyDirX);
					//console.log(joyDirY);
					
				if(joyDirX == "left" && joyDirY == "up"){
						
							//velX -= 6;
							//velY -= 6;

							if(slowMotion == true){

								velX -= (canvas.width) * 0.006;
								velY -= (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX -= (canvas.width) * 0.016;
								velY -= (canvas.height) * 0.016;
					 		}
						
					}
					else if(joyDirX == "left" && joyDirY == "down" ){
						
							//velY += 6;
							//velX -= 6;

							if(slowMotion == true){

								velX -= (canvas.width) * 0.006;
								velY += (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX -= (canvas.width) * 0.016;
								velY += (canvas.height) * 0.016;
					 		}
						
					}
					else if(joyDirY == "up" && joyDirX == "right"){
						
							//velY -= 6;
							//velX += 6;

							if(slowMotion == true){

								velX += (canvas.width) * 0.006;
								velY -= (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX += (canvas.width) * 0.016;
								velY -= (canvas.height) * 0.016;
					 		}
						
					}
					else if(joyDirY == "down" && joyDirX == "right"){
						
							//velY += 6;
							//velX += 6;

							if(slowMotion == true){

								velX += (canvas.width) * 0.006;
								velY += (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX += (canvas.width) * 0.016;
								velY += (canvas.height) * 0.016;
					 		}
						
					}
					else if(joyDirX == "left"){
						
							//velX -= 6;

							if(slowMotion == true){

								velX -= (canvas.width) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX -= (canvas.width) * 0.016;
					 		}		
						
					}
					else if(joyDirX == "right"){
						
							//velX += 6;

							if(slowMotion == true){

								velX += (canvas.width) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX += (canvas.width) * 0.016;
					 		}													
						
					}
					else if(joyDirY == "up"){
						
							//velY -= 6;

							if(slowMotion == true){

								velY -= (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velY -= (canvas.height) * 0.016;
					 		}									
						
					}
					else if(joyDirY == "down"){
						
							//velY += 6;

							if(slowMotion == true){

								velY += (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velY += (canvas.height) * 0.016;
					 		}									
						
					}
			
			}
			
			
			//------------------This is how the left joystick shoots ---------------------//
		if(shootStickTouch == true && exitReload == 0){
			
			
			if (shootStick.up()) {
	
				shootStickDirY = "up";
				shootStickDirX = "";
						
				if (shootStick.right()) {
						
					shootStickDirX = "right";

					}
						
					if (shootStick.left()) {

						shootStickDirX = "left";

					}
				}

				if (shootStick.down()) {

					shootStickDirY = "down";
					shootStickDirX = "";
						
					if (shootStick.right()) {

						shootStickDirX = "right";
					}
					if (shootStick.left()) {
						
						shootStickDirX = "left";
					}
				}
					
					
				if (shootStick.right()) {

					shootStickDirX = "right";
					shootStickDirY = "";
						
					if(shootStick.up()){
							
						shootStickDirY = "up";
					}
					if(shootStick.down()){
							
						shootStickDirY = "down";
					}
						
				}
				if (shootStick.left()) {

					shootStickDirX = "left";
					shootStickDirY = "";
						
					if(shootStick.up()){
							
						shootStickDirY = "up";
					}
					if(shootStick.down()){
							
						shootStickDirY = "down";
					}
				}
			}		
			//console.log(shootStickDirX);
			//console.log(shootStickDirY);
			
			
            velY *= friction; //friction and final positioning
            y += velY;
            velX *= friction;
            x += velX;
			
			
			if (x > canvas.width - playerSize) { // colision with game boarders x-axis playerSize is about 19.43999
                x = canvas.width - playerSize;
            } else if (x < playerSize) {
                x = playerSize + 2;
            }
			
			if (y > canvas.height - playerSize) { // colision with game boarders y-axis playerSize is about 19.43999
                y = canvas.height - playerSize;
            } else if (y < playerSize) {
                y = playerSize + 2;
            }
			
			
			
			
			
			
			
			
			//-----------This will detect colisions in the game--------------------//
			
			//this is a boiler plate colision test
			// if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
			// object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
			// 	// The objects are touching
			// }
			
			//this is a colision with the test ai guy
			// if (x < enemy.x + playerSize  && x + playerSize  > enemy.x &&
			// y < enemy.y + playerSize && y + playerSize > enemy.y) {
			// 	// The objects are touching
				
			// 	velX *= friction - 10; //this will stop the player from moving
			// 	velY *= friction - 10;
			// }
			
			
			
			//this part will draw the characters
            
			ctx.clearRect(0, 0, canvas.width, canvas.height); // this will clear and redraw the canvas for new values and positions
			
			

			// if(menu == false){
			
			// 	ctx.beginPath(); //this is the player
			// 	ctx.fillStyle = "#A23BEC";
			// 	ctx.arc(x, y, playerSize, 0, Math.PI * 2); // draw the player playerSize is about 19.43999
			// 	ctx.fill();
			// 	ctx.closePath();
			// }
						
            // ctx.beginPath(); // this is the ai guy
            // ctx.fillStyle = "black";
            // ctx.arc(target.Ex, target.Ey, playerSize, 0, Math.PI * 2); // draws the ai. ai has hard coded position
            // ctx.fill();
            // ctx.closePath();
			var flicker = Math.floor((Math.random() * 30) + 1);

			if(flicker == 15){

				borderBrightness = Math.floor((Math.random() * 60) + 30);

			}
			

			ctx.strokeStyle = 'hsl(' + borderHue + ',' + borderShade + '%, ' + borderBrightness + '%)';
			ctx.lineWidth = '5';
			ctx.strokeRect(0, 0, canvas.width, canvas.height);

            //document.getElementsByTagName("canvas")[1].style.display = "none";
            setTimeout(update, 28); //refresh the screen to update positions// was 30

			if(slowMotion == true){

				ctx.strokeStyle = 'hsl(' + slowHue + ',' + slowShade + '%, ' + slowBrightness + '%)';
				ctx.lineWidth = '20';
				ctx.strokeRect(0, 0, canvas.width, canvas.height);

				
				
			}
			else if(slowMotion == false){
				
				

				//ctx.clearRect(0, 0, canvas.width, canvas.height);

				

				slowBrightness = 60;
			}
			
			//----------------------------------------------------------
			draw();	//this draws all the enemies in the game area
			
			
				

        }
		
		
		
		var target = {
        	Ex: Math.round(Math.random() * (canvas.width * .90)),
       	    Ey: Math.round(Math.random() * (canvas.height * .90))
         };
		 
		 
		 var PlayerBullet = {
  			color: "yellow",
  			x: x,
  			y: y,
			directionX: shootStickDirX,
			directionY: shootStickDirY,
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, bulletSize, 0, Math.PI * 7);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make make the bullet move to the direction of the joystick
				if(this.directionX == "left" && this.directionY == "up"){
						
							//this.x -= 7;
							//this.y -= 7;

							if(slowMotion == true){

								this.x -= (canvas.width) * 0.009;
								this.y -= (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x -= (canvas.width) * 0.027;
								this.y -= (canvas.height) * 0.027;
					 		}										
						
					}
					else if(this.directionX == "left" && this.directionY == "down" ){
						
							//this.y += 7;
							//this.x -= 7;

							if(slowMotion == true){

								this.x -= (canvas.width) * 0.009;
								this.y += (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x -= (canvas.width) * 0.027;
								this.y += (canvas.height) * 0.027;
					 		}							
						
					}
					else if(this.directionX == "right" && this.directionY == "up"){
						
							//this.y -= 7;
							//this.x += 7;

							if(slowMotion == true){

								this.x += (canvas.width) * 0.009;
								this.y -= (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x += (canvas.width) * 0.027;
								this.y -= (canvas.height) * 0.027;
					 		}

							
						
					}
					else if(this.directionX == "right" && this.directionY == "down"){
						
							//this.y += 7;
							//this.x += 7;

							if(slowMotion == true){

								this.x += (canvas.width) * 0.009;
								this.y += (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x += (canvas.width) * 0.027;
								this.y += (canvas.height) * 0.027;
					 		}							
						
					}
					else if(this.directionX == "left"){
						
							//this.x -= 7;

							if(slowMotion == true){

								this.x -= (canvas.width) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x -= (canvas.width) * 0.027;
					 		}
						
					}
					else if(this.directionX == "right"){
						
							//this.x += 7;

							if(slowMotion == true){

								this.x += (canvas.width) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x += (canvas.width) * 0.027;
					 		}							
						
					}
					else if(this.directionY == "up"){
						
							//this.y -= 7;

							if(slowMotion == true){

								this.y -= (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.y -= (canvas.height) * 0.027;
					 		}						
						
					}
					else if(this.directionY == "down"){
						
							//this.y += 7;

							if(slowMotion == true){

								this.y += (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.y += (canvas.height) * 0.027;
					 		}						
					}


				for(var i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

						 //this will make direct the enemy move in the direction of the player at varying speeds and times
				  if(this.x < BlackBox[i].x && this.y < BlackBox[i].y){
					 
					 //this.x += 1;
					 //this.y += 1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0017;
					 	this.y += (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0037;
					 	this.y += (canvas.height) * 0.0037;
					 } 
					 
				 }
				 if(this.x > BlackBox[i].x && this.y > BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y -= 1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0017;
					 	this.y -= (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0037;
					 	this.y -= (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x && this.y < BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0017;
					 	this.y += (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0037;
					 	this.y += (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x && this.y < BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					 if(slowMotion == true){

						this.x += (canvas.width) * 0.0017;
					 	this.y -= (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0037;
					 	this.y -= (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0037;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0037;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0037;
					 } 

					 
				 } 
				 

			}
		}
				 
				 
			 },
			//  movementPC: function(){
				 
			// 	 console.log(mousePos.x)
			// 	 //this will make direct the enemy move in the direction of the player
			// 	 if(this.x < mousePos.x){
					 
			// 		 this.x += 7;
			// 	 }
			// 	 if(this.x >= mousePos.x){
					 
			// 		 this.x -= 7;
			// 	 }
			// 	 if(this.y <= mousePos.y){
					 
			// 		 this.y += 7;
			// 	 }
			// 	 if(this.y >= mousePos.y){
					 
			// 		 this.y -= 7;
			// 	 }
				 
				 
			//  }
			  
		};
		
		
		
		let RandomShip = {
  			color: "green",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			direction: Math.round(Math.random() * 7),
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make direct the enemy to move in a random location
				 
				 if(this.direction == 0){
					 //this.x -= 1.7;

					if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0048;
					 } 

					 
				 }
				 if(this.direction == 1){
					 //this.x += 1.7;


					if(slowMotion == true){

						 this.x += (canvas.width) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0048;
					 }
					 
				 }
				 if(this.direction == 2){
					 //this.y -= 1.7;


					if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0048;
					 }
				 
				 }
				 if(this.direction == 3){
					 //this.y += 1.7;


					if(slowMotion == true){

						 this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0048;
					 }
					 
				 }
				 if(this.direction == 4){
					 //this.y += 1.7;
					 //this.x += 1.7;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0015;
					 	this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0048;
					 	this.y += (canvas.height) * 0.0048;
					 }
				 }
				 if(this.direction == 5){
					 //this.y -= 1.7;
					 //this.x -= 1.7;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0015;
					 	this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0048;
					 	this.y -= (canvas.height) * 0.0048;
					 }
					
				 }
				 if(this.direction == 6){
					 //this.y += 1.7;
					 //this.x -= 1.7;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0015;
					 	this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0048;
					 	this.y += (canvas.height) * 0.0048;
					 }					 					 
				 }
				 if(this.direction == 7){
					 //this.y -= 1.7;
					 //this.x += 1.7;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0015;
					 	this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0048;
					 	this.y -= (canvas.height) * 0.0048;
					 }					 

				 }				 
				 //when an enemy hits the wall, this will check the direction it was moving and make it move the revirse direction
				if (this.direction == 1 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 0;
            	}
				else if (this.direction == 4 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 6;
            	}
				else if (this.direction == 7 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 5;
            	}
				else if (this.direction == 0 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 1;
            	}
				else if (this.direction == 5 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 7;
            	}
				else if (this.direction == 6 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 4;
            	}
				else if (this.direction == 3 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 2;
            	}
				else if (this.direction == 4 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 7;
            	}
				else if (this.direction == 6 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 5;
            	}    
				else if (this.direction == 2 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 3;
            	 }
				 else if (this.direction == 5 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 6;
            	 }
				  else if (this.direction == 7 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 4;
					
            	 }
				 
				 for(let i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

					}


				 }

			 }
			  
		};

		let InfectedShip = {
  			color: "blue",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			direction: Math.round(Math.random() * 7),
			size: playerSize,
			hp: 7,
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			//ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.rect(this.x,this.y,this.size,this.size);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 for(let i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 20)  && this.x + (playerSize * 20)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 20) && this.y + (playerSize * 20) > BlackBox[i].y) {

				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

					}


				 }

				 for(let i = 0; i < RandomShipFleet.length; i++){

				//this will make direct the enemy move in the direction of the player
				 if(this.x < RandomShipFleet[i].x){
					 
					 //this.x += 1.6;

					 if(slowMotion == true){

						 this.x += (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0024;
					 } 
				 
				 }
				 if(this.x > RandomShipFleet[i].x){
					 
					 //this.x -= 1.6;

					 if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0024;
					 } 
					 
				 }
				 if(this.y < RandomShipFleet[i].y){
					 
					 //this.y += 1.6;

					 if(slowMotion == true){

						 this.y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0024;
					 } 
					 
				 }
				 if(this.y > RandomShipFleet[i].y){
					 
					 //this.y -= 1.6;

					 if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0024;
					 } 
				 }

			}

			if(this.x < x){
					 
					 //this.x += 1.6;

					 if(slowMotion == true){

						 this.x += (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0024;
					 } 
				 
				 }
				 if(this.x > x){
					 
					 //this.x -= 1.6;

					 if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0024;
					 } 
					 
				 }
				 if(this.y < y){
					 
					 //this.y += 1.6;

					 if(slowMotion == true){

						 this.y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0024;
					 } 
					 
				 }
				 if(this.y > y){
					 
					 //this.y -= 1.6;

					 if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0024;
					 } 
				 }
			 }
			  
		};


		let BHjectile = {
			hue: 90,
			shade: Math.floor((Math.random() * 100) + 1),
			brightness: Math.floor((Math.random() * 100) + 1),
  			color: 'white',
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			direction: Math.round(Math.random() * 7),
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = 'hsl(' + this.hue + ',' + this.shade + '%, ' + this.brightness + '%)';
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make direct the enemy to move in a random location
				 
				 if(this.direction == 0){
					 //this.x -= 1.7;

					if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0020;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0060;
					 } 

					 
				 }
				 if(this.direction == 1){
					 //this.x += 1.7;


					if(slowMotion == true){

						 this.x += (canvas.width) * 0.0020;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0060;
					 }
					 
				 }
				 if(this.direction == 2){
					 //this.y -= 1.7;


					if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0060;
					 }
				 
				 }
				 if(this.direction == 3){
					 //this.y += 1.7;


					if(slowMotion == true){

						 this.y += (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0060;
					 }
					 
				 }
				 if(this.direction == 4){
					 //this.y += 1.7;
					 //this.x += 1.7;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0020;
					 	this.y += (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0060;
					 	this.y += (canvas.height) * 0.0060;
					 }
				 }
				 if(this.direction == 5){
					 //this.y -= 1.7;
					 //this.x -= 1.7;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0020;
					 	this.y -= (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0060;
					 	this.y -= (canvas.height) * 0.0060;
					 }
					
				 }
				 if(this.direction == 6){
					 //this.y += 1.7;
					 //this.x -= 1.7;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0020;
					 	this.y += (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0060;
					 	this.y += (canvas.height) * 0.0060;
					 }					 					 
				 }
				 if(this.direction == 7){
					 //this.y -= 1.7;
					 //this.x += 1.7;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0020;
					 	this.y -= (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0060;
					 	this.y -= (canvas.height) * 0.0060;
					 }					 

				 }				 
				 //when an enemy hits the wall, this will check the direction it was moving and make it move the revirse direction
				if (this.direction == 1 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 0;
            	}
				else if (this.direction == 4 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 6;
            	}
				else if (this.direction == 7 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 5;
            	}
				else if (this.direction == 0 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 1;
            	}
				else if (this.direction == 5 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 7;
            	}
				else if (this.direction == 6 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 4;
            	}
				else if (this.direction == 3 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 2;
            	}
				else if (this.direction == 4 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 7;
            	}
				else if (this.direction == 6 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 5;
            	}    
				else if (this.direction == 2 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 3;
            	 }
				 else if (this.direction == 5 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 6;
            	 }
				  else if (this.direction == 7 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 4;
					
            	 }
				 
				 for(let i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

						 
				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

					}


				 }

			 }
			  
		};

		let InfectedLazer = {
			hue: 0,
			shade: 69,
			brightness: Math.floor((Math.random() * 100) + 1),
  			color: 'white',
  			x: 50,
  			y: 50,
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = 'hsl(' + this.hue + ',' + this.shade + '%, ' + this.brightness + '%)';
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 for(let i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

						 
				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

					}


				 }

				 //this will make direct the enemy move in the direction of the player
				 if(this.x < x){
					 
					 //this.x += 1.6;

					 if(slowMotion == true){

						 this.x += (canvas.width) * 0.0025;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0070;
					 } 
				 
				 }
				 if(this.x > x){
					 
					 //this.x -= 1.6;

					 if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0025;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0070;
					 } 
					 
				 }
				 if(this.y < y){
					 
					 //this.y += 1.6;

					 if(slowMotion == true){

						 this.y += (canvas.height) * 0.0025;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0070;
					 } 
					 
				 }
				 if(this.y > y){
					 
					 //this.y -= 1.6;

					 if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0025;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0070;
					 } 
				 }
				 


			 }
			  
		};
		
		let Hunter = {
  			color: "orange",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){


				 	for(let i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

			}
			
		}
	 
				 //this will make direct the enemy move in the direction of the player
				 if(this.x < x){
					 
					 //this.x += 1.6;

					 if(slowMotion == true){

						 this.x += (canvas.width) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0044;
					 } 
				 
				 }
				 if(this.x > x){
					 
					 //this.x -= 1.6;

					 if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0044;
					 } 
					 
				 }
				 if(this.y < y){
					 
					 //this.y += 1.6;

					 if(slowMotion == true){

						 this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0044;
					 } 
					 
				 }
				 if(this.y > y){
					 
					 //this.y -= 1.6;

					 if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0044;
					 } 
				 }
				 
				 
	}
			  
};
		
		let Stalker = {
  			color: "red",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make direct the enemy move in the direction of the player at varying speeds and times
				  if(this.x < x && this.y < y){
					 
					 //this.x += 1;
					 //this.y += 1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0015;
					 	this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0035;
					 	this.y += (canvas.height) * 0.0035;
					 } 
					 
				 }
				 if(this.x > x && this.y > y){
					 
					 //this.x -= 1;
					 //this.y -= 1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0015;
					 	this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0035;
					 	this.y -= (canvas.height) * 0.0035;
					 } 

					 
				 }
				 if(this.x > x && this.y < y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0015;
					 	this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0035;
					 	this.y += (canvas.height) * 0.0035;
					 } 

					 
				 }
				 if(this.x > x && this.y < y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					 if(slowMotion == true){

						this.x += (canvas.width) * 0.0015;
					 	this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0035;
					 	this.y -= (canvas.height) * 0.0035;
					 } 

					 
				 }
				 if(this.x < x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 }


				for(let i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

						 //this will make direct the enemy move in the direction of the player at varying speeds and times//
				//   if(this.x < BlackBox[i].x && this.y < BlackBox[i].y){
					 
				// 	 //this.x += 1;
				// 	 //this.y += 1;

				// 	if(slowMotion == true){

				// 		this.x += (canvas.width) * 0.0017;
				// 	 	this.y += (canvas.height) * 0.0017;
				// 	 }
				// 	 else if(slowMotion == false){

				// 		this.x += (canvas.width) * 0.0037;
				// 	 	this.y += (canvas.height) * 0.0037;
				// 	 } 
					 
				//  }
				//  if(this.x > BlackBox[i].x && this.y > BlackBox[i].y){
					 
				// 	 //this.x -= 1;
				// 	 //this.y -= 1;

				// 	if(slowMotion == true){

				// 		this.x -= (canvas.width) * 0.0017;
				// 	 	this.y -= (canvas.height) * 0.0017;
				// 	 }
				// 	 else if(slowMotion == false){

				// 		this.x -= (canvas.width) * 0.0037;
				// 	 	this.y -= (canvas.height) * 0.0037;
				// 	 } 

					 
				//  }
				//  if(this.x > BlackBox[i].x && this.y < BlackBox[i].y){
					 
				// 	 //this.x -= 1;
				// 	 //this.y += 1;

				// 	if(slowMotion == true){

				// 		this.x -= (canvas.width) * 0.0017;
				// 	 	this.y += (canvas.height) * 0.0017;
				// 	 }
				// 	 else if(slowMotion == false){

				// 		this.x -= (canvas.width) * 0.0037;
				// 	 	this.y += (canvas.height) * 0.0037;
				// 	 } 

					 
				//  }
				//  if(this.x > BlackBox[i].x && this.y < BlackBox[i].y){
					 
				// 	 //this.x -= 1;
				// 	 //this.y += 1;

				// 	 if(slowMotion == true){

				// 		this.x += (canvas.width) * 0.0017;
				// 	 	this.y -= (canvas.height) * 0.0017;
				// 	 }
				// 	 else if(slowMotion == false){

				// 		this.x += (canvas.width) * 0.0037;
				// 	 	this.y -= (canvas.height) * 0.0037;
				// 	 } 

					 
				//  }
				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0037;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0037;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0037;
					 } 

					 
				 } 
				 

			}
		}


				 		 
			 }
			  
		};
		
		let LifePowerUp = {
  			color: "DarkGreen",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				 
				ctx.fillStyle = this.color;
				ctx.beginPath(); // this is the ai guy
				//ctx.moveTo(15, 15);
    			ctx.arc(this.x, this.y, bulletSize * 2.5, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				//ctx.stroke();
				ctx.font = "25px serif";
				ctx.textAlign = "center";
				ctx.fillStyle = "rgba(255, 255, 200, 1)";
				ctx.fillText("H",this.x,this.y + (0.63 * 10));
				//ctx.moveTo(0, 0);
				//ctx.fillStyle = "green";
				//ctx.stroke();
 			 }						  
		};
		
		let BulletPowerUp = {
  			color: "DarkSlateGray",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				 
				ctx.fillStyle = this.color;
				ctx.beginPath(); // this is the ai guy
				//ctx.moveTo(15, 15);
    			ctx.arc(this.x, this.y, bulletSize * 2.5, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				ctx.beginPath();
				//ctx.stroke();
				ctx.font = "25px serif";
				ctx.textAlign = "center";
				ctx.fillStyle = "rgba(255, 255, 200, 1)";
				ctx.fillText("BP",this.x,this.y + (0.60 * 10));
				//ctx.moveTo(0, 0);
				//ctx.fillStyle = "yellow";
				//ctx.stroke();
            	ctx.closePath();
				
				
 			 }						  
		};

		let BlackHole = {
  			color: "Black",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			hue: 120,
			size: playerSize * 2,
			hp: 15,
			multiplier: 2,
			shade: Math.floor((Math.random() * 100) + 1),
			brightness: Math.floor((Math.random() * 100) + 1),
 			draw: function() {
				 
				ctx.fillStyle = this.color;
				ctx.strokeStyle = 'hsl(' + this.hue + ',' + this.shade + '%, ' + this.brightness + '%)';
				ctx.beginPath(); // this is the ai guy
				ctx.lineWidth = '3';
    			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
 			 }						  
		};												
		
		function draw() {	
			
            animateStar();
            loop(); //draws all the fireworks and particals
			
			if(exitReload == 0){
			
			//console.log(exitReload);
			
			if(menu == false){
//*****************************This is the player************************************ */

				ctx.beginPath(); //this is the player
				ctx.fillStyle = "#A23BEC";
				ctx.arc(x, y, playerSize, 0, Math.PI * 2); // draw the player playerSize is about 19.43999
				ctx.fill();
				ctx.closePath();

//*****************************This is the player************************************ */
			}
			
															 						
			//enemy.draw();
			//this will loop through the list of RandomShip enemies
			for(let i = 0; i < RandomShipFleet.length; i++){
				
				RandomShipFleet[i].draw(); //this will draw the enemies as they are created
				RandomShipFleet[i].movement();//this will activate the enemies movement


				if(slowMoWatch == 30 && slowMotion == false){

					if (x < RandomShipFleet[i].x + (playerSize * 4)  && x + (playerSize * 4)  > RandomShipFleet[i].x &&
					y < RandomShipFleet[i].y + (playerSize * 4) && y + (playerSize * 4) > RandomShipFleet[i].y) {

						slowMo();
						
					}
				}

				if(RandomShipFleet[i] != undefined){

					if (RandomShipFleet[i].x > canvas.width - playerSize + 1) { // colision with game boarders x-axis playerSize is about 19.43999
						
						RandomShipFleet.splice(i, 1);
					} else if (RandomShipFleet[i].x < playerSize - 1) {
						
						RandomShipFleet.splice(i, 1);
					}

					if(RandomShipFleet[i].y != undefined){

						if (RandomShipFleet[i].y > canvas.height - playerSize + 1) { // colision with game boarders y-axis playerSize is about 19.43999
						
							RandomShipFleet.splice(i, 1);
						} else if (RandomShipFleet[i].y < playerSize - 1) {
							
							RandomShipFleet.splice(i, 1);
						}
					}
				}

					if(RandomShipFleet[i] != undefined){
					
					//this is a colision with the randomly spawning ai guys
					if (x < RandomShipFleet[i].x + playerSize  && x + playerSize  > RandomShipFleet[i].x &&
					y < RandomShipFleet[i].y + playerSize && y + playerSize > RandomShipFleet[i].y) {
						// The objects are touching
						
						velX *= friction - 2; //this will stop the player from moving
						velY *= friction - 2;
							
						lives -= 1;
						slowMo();
							
						if(bulletPower > 0){
								
							bulletPower -= 1;
						}
						else{
							bulletPower = 0;
						}
							
						if(shootStickTouch == false){
								
							shootStickTapEnd();
						}
						else{
							shootStickTapEnd();
							shootStickTap();
						}
							
						fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
						document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
							
						if(lives < 1){
									
							exitReload = 1;
							slowMotion = false;
							lives = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
						}
							
						RandomShipFleet.splice(i, 1); //this will destroy the enemy on colision with the player
					}
				}
								


				for(let b = 0; b < BlackBox.length; b++){

					
					if (RandomShipFleet[i].x < BlackBox[b].x + (playerSize * 3)  && RandomShipFleet[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 RandomShipFleet[i].y < BlackBox[b].y + (playerSize * 3) && RandomShipFleet[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;
						 RandomShipFleet.splice(i, 1); //this will destroy the enemy

					 }

				}
				
			}

			//this will loop through the list of InfectedShip enemies
			for(let i = 0; i < InfectedFleet.length; i++){
				
				InfectedFleet[i].draw(); //this will draw the enemies as they are created
				InfectedFleet[i].movement();//this will activate the enemies movement


				// if(slowMoWatch == 30 && slowMotion == false){

				// 	if (x < InfectedFleet[i].x + (InfectedFleet[i].size  * 4)  && x + (InfectedFleet[i].size  * 4)  > InfectedFleet[i].x &&
				// 	y < InfectedFleet[i].y + (InfectedFleet[i].size  * 4) && y + (InfectedFleet[i].size  * 4) > InfectedFleet[i].y) {

				// 		slowMo();
						
				// 	}
				// }

				if(InfectedFleet[i].size >= (playerSize * 4)){

                    let bigLazer = Object.assign({}, InfectedLazer);
					bigLazer.x = InfectedFleet[i].x + (InfectedFleet[i].size / 2);
					bigLazer.y = InfectedFleet[i].y + (InfectedFleet[i].size / 2);

					let launch = Math.floor((Math.random() * 70) + 1);

					if(launch == 35){

						LazerBattery.push(bigLazer);
					}
					

				}

				if(InfectedFleet[i].size >= (playerSize * 12)){
					
					InfectedFleet[i].size = (playerSize * 12);

				}

				for(let j = 0; j < RandomShipFleet.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (RandomShipFleet[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && RandomShipFleet[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					RandomShipFleet[j].y < InfectedFleet[i].y + InfectedFleet[i].size && RandomShipFleet[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						InfectedFleet[i].size += (playerSize / 2);
						//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
						InfectedFleet[i].hp += 2;
						RandomShipFleet.splice(j, 1);

					}

				}

				for(let j = 0; j < StalkerFleet.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (StalkerFleet[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && StalkerFleet[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					StalkerFleet[j].y < InfectedFleet[i].y + InfectedFleet[i].size && StalkerFleet[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						InfectedFleet[i].size += playerSize;
						//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
						InfectedFleet[i].hp += 3;
						StalkerFleet.splice(j, 1);

					}

				}

				for(let j = 0; j < HunterFleet.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (HunterFleet[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && HunterFleet[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					HunterFleet[j].y < InfectedFleet[i].y + InfectedFleet[i].size && HunterFleet[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						InfectedFleet[i].size += (playerSize / 2);
						//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
						InfectedFleet[i].hp += 3;
						HunterFleet.splice(j, 1);

					}

				}

				for(let j = 0; j < BHEnemys.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (BHEnemys[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && BHEnemys[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					BHEnemys[j].y < InfectedFleet[i].y + InfectedFleet[i].size && BHEnemys[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						InfectedFleet[i].size += playerSize;
						//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
						InfectedFleet[i].hp += 4;
						BHEnemys.splice(j, 1);

					}

				}

				for(let j = 0; j < InfectedFleet.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (InfectedFleet[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && InfectedFleet[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					InfectedFleet[j].y < InfectedFleet[i].y + InfectedFleet[i].size && InfectedFleet[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						if(InfectedFleet[i].size > InfectedFleet[j].size){

							InfectedFleet[i].size += playerSize;
							//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
							InfectedFleet[i].hp += 4;
							InfectedFleet.splice(j, 1);

						}						

					}

				}

				for(let k = 0; k < BulletPowerPack.length; k++){

					//this is a colision with the randomly spawning ai guys
					if (BulletPowerPack[k].x < InfectedFleet[i].x + InfectedFleet[i].size  && BulletPowerPack[k].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					BulletPowerPack[k].y < InfectedFleet[i].y + InfectedFleet[i].size && BulletPowerPack[k].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

							InfectedFleet[i].size += playerSize;
							//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
							InfectedFleet[i].hp += 4;
							BulletPowerPack.splice(k, 1);					

					}

				}

				for(let l = 0; l < LifePowerPack.length; l++){

					//this is a colision with the randomly spawning ai guys
					if (LifePowerPack[l].x < InfectedFleet[i].x + InfectedFleet[i].size  && LifePowerPack[l].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					LifePowerPack[l].y < InfectedFleet[i].y + InfectedFleet[i].size && LifePowerPack[l].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

							InfectedFleet[i].size += playerSize;
							//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
							InfectedFleet[i].hp += 4;
							LifePowerPack.splice(l, 1);						

					}

				}

								
				//this is a colision with the randomly spawning ai guys
				if (x < InfectedFleet[i].x + InfectedFleet[i].size  && x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
				y < InfectedFleet[i].y + InfectedFleet[i].size && y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					
					if(InfectedFleet[i].size >= (playerSize * 5)){

						lives -= 6;

					}
					else{

						lives -= 1;
					} 
					
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
                        shootStickTapEnd();
					}
					else{
                        shootStickTapEnd();
                        shootStickTap();
					}
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
					if(lives < 1){
							
							exitReload = 1;
							slowMotion = false;
							lives = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
						}
					
					InfectedFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				

				for(let b = 0; b < BlackBox.length; b++){

					
					if (InfectedFleet[i].x < BlackBox[b].x + ((InfectedFleet[i].size / 4) * 3)  && InfectedFleet[i].x + ((InfectedFleet[i].size / (playerSize / 4)) * 3)  > BlackBox[b].x &&
					 InfectedFleet[i].y < BlackBox[b].y + ((InfectedFleet[i].size / 4) * 3) && InfectedFleet[i].y + ((InfectedFleet[i].size / (playerSize / 4)) * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;

						 if(InfectedFleet[i].size > (playerSize * 5)){

							BlackBox[b].hp -= 15;

						}
						else{

							BlackBox[b].hp -= 10;
						} 

						 InfectedFleet.splice(i, 1); //this will destroy the enemy

					 }

				}
				
			}
			
			//this will loop through the list of Hunter enemies
			for(let i = 0; i < HunterFleet.length; i++){
				
				HunterFleet[i].draw(); //this will draw the enemies as they are created
				HunterFleet[i].movement();//this will activate the enemies movement

				if(slowMoWatch == 30 && slowMotion == false){

					if (x < HunterFleet[i].x + (playerSize * 4)  && x + (playerSize * 4)  > HunterFleet[i].x &&
					y < HunterFleet[i].y + (playerSize * 4) && y + (playerSize * 4) > HunterFleet[i].y) {

						slowMo();
					}
				}
								
				//this is a colision with the randomly spawning ai guys
				if (x < HunterFleet[i].x + playerSize  && x + playerSize  > HunterFleet[i].x &&
				y < HunterFleet[i].y + playerSize && y + playerSize > HunterFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					lives -= 1;
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
                        shootStickTapEnd();
					}
					else{
                        shootStickTapEnd();
                        shootStickTap();
					}
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							slowMotion = false;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
						}
					
					HunterFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}

				for(let b = 0; b < BlackBox.length; b++){

					
					if (HunterFleet[i].x < BlackBox[b].x + (playerSize * 3)  && HunterFleet[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 HunterFleet[i].y < BlackBox[b].y + (playerSize * 3) && HunterFleet[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;
						 HunterFleet.splice(i, 1); //this will destroy the enemy on colision with the player

					 }

				}
				
				// if (HunterFleet[i].x > canvas.width) { // colision with game boarders x-axis playerSize is about 19.43999
				
				// 	HunterFleet.splice(i, 1);
            	// } else if (HunterFleet[i].x < playerSize) {
				
				// 	HunterFleet.splice(i, 1);
            	// }
			
				// if (HunterFleet[i].y > canvas.height) { // colision with game boarders y-axis playerSize is about 19.43999
				
				// 	HunterFleet.splice(i, 1);
            	// } else if (HunterFleet[i].y < playerSize) {
				
				// 	HunterFleet.splice(i, 1);
            	// }
				
			}

			//this will loop through the list of Hunter enemies
			for(let i = 0; i < LazerBattery.length; i++){
				
				LazerBattery[i].draw(); //this will draw the enemies as they are created
				LazerBattery[i].movement();//this will activate the enemies movement
				LazerBattery[i].brightness = Math.floor((Math.random() * 100) + 1);	

				if(slowMoWatch == 30 && slowMotion == false){

					if (x < LazerBattery[i].x + (playerSize * 4)  && x + (playerSize * 4)  > LazerBattery[i].x &&
					y < LazerBattery[i].y + (playerSize * 4) && y + (playerSize * 4) > LazerBattery[i].y) {

						slowMo();
					}
				}
								
				//this is a colision with the randomly spawning ai guys
				if (x < LazerBattery[i].x + playerSize  && x + playerSize  > LazerBattery[i].x &&
				y < LazerBattery[i].y + playerSize && y + playerSize > LazerBattery[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					lives -= 2;
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
                        
                        shootStickTapEnd();
					}
					else{
                        shootStickTapEnd();
                        shootStickTap();
					}
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							slowMotion = false;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
						}
					
					LazerBattery.splice(i, 1); //this will destroy the enemy on colision with the player
				}

				for(let b = 0; b < BlackBox.length; b++){

					
					if (LazerBattery[i].x < BlackBox[b].x + (playerSize * 3)  && LazerBattery[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 LazerBattery[i].y < BlackBox[b].y + (playerSize * 3) && LazerBattery[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 2;
						 LazerBattery.splice(i, 1); //this will destroy the enemy on colision with the player

					 }

				}
				
				// if (HunterFleet[i].x > canvas.width) { // colision with game boarders x-axis playerSize is about 19.43999
				
				// 	HunterFleet.splice(i, 1);
            	// } else if (HunterFleet[i].x < playerSize) {
				
				// 	HunterFleet.splice(i, 1);
            	// }
			
				// if (HunterFleet[i].y > canvas.height) { // colision with game boarders y-axis playerSize is about 19.43999
				
				// 	HunterFleet.splice(i, 1);
            	// } else if (HunterFleet[i].y < playerSize) {
				
				// 	HunterFleet.splice(i, 1);
            	// }
				
			}
			
			//this will loop through the list of Stalker enemies
			for(let i = 0; i < StalkerFleet.length; i++){
				
				StalkerFleet[i].draw(); //this will draw the enemies as they are created
				StalkerFleet[i].movement();//this will activate the enemies movement


				if(slowMoWatch == 30 && slowMotion == false){

					if (x < StalkerFleet[i].x + (playerSize * 4)  && x + (playerSize * 4)  > StalkerFleet[i].x &&
					y < StalkerFleet[i].y + (playerSize * 4) && y + (playerSize * 4) > StalkerFleet[i].y) {

						slowMo();
					}
				}

								
				//this is a colision with the randomly spawning ai guys
				if (x < StalkerFleet[i].x + playerSize  && x + playerSize  > StalkerFleet[i].x &&
				y < StalkerFleet[i].y + playerSize && y + playerSize > StalkerFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;					
					lives -= 1;
					slowMo();
					
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
                        shootStickTapEnd();
					}
					else{
                        shootStickTapEnd();
                        shootStickTap();
					}
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
					if(lives < 1){
							
							exitReload = 1;
							slowMotion = false;
							lives = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
						}
					
					StalkerFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}

				for(let b = 0; b < BlackBox.length; b++){

					
					if (StalkerFleet[i].x < BlackBox[b].x + (playerSize * 3)  && StalkerFleet[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 StalkerFleet[i].y < BlackBox[b].y + (playerSize * 3) && StalkerFleet[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;
						 StalkerFleet.splice(i, 1); //this will destroy the enemy on colision with the player

					 }

				}
				
				// if (StalkerFleet[i].x > canvas.width - playerSize + 1) { // colision with game boarders x-axis playerSize is about 19.43999
				
				// 	StalkerFleet.splice(i, 1);
            	// } else if (StalkerFleet[i].x < playerSize - 1) {
				
				// 	StalkerFleet.splice(i, 1);
            	// }
			
				// if (StalkerFleet[i].y > canvas.height - playerSize + 1) { // colision with game boarders y-axis playerSize is about 19.43999
				
				// 	StalkerFleet.splice(i, 1);
            	// } else if (StalkerFleet[i].y < playerSize - 1) {
				
				// 	StalkerFleet.splice(i, 1);
            	// }
				
			}

			for(let i = 0; i < BHEnemys.length; i++){

				BHEnemys[i].draw();
				BHEnemys[i].hue = Math.floor((Math.random() * 120) + 1);
				BHEnemys[i].shade = Math.floor((Math.random() * 100) + 1);
				BHEnemys[i].brightness = Math.floor((Math.random() * 100) + 1);	
				BHEnemys[i].movement();//this will activate the enemies movement
				


				if(slowMoWatch == 30 && slowMotion == false){

					if (x < BHEnemys[i].x + (playerSize * 4)  && x + (playerSize * 4)  > BHEnemys[i].x &&
					y < BHEnemys[i].y + (playerSize * 4) && y + (playerSize * 4) > BHEnemys[i].y) {

						slowMo();
						
					}
				}
								
				//this is a colision with the randomly spawning ai guys
				if (x < BHEnemys[i].x + playerSize  && x + playerSize  > BHEnemys[i].x &&
				y < BHEnemys[i].y + playerSize && y + playerSize > BHEnemys[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					
					lives -= 1;
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
                        shootStickTapEnd();
					}
					else{
                        shootStickTapEnd();
                        shootStickTap();
					}
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							slowMotion = false;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
						}
					
					BHEnemys.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				if (BHEnemys[i].x > canvas.width - playerSize + 1) { // colision with game boarders x-axis playerSize is about 19.43999
				
					BHEnemys.splice(i, 1);
            	} else if (BHEnemys[i].x < playerSize - 1) {
				
					BHEnemys.splice(i, 1);
            	}
			
				if (BHEnemys[i].y > canvas.height - playerSize + 1) { // colision with game boarders y-axis playerSize is about 19.43999
				
					BHEnemys.splice(i, 1);
            	} else if (BHEnemys[i].y < playerSize - 1) {
				
					BHEnemys.splice(i, 1);
            	}

				for(let b = 0; b < BlackBox.length; b++){

					
					if (BHEnemys[i].x < BlackBox[b].x + (playerSize * 3)  && BHEnemys[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 BHEnemys[i].y < BlackBox[b].y + (playerSize * 3) && BHEnemys[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;
						 BHEnemys.splice(i, 1); //this will destroy the enemy

					 }

				}



			}

			//this will loop through the list of black holes
			for(let i = 0; i < BlackBox.length; i++){
				
				BlackBox[i].draw(); //this will draw the life black holes as they are created
				BlackBox[i].hue = Math.floor((Math.random() * 120) + 1);
				BlackBox[i].shade = Math.floor((Math.random() * 100) + 1);
				BlackBox[i].brightness = Math.floor((Math.random() * 100) + 1);																								

				if(BlackBox[i].hp < 7){

					let size = Math.floor(Math.random() * 2) + 1;

					if(size == 1){
						
						BlackBox[i].size = playerSize * 2;

					}
					else if(size == 2){

						BlackBox[i].size = playerSize * 3;
					}

				}
				if(BlackBox[i].hp <= 2){

					let size = Math.floor(Math.random() * 4) + 1;
					
					if(size == 1){
						
						BlackBox[i].size = playerSize;
						fireworks.push( new WCFirework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );

					}
					else if(size == 2){
						
						BlackBox[i].size = playerSize * 2;

					}
					else if(size == 3){
						
						BlackBox[i].size = playerSize * 3;

					}
					else if(size == 4){

						BlackBox[i].size = playerSize * 4;
					}

				}
								
				//this is a colision with the player and the black hole
				if (x < BlackBox[i].x + (playerSize * 2)  && x + (playerSize * 2)  > BlackBox[i].x &&
				y < BlackBox[i].y + (playerSize * 2) && y + (playerSize * 2) > BlackBox[i].y) {
					// The objects are touching
				
					lives -= 2;

					fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );
					fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );
					
					document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
					if(lives < 1){
							
							exitReload = 1;
							slowMotion = false;
							lives = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
						}
					
					BlackBox.splice(i, 1); //this will destroy the enemy on colision with the player
				}


			//when the player is flying close to the black hole

			if (x < BlackBox[i].x + (playerSize * 17)  && x + (playerSize * 17)  > BlackBox[i].x &&
			y < BlackBox[i].y + (playerSize * 17) && y + (playerSize * 17) > BlackBox[i].y) {

				//this will make make the player move towards the black hole

				  if(x < BlackBox[i].x && y < BlackBox[i].y){
					 
					 //this.x += 1;
					 //this.y += 1;

					if(slowMotion == true){

						x += (canvas.width) * 0.0010;
					 	y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						x += (canvas.width) * 0.0020;
					 	y += (canvas.height) * 0.0020;
					 } 
					 
				 }
				 if(x > BlackBox[i].x && y > BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y -= 1;

					if(slowMotion == true){

						x -= (canvas.width) * 0.0010;
					 	y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						x -= (canvas.width) * 0.0020;
					 	y -= (canvas.height) * 0.0020;
					 } 

					 
				 }
				 if(x > BlackBox[i].x && y < BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					if(slowMotion == true){

						x -= (canvas.width) * 0.0010;
					 	y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						x -= (canvas.width) * 0.0020;
					 	y += (canvas.height) * 0.0020;
					 } 

					 
				 }
				 if(x > BlackBox[i].x && y < BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					 if(slowMotion == true){

						x += (canvas.width) * 0.0010;
					 	y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						x += (canvas.width) * 0.0020;
					 	y -= (canvas.height) * 0.0020;
					 } 

					 
				 }
				 if(x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						x += (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						x += (canvas.width) * 0.0020;
					 } 

					 
				 }
				 if(y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						y -= (canvas.height) * 0.0020;
					 } 

					 
				 }
				 if(x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						x -= (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						x -= (canvas.width) * 0.0020;
					 } 

					 
				 }
				 if(y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						y += (canvas.height) * 0.0020;
					 } 

					 
				 }


				}

				 if(BlackBox[i].hp < 1){

					slowMo();
					let superNova = 4;
					//superNova == true;
					BlackBox[i].size = playerSize * 4;
					BlackBox[i].hp = 0;
					//BlackBox.splice(i, 1);
					//clearTimeout(collapse);

					//black hole collapse animation
						if(superNova == 4){

							BlackBox[i].size = playerSize * 4;
							superNova = 3;

								if(superNova == 3){

									BlackBox[i].size = playerSize * 3;
									superNova = 2;									

										if(superNova == 2){

											BlackBox[i].size = playerSize * 2;
											superNova = 1;
											
												
												if(superNova == 1){

													//BlackBox[i].size = playerSize * 4;
													BlackBox[i].size = playerSize;
													
													

													for(let k = 0; k <= 14; k++){

                                                        let Enemy5 = Object.assign({}, BHjectile);
														Enemy5.x = BlackBox[i].x;
														Enemy5.y = BlackBox[i].y;
														Enemy5.direction = Math.round(Math.random() * 7)
														BHEnemys.push(Enemy5);

													}

													BlackBox.splice(i, 1);

													// setTimeout(function() {

														
													// 	BlackBox.splice(i, 1);

													// }, 700);
													
													
													
												}

										}

								}

						}					

				}
				//end of animation

			}
			
			//draws the bullets and makes them move
			for(let j = 0; j < bulletClip.length; j++){
					
					bulletClip[j].draw();
					bulletClip[j].movement();					
					
				if (bulletClip[j].x > canvas.width - playerSize) { // colision with game boarders x-axis playerSize is about 19.43999
					
					fireworks.push( new WCFirework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				} else if (bulletClip[j].x < playerSize) {
					
					fireworks.push( new WCFirework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				}
				
				else if (bulletClip[j].y > canvas.height - playerSize) { // colision with game boarders y-axis playerSize is about 19.43999
					
					fireworks.push( new WCFirework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				} else if (bulletClip[j].y < playerSize) {
					
					fireworks.push( new WCFirework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				}
					
			}
									
			//this is what detects colisions for bullets and RandomShip enemys
			for(let j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(let i = 0; i < RandomShipFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys

					if(bulletClip[j] != undefined){

						if (bulletClip[j].x < RandomShipFleet[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > RandomShipFleet[i].x &&
						bulletClip[j].y < RandomShipFleet[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > RandomShipFleet[i].y) {
						// The objects are touching
						
						score += 1;
						//loop();
						fireworks.push( new Firework( canvas.width / 2, canvas.height, RandomShipFleet[i].x, RandomShipFleet[i].y ) );

						timerTick = 0;
						document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
				
						RandomShipFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
						bulletClip.splice(j, 1);
						
					 	}
					}
				
					
				}
			
			}

			//this is what detects colisions for bullets and RandomShip enemys
			for(let j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(let i = 0; i < InfectedFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys

					if(bulletClip[j] != undefined){
				
						if (bulletClip[j].x < InfectedFleet[i].x + (InfectedFleet[i].size)  && bulletClip[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
						bulletClip[j].y < InfectedFleet[i].y + (InfectedFleet[i].size) && bulletClip[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {
							// The objects are touching
							
							score += 1;
							InfectedFleet[i].hp -= 1;
							//loop();
							fireworks.push( new Firework( canvas.width / 2, canvas.height, (InfectedFleet[i].x + (InfectedFleet[i].size / 2) ), (InfectedFleet[i].y + (InfectedFleet[i].size / 2) ) ));

							timerTick = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;

							if(InfectedFleet[i].hp < 1){

								InfectedFleet[i].size = playerSize;
								fireworks.push( new Firework( canvas.width / 2, canvas.height, InfectedFleet[i].x, InfectedFleet[i].y ) );
								fireworks.push( new Firework( canvas.width / 2, canvas.height, InfectedFleet[i].x, InfectedFleet[i].y ) );
								InfectedFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet

							}

							//InfectedFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
							bulletClip.splice(j, 1);
							
						}
					}
				}
			
			}

			//this is what detects colisions for bullets and BHEnemys enemys
			for(let j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(let i = 0; i < BHEnemys.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys

					if(bulletClip[j] != undefined){
				
						if (bulletClip[j].x < BHEnemys[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > BHEnemys[i].x &&
						bulletClip[j].y < BHEnemys[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > BHEnemys[i].y) {
							// The objects are touching
							
							score += 1;
							//loop();
							fireworks.push( new Firework( canvas.width / 2, canvas.height, BHEnemys[i].x, BHEnemys[i].y ) );

							timerTick = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
							BHEnemys.splice(i, 1); //this will destroy the enemy on colision with the bullet
							bulletClip.splice(j, 1);
							
						}
					}
				}
			
			}
			
			//this is what detects colisions for bullets and Hunter enemys
			for(let j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(let i = 0; i < HunterFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys

					if(bulletClip[j] != undefined){
				
						if (bulletClip[j].x < HunterFleet[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > HunterFleet[i].x &&
						bulletClip[j].y < HunterFleet[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > HunterFleet[i].y) {
							// The objects are touching
							
							score += 2;
							//loop();
							fireworks.push( new Firework( canvas.width / 2, canvas.height, HunterFleet[i].x, HunterFleet[i].y ) );
							timerTick = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
							HunterFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
							bulletClip.splice(j, 1);
							
						}
					}
				}
			
			}

			//this is what detects colisions for bullets and Big Lazer enemys
			for(let j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(let i = 0; i < LazerBattery.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys

					if(bulletClip[j] != undefined){
				
						if (bulletClip[j].x < LazerBattery[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > LazerBattery[i].x &&
						bulletClip[j].y < LazerBattery[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > LazerBattery[i].y) {
							// The objects are touching
							
							score += 2;
							//loop();
							fireworks.push( new Firework( canvas.width / 2, canvas.height, LazerBattery[i].x, LazerBattery[i].y ) );
							timerTick = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
							LazerBattery.splice(i, 1); //this will destroy the enemy on colision with the bullet
							bulletClip.splice(j, 1);
							
						}
					}
				}
			
			}
			
			//this is what detects colisions for bullets and Stalker enemys
			for(let j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(let i = 0; i < StalkerFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys

					if(bulletClip[j] != undefined){
				
						if (bulletClip[j].x < StalkerFleet[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > StalkerFleet[i].x &&
						bulletClip[j].y < StalkerFleet[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > StalkerFleet[i].y) {
							// The objects are touching
							
							score += 3;
							
							fireworks.push( new Firework( canvas.width / 2, canvas.height, StalkerFleet[i].x, StalkerFleet[i].y ) );
							timerTick = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
							StalkerFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
							bulletClip.splice(j, 1);
							
						}
					}
				}
			
			}

			//this is what detects colisions for bullets and RandomShip enemys
			for(let j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(let i = 0; i < BlackBox.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys

					if(bulletClip[j] != undefined){
				
						if (bulletClip[j].x < BlackBox[i].x + (bulletSize * 7)  && bulletClip[j].x + (bulletSize * 7)  > BlackBox[i].x &&
						bulletClip[j].y < BlackBox[i].y + (bulletSize * 7) && bulletClip[j].y + (bulletSize * 7) > BlackBox[i].y) {
							// The objects are touching
							
							BlackBox[i].hp -= 1;
							score += 1;
							//loop();
							fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );
							fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );

							timerTick = 0;
							document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;

							bulletClip.splice(j, 1);

							//BlackBox[i].size = playerSize * 3;
							//clearTimeout(jump);

							// var jump = setTimeout(function() {
								
							// 	BlackBox[i].size = playerSize * 2;
							// 	//clearTimeout(jump);

							// }, 100);
							BlackBox[i].size = playerSize;
							BlackBox[i].size = playerSize * 2;

						}
					}
				}
			
			}
			
			
			//this will loop through the list of lives power ups
			for(let i = 0; i < LifePowerPack.length; i++){
				
				LifePowerPack[i].draw(); //this will draw the life power up as they are created
								
				//this is a colision with the player and the power up
				if (x < LifePowerPack[i].x + (playerSize * 2)  && x + (playerSize * 2)  > LifePowerPack[i].x &&
				y < LifePowerPack[i].y + (playerSize * 2) && y + (playerSize * 2) > LifePowerPack[i].y) {
					// The objects are touching
				
					//velX *= friction - 2; //this will stop the player from moving
					//velY *= friction - 2;
					lives += 1;//(Math.round( 0.5 * 10 ) / 10);
					score += 10;
					//lives.toFixed(1);
					document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
					// if(lives == 0){
							
					// 		exitReload = 1;
					// 	}
					
					LifePowerPack.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
			// 	if (LifePowerPack[j].x > canvas.width - bulletSize) { // colision with game boarders x-axis playerSize is about 19.43999
					
			// 		LifePowerPack.splice(j, 1);
			// 	} else if (LifePowerPack[j].x < bulletSize) {
					
			// 		LifePowerPack.splice(j, 1);
			// 	}
				
			// 	else if (LifePowerPack[j].y > canvas.height - bulletSize) { // colision with game boarders y-axis playerSize is about 19.43999
					
			// 		LifePowerPack.splice(j, 1);
			// 	} else if (LifePowerPack[j].y < bulletSize) {
					
			// 		LifePowerPack.splice(j, 1);
			// 	}
				
			 }
			 
			 			//this will loop through the list of lives power ups
			for(let i = 0; i < BulletPowerPack.length; i++){
				
				BulletPowerPack[i].draw(); //this will draw the life power up as they are created
								
				//this is a colision with the player and the power up
				if (x < BulletPowerPack[i].x + (playerSize * 2)  && x + (playerSize * 2)  > BulletPowerPack[i].x &&
				y < BulletPowerPack[i].y + (playerSize * 2) && y + (playerSize * 2) > BulletPowerPack[i].y) {
					// The objects are touching
				
					//velX *= friction - 2; //this will stop the player from moving
					//velY *= friction - 2;
					bulletPower += 2;
					score += 10;
					if(shootStickTouch == false){
						
                        shootStickTapEnd();
					}
					else{
                        shootStickTapEnd();
                        shootStickTap();
					}
					
					//console.log(shootStickTouch);
					
					
					//clearInterval(bulletLoop);
					//lives.toFixed(1);
					document.getElementById("score").innerHTML = "Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower;
					
					// if(lives == 0){
							
					// 		exitReload = 1;
					// 	}
					
					BulletPowerPack.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
			// 	if (LifePowerPack[j].x > canvas.width - bulletSize) { // colision with game boarders x-axis playerSize is about 19.43999
					
			// 		LifePowerPack.splice(j, 1);
			// 	} else if (LifePowerPack[j].x < bulletSize) {
					
			// 		LifePowerPack.splice(j, 1);
			// 	}
				
			// 	else if (LifePowerPack[j].y > canvas.height - bulletSize) { // colision with game boarders y-axis playerSize is about 19.43999
					
			// 		LifePowerPack.splice(j, 1);
			// 	} else if (LifePowerPack[j].y < bulletSize) {
					
			// 		LifePowerPack.splice(j, 1);
			// 	}
				
			 }
			
			
			
			}
			
			else{
				
				x = canvas.width * 0.50;
				y = canvas.height * 0.50;

				document.getElementById("restartBtn").style.display = "inline-block";
				
				
			}
			
			
			
			//animateStar();	
			 
			//console.log(entities);  
		}
		
	//gets the mouse position
	function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	  
	  function BulletsFire(){
			
			bulletLoop = setInterval(function(){
					
                let bullet = Object.assign({}, PlayerBullet);
				bullet.directionX = shootStickDirX;
				bullet.directionY = shootStickDirY;
				bullet.x = x;
				bullet.y = y;
				
				//Enemy1.x = Math.round(Math.random() * (canvas.width * .95));
				//Enemy1.y = Math.round(Math.random() * (canvas.height * .95));
				//Enemy1.direction = Math.round(Math.random() * 7);
				bulletClip.push(bullet);
				//console.log(bulletClip);
				
			}, bulletSpeed);
			
		}

		function slowMo(){

			
			slowMotion = true;

				setTimeout(function() {

					slowBrightness += 10; //value: 70
					//console.log(slowBrightness);


				}, 500);

				setTimeout(function() {
						
					slowBrightness += 10; //value: 80
					//console.log(slowBrightness);

				}, 1000);

				setTimeout(function() {
				
					slowBrightness += 10; //value: 90
					//console.log(slowBrightness);

				}, 1500);

				setTimeout(function() {
						
					slowBrightness -= 10; // value: 80;
					//console.log(slowBrightness);

				}, 2000);
				setTimeout(function() {
						
					slowBrightness -= 10; //value: 70
					//console.log(slowBrightness);

				}, 2500);
				setTimeout(function() {
						
					slowBrightness -= 10; //value: 60
					//console.log(slowBrightness);

				}, 3000);
				setTimeout(function() {
					
					slowBrightness -= 10; //value: 50
					//console.log(slowBrightness);

				}, 3500);
				setTimeout(function() {

					slowBrightness -= 10; //value: 40;
					//console.log(slowBrightness);

				}, 4000);
				setTimeout(function() {
						
					slowBrightness -= 10; //value: 30
					//console.log(slowBrightness);

				}, 4500);
				setTimeout(function() {

					slowBrightness += 10; //value: 40
					//console.log(slowBrightness);

				}, 5000);
				setTimeout(function() {

					slowBrightness += 10; //value: 50
					//console.log(slowBrightness);

				}, 5500);

				slowMoDelay = setTimeout(function() {
				
					slowMotion = false;

				}, 6000);

				
				//console.log(slowBrightness);		
			
		}

		function slowMoGenerator(){

			setInterval(function(){

				slowMoWatch = Math.round(Math.random() * 60);
				//console.log(slowMoWatch);

			}, 30);

		}
		slowMoGenerator();
		
		
        
		
       
		
			
		
		
		//----------------------------------Explosion-----------------------------------//
		
		


//get a random number within a range
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
function calculateDistance( p1x, p1y, p2x, p2y ) {
	let xDistance = p1x - p2x,
			yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create firework
function Firework( sx, sy, tx, ty ) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;
	// distance from starting point to target
	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
	this.distanceTraveled = 0;
	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 2;//5
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 5;//5
	this.acceleration = 500;//500
	this.brightness = random( 50, 99 );//random( 50, 70 );
	// circle target indicator radius
	this.targetRadius = 30; //1
}

// create firework
function WCFirework( sx, sy, tx, ty ) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;
	// distance from starting point to target
	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
	this.distanceTraveled = 0;
	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 2;//5
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 5;//5
	this.acceleration = 500;//500
	this.brightness = random( 50, 99 );//random( 50, 70 );
	// circle target indicator radius
	this.targetRadius = 10; //1
}

// create firework
function TitleFirework( sx, sy, tx, ty ) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;
	// distance from starting point to target
	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
	this.distanceTraveled = 0;
	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 2;//5
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 5;//5
	this.acceleration = 500;//500
	this.brightness = random( 50, 99 );//random( 50, 70 );
	// circle target indicator radius
	this.targetRadius = 45; //1
}



// update firework
Firework.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	
	// cycle the circle target indicator radius
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	// speed up the firework
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	let vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	// how far will the firework have traveled with velocities applied?
	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
	
	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
	if( this.distanceTraveled >= this.distanceToTarget ) {
		createParticles( this.tx, this.ty );
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// update firework
TitleFirework.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	
	// cycle the circle target indicator radius
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	// speed up the firework
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	let vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	// how far will the firework have traveled with velocities applied?
	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
	
	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
	if( this.distanceTraveled >= this.distanceToTarget ) {
		createTitleParticles( this.tx, this.ty );
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// update firework
WCFirework.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	
	// cycle the circle target indicator radius
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	// speed up the firework
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	let vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	// how far will the firework have traveled with velocities applied?
	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
	
	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
	if( this.distanceTraveled >= this.distanceToTarget ) {
		createWCParticles( this.tx, this.ty );
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// draw firework
Firework.prototype.draw = function() {
	ctx1.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx1.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx1.lineTo( this.x, this.y );
	ctx1.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx1.stroke();
	
	ctx1.beginPath();
	// draw the target for this firework with a pulsing circle
	ctx1.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
	ctx1.stroke();
}

// draw firework
WCFirework.prototype.draw = function() {
	ctx1.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx1.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx1.lineTo( this.x, this.y );
	ctx1.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx1.stroke();
	
	ctx1.beginPath();
	// draw the target for this firework with a pulsing circle
	ctx1.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
	ctx1.stroke();
}

// draw firework
TitleFirework.prototype.draw = function() {
	ctx1.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx1.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx1.lineTo( this.x, this.y );
	ctx1.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx1.stroke();
	
	ctx1.beginPath();
	// draw the target for this firework with a pulsing circle
	ctx1.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
	ctx1.stroke();
}

// create particle
function Particle( x, y ) {
	this.x = x;
	this.y = y;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 1;//5
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a random angle in all possible directions, in radians
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 1, 20 );
	// friction will slow the particle down
	this.friction = 0.95;
	// gravity will be applied and pull the particle down
	this.gravity = 1;
	// set the hue to a random number +-20 of the overall hue variable
	this.hue = random( hue - 20, hue + 20 );
	this.brightness = random( 60, 90 );//50,80
	this.alpha = 1;
	// set how fast the particle fades out
	this.decay = random( 0.015, 0.01 );
}

// update particle
Particle.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	// slow down the particle
	this.speed *= this.friction;
	// apply velocity
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	// fade out the particle
	this.alpha -= this.decay;
	
	// remove the particle once the alpha is low enough, based on the passed in index
	if( this.alpha <= this.decay ) {
		particles.splice( index, 1 );
	}
}

// draw particle
Particle.prototype.draw = function() {
	ctx1. beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx1.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx1.lineTo( this.x, this.y );
	ctx1.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx1.stroke();
}

// create particle group/explosion
function createParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	let particleCount = 5;//125
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// create particle group/explosion
function createWCParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	let particleCount = 3;//125
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// create particle group/explosion
function createTitleParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	let particleCount = 10;//7
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// main demo loop
function loop() {
	// this function will run endlessly with requestAnimationFrame
	//requestAnimFrame(); //loop was in there
	
	// increase the hue to get different colored fireworks over time
	hue += 0.3;
	
	//new explosion style, thicker particles
	ctx.lineWidth = 3;
	
	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	//ctx1.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	//ctx1.fillStyle = 'rgba(0, 0, 0, 0)';
	//ctx1.fillRect( 0, 0, canvas.width, canvas.height );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	//ctx1.globalCompositeOperation = 'lighter';
	
	// loop over each firework, draw it, update it
    let i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].draw();
		fireworks[ i ].update( i );
	}
	
	// loop over each particle, draw it, update it
	let j = particles.length;
	while( j-- ) {
		particles[ j ].draw();
		particles[ j ].update( j );
	}
	
	// launch fireworks automatically to random coordinates, when the mouse isn't down
	if(menu == true){
	
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
			fireworks.push( new TitleFirework( canvas.width / 2, canvas.height, random( 0, canvas.width ), random( 0, canvas.height / 2 ) ) );
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
	}
	
	// // limit the rate at which fireworks get launched when mouse is down
	// if( limiterTick >= limiterTotal ) {
	// 	if( mousedown ) {
	// 		// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
	// 		fireworks.push( new Firework( cw / 500, ch, mx, my ) );
	// 		limiterTick = 0;
	// 	}
	// } else {
	// 	limiterTick++;
	// }
    
}



// mouse event bindings
// update the mouse coordinates on mousemove
// canvas1.addEventListener( 'mousemove', function(e) {
// 	mx = e.pageX - canvas1.offsetLeft;
// 	my = e.pageY - canvas1.offsetTop;
// });

// // toggle mousedown state and prevent canvas from being selected
// canvas1.addEventListener( 'mousedown', function(e) {
// 	e.preventDefault();
// 	mousedown = true;
// });

// canvas1.addEventListener( 'mouseup', function( e ) {
// 	e.preventDefault();
// 	mousedown = false;
// });

// once the window loads, we are ready for some fireworks!

//fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );


//-------------------------This is where the star background begins, Thank you WillemCrnlssn for the inspiration----------------------------------//

function animateStar() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(function(i){

        /**
         * Draw a star
         * 
         * This function draws a star.
         * 
         */

        ctx2.rotate((Math.PI * 1 / 10));
        
        // Save the context
        ctx2.save();
        
        // move into the middle of the canvas, just to make room
        ctx2.translate(i.x, i.y);
        
        // Change the opacity
        if(i.opacity > 1) {
            i.factor = -1;
        }
        else if(i.opacity <= 0) {
            i.factor = 1;
            
            i.x = Math.round(Math.random() * canvas.width);
            i.y = Math.round(Math.random() * canvas.height);
        }
            
        i.opacity += i.increment * i.factor;
        
        ctx2.beginPath()
        for (let j = 5; j--;) {
            ctx2.lineTo(0, i.length);
            ctx2.translate(0, i.length);
            ctx2.rotate((Math.PI * 2 / 10));
            ctx2.lineTo(0, - i.length);
            ctx2.translate(0, - i.length);
            ctx2.rotate(-(Math.PI * 6 / 10));
        }
        ctx2.lineTo(0, i.length);
        ctx2.closePath();
        ctx2.fillStyle = "rgba(255, 255, 200, " + i.opacity + ")";
        ctx2.shadowBlur = 5;
        ctx2.shadowColor = '#ffff33';
        ctx2.fill();
        
        ctx2.restore();
        });
}

function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
    this.increment = Math.random() * .03;
}


//---------------An attempt of engine thrust-------------------//



//*********************************************************************************************************//
//********************************** Virtual Joystick Prototype Start *************************************//
//*********************************************************************************************************//

function VirtualJoystick(opt){

	//console.log(opt);

	let opts			= opt			|| {};
	this._container		= opts.container	|| document.body;
	this._strokeStyle	= opts.strokeStyle	|| 'white';//'#333333';// this changes the color of the joystick
	this._stickEl		= opts.stickElement	|| _buildJoystickStick(this._strokeStyle);
	this._baseEl		= opts.baseElement	|| _buildJoystickBase(this._baseEl);
	this._mouseSupport	= opts.mouseSupport !== undefined ? opts.mouseSupport : false;
	this._stationaryBase	= opts.stationaryBase || false;
	this._baseX		= this._stickX = opts.baseX || 0;
	this._baseY		= this._stickY = opts.baseY || 0;
	this._limitStickTravel	= opts.limitStickTravel || false;
	this._stickRadius	= opts.stickRadius !== undefined ? opts.stickRadius : 100;
	this._useCssTransform	= opts.useCssTransform !== undefined ? opts.useCssTransform : false;

	//console.log(this._stickEl);

	this._container.style.position	= "absolute";

			this._container.appendChild(this._baseEl);
			this._baseEl.style.position	= "absolute";
			this._baseEl.style.display	= "none";
			this._baseEl.style.border = "1px solid white";
			this._baseEl.style.borderRadius = "50px";
			this._container.appendChild(this._stickEl);
			this._stickEl.style.position	= "absolute";
			this._stickEl.style.display	= "none";

			this._pressed	= false;
			this._touchIdx	= null;
			
			if(this._stationaryBase === true){
				this._baseEl.style.display	= "";
				this._baseEl.style.left		= (this._baseX - this._baseEl.width /2)+"px";
				this._baseEl.style.top		= (this._baseY - this._baseEl.height/2)+"px";
			}
			
			this._transform	= this._useCssTransform ? this._getTransformProperty() : false;
			this._has3d	= true;
			
			 function __bind(fn, me){ return function(){ return fn.apply(me, arguments); }; };
			this._$onTouchStart	= __bind(this._onTouchStart	, this);
			this._$onTouchEnd	= __bind(this._onTouchEnd	, this);
			this._$onTouchMove	= __bind(this._onTouchMove	, this);
			this._container.addEventListener( 'touchstart'	, this._$onTouchStart	, false );
			this._container.addEventListener( 'touchend'	, this._$onTouchEnd	, false );
			this._container.addEventListener( 'touchmove'	, this._$onTouchMove	, false );
			if( this._mouseSupport ){
				this._$onMouseDown	= __bind(this._onMouseDown	, this);
				this._$onMouseUp	= __bind(this._onMouseUp	, this);
				this._$onMouseMove	= __bind(this._onMouseMove	, this);
				this._container.addEventListener( 'mousedown'	, this._$onMouseDown	, false );
				this._container.addEventListener( 'mouseup'	, this._$onMouseUp	, false );
				this._container.addEventListener( 'mousemove'	, this._$onMouseMove	, false );
			}
}


VirtualJoystick.prototype.destroy	= function()
		{
			this._container.removeChild(this._baseEl);
			this._container.removeChild(this._stickEl);

			this._container.removeEventListener( 'touchstart'	, this._$onTouchStart	, false );
			this._container.removeEventListener( 'touchend'		, this._$onTouchEnd	, false );
			this._container.removeEventListener( 'touchmove'	, this._$onTouchMove	, false );
			if( this._mouseSupport ){
				this._container.removeEventListener( 'mouseup'		, this._$onMouseUp	, false );
				this._container.removeEventListener( 'mousedown'	, this._$onMouseDown	, false );
				this._container.removeEventListener( 'mousemove'	, this._$onMouseMove	, false );
			}
		}

		;(function(destObj){
			destObj.addEventListener	= function(event, fct){
				if(this._events === undefined) 	this._events	= {};
				this._events[event] = this._events[event]	|| [];
				this._events[event].push(fct);
				return fct;
			};
			destObj.removeEventListener	= function(event, fct){
				if(this._events === undefined) 	this._events	= {};
				if( event in this._events === false  )	return;
				this._events[event].splice(this._events[event].indexOf(fct), 1);
			};
			destObj.dispatchEvent		= function(event /* , args... */){
				if(this._events === undefined) 	this._events	= {};
				if( this._events[event] === undefined )	return;
				let tmpArray	= this._events[event].slice(); 
				for(let i = 0; i < tmpArray.length; i++){
					let result	= tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
					if( result !== undefined )	return result;
				}
				return undefined
			};
		})(VirtualJoystick.prototype);

		//////////////////////////////////////////////////////////////////////////////////
		//										//
		//////////////////////////////////////////////////////////////////////////////////

		VirtualJoystick.prototype.deltaX	= function(){ return this._stickX - this._baseX;	}
		VirtualJoystick.prototype.deltaY	= function(){ return this._stickY - this._baseY;	}

		VirtualJoystick.prototype.up	= function(){
			if( this._pressed === false )	return false;
			let deltaX	= this.deltaX();
			let deltaY	= this.deltaY();
			if( deltaY >= 0 )				return false;
			if( Math.abs(deltaX) > 2*Math.abs(deltaY) )	return false;
			return true;
		}
		VirtualJoystick.prototype.down	= function(){
			if( this._pressed === false )	return false;
			let deltaX	= this.deltaX();
			let deltaY	= this.deltaY();
			if( deltaY <= 0 )				return false;
			if( Math.abs(deltaX) > 2*Math.abs(deltaY) )	return false;
			return true;	
		}
		VirtualJoystick.prototype.right	= function(){
			if( this._pressed === false )	return false;
			let deltaX	= this.deltaX();
			let deltaY	= this.deltaY();
			if( deltaX <= 0 )				return false;
			if( Math.abs(deltaY) > 2*Math.abs(deltaX) )	return false;
			return true;	
		}
		VirtualJoystick.prototype.left	= function(){
			if( this._pressed === false )	return false;
			let deltaX	= this.deltaX();
			let deltaY	= this.deltaY();
			if( deltaX >= 0 )				return false;
			if( Math.abs(deltaY) > 2*Math.abs(deltaX) )	return false;
			return true;	
		}

		//////////////////////////////////////////////////////////////////////////////////
		//										//
		//////////////////////////////////////////////////////////////////////////////////

		VirtualJoystick.prototype._onUp	= function()
		{
			this._pressed	= false; 
			this._stickEl.style.display	= "none";
			
			if(this._stationaryBase == false){	
				this._baseEl.style.display	= "none";
			
				this._baseX	= this._baseY	= 0;
				this._stickX	= this._stickY	= 0;
			}
		}

		VirtualJoystick.prototype._onDown	= function(x, y)
		{
			this._pressed	= true; 
			if(this._stationaryBase == false){
				this._baseX	= x;
				this._baseY	= y;
				this._baseEl.style.display	= "";
				this._move(this._baseEl.style, (this._baseX - this._baseEl.width /2), (this._baseY - this._baseEl.height/2));
			}
			
			this._stickX	= x;
			this._stickY	= y;
			
			if(this._limitStickTravel === true){
				let deltaX	= this.deltaX();
				let deltaY	= this.deltaY();
				let stickDistance = Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) );
				if(stickDistance > this._stickRadius){
					let stickNormalizedX = deltaX / stickDistance;
					let stickNormalizedY = deltaY / stickDistance;
					
					this._stickX = stickNormalizedX * this._stickRadius + this._baseX;
					this._stickY = stickNormalizedY * this._stickRadius + this._baseY;
				} 	
			}
			
			this._stickEl.style.display	= "";
			this._move(this._stickEl.style, (this._stickX - this._stickEl.width /2), (this._stickY - this._stickEl.height/2));	
		}

		VirtualJoystick.prototype._onMove	= function(x, y)
		{
			if( this._pressed === true ){
				this._stickX	= x;
				this._stickY	= y;
				
				if(this._limitStickTravel === true){
					let deltaX	= this.deltaX();
					let deltaY	= this.deltaY();
					let stickDistance = Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) );
					if(stickDistance > this._stickRadius){
						let stickNormalizedX = deltaX / stickDistance;
						let stickNormalizedY = deltaY / stickDistance;
					
						this._stickX = stickNormalizedX * this._stickRadius + this._baseX;
						this._stickY = stickNormalizedY * this._stickRadius + this._baseY;
					} 		
				}
				
					this._move(this._stickEl.style, (this._stickX - this._stickEl.width /2), (this._stickY - this._stickEl.height/2));	
			}	
		}


		//////////////////////////////////////////////////////////////////////////////////
		//		bind touch events (and mouse events for debug)			//
		//////////////////////////////////////////////////////////////////////////////////

		VirtualJoystick.prototype._onMouseUp	= function(event)
		{
			return this._onUp();
		}

		VirtualJoystick.prototype._onMouseDown	= function(event)
		{
			event.preventDefault();
			let x	= event.clientX;
			let y	= event.clientY;
			return this._onDown(x, y);
		}

		VirtualJoystick.prototype._onMouseMove	= function(event)
		{
			let x	= event.clientX;
			let y	= event.clientY;
			return this._onMove(x, y);
		}

		//////////////////////////////////////////////////////////////////////////////////
		//		comment								//
		//////////////////////////////////////////////////////////////////////////////////

		VirtualJoystick.prototype._onTouchStart	= function(event)
		{
			// if there is already a touch inprogress do nothing
			if( this._touchIdx !== null )	return;

			// notify event for validation
			let isValid	= this.dispatchEvent('touchStartValidation', event);
			if( isValid === false )	return;
			
			// dispatch touchStart
			this.dispatchEvent('touchStart', event);

			event.preventDefault();
			// get the first who changed
			let touch	= event.changedTouches[0];
			// set the touchIdx of this joystick
			this._touchIdx	= touch.identifier;

			// forward the action
			let x		= touch.pageX;
			let y		= touch.pageY;
			return this._onDown(x, y)
		}

		VirtualJoystick.prototype._onTouchEnd	= function(event)
		{
			// if there is no touch in progress, do nothing
			if( this._touchIdx === null )	return;

			// dispatch touchEnd
			this.dispatchEvent('touchEnd', event);

			// try to find our touch event
			let touchList	= event.changedTouches;
			for(let i = 0; i < touchList.length && touchList[i].identifier !== this._touchIdx; i++){

				// if touch event isnt found, 
			if( i === touchList.length)	{return}
			}
			

			// reset touchIdx - mark it as no-touch-in-progress
			this._touchIdx	= null;

		//??????
		// no preventDefault to get click event on ios
		event.preventDefault();

			return this._onUp()
		}

		VirtualJoystick.prototype._onTouchMove	= function(event)
		{
			// if there is no touch in progress, do nothing
			if( this._touchIdx === null )	return;

			// try to find our touch event
			let touchList	= event.changedTouches;
			for(var i = 0; i < touchList.length && touchList[i].identifier !== this._touchIdx; i++ );
			// if touch event with the proper identifier isnt found, do nothing
			if( i === touchList.length)	return;
			var touch	= touchList[i];

			event.preventDefault();

			var x		= touch.pageX;
			var y		= touch.pageY;
			return this._onMove(x, y)
		}


		//////////////////////////////////////////////////////////////////////////////////
		//		build default stickEl and baseEl				//
		//////////////////////////////////////////////////////////////////////////////////

		/**
		 * build the canvas for joystick base
		 */
		function _buildJoystickBase(stroke)
		{
			let canvas	= document.createElement( 'canvas' );
			canvas.width	= 50; //126 //100
			canvas.height	= 50; //126 //100
			
			let ctx		= canvas.getContext('2d');
			ctx.beginPath(); 
			ctx.strokeStyle = stroke; 
			ctx.lineWidth	= 3; //6				//40
			ctx.arc( canvas.width/2, canvas.width/2, 23, 0, Math.PI*2, true); 
			ctx.stroke();	

			ctx.beginPath(); 
			ctx.strokeStyle	= stroke; 
			ctx.lineWidth	= 2; 					//60
			ctx.arc( canvas.width/2, canvas.width/2, 33, 0, Math.PI*2, true); 
			ctx.stroke();
			
			return canvas;
		}

		/**
		 * build the canvas for joystick stick
		 */
		function _buildJoystickStick(stroke)
		{
			let canvas	= document.createElement( 'canvas' );
			canvas.width	= 86;
			canvas.height	= 86;
			let ctx		= canvas.getContext('2d');
			ctx.beginPath(); 
			ctx.strokeStyle	= stroke; 
			ctx.lineWidth	= 6; 
			ctx.arc( canvas.width/2, canvas.width/2, 40, 0, Math.PI*2, true); 
			ctx.stroke();
			return canvas;
		}

		//////////////////////////////////////////////////////////////////////////////////
		//		move using translate3d method with fallback to translate > 'top' and 'left'		
		//      modified from https://github.com/component/translate and dependents
		//////////////////////////////////////////////////////////////////////////////////

		VirtualJoystick.prototype._move = function(style, x, y)
		{
			if (this._transform) {
				if (this._has3d) {
					style[this._transform] = 'translate3d(' + x + 'px,' + y + 'px, 0)';
				} else {
					style[this._transform] = 'translate(' + x + 'px,' + y + 'px)';
				}
			} else {
				style.left = x + 'px';
				style.top = y + 'px';
			}
		}

		VirtualJoystick.prototype._getTransformProperty = function() 
		{
			let styles = [
				'webkitTransform',
				'MozTransform',
				'msTransform',
				'OTransform',
				'transform'
			];

			let el = document.createElement('p');
			let style;

			for (let i = 0; i < styles.length; i++) {
				style = styles[i];
				if (null != el.style[style]) {
					return style;
				}
			}         
		}
		
		// VirtualJoystick.prototype._check3D = function() 
		// {        
		// 	var prop = this._getTransformProperty();
		// 	// IE8<= doesn't have `getComputedStyle`
		// 	if (!prop || !window.getComputedStyle) return module.exports = false;

		// 	var map = {
		// 		webkitTransform: '-webkit-transform',
		// 		OTransform: '-o-transform',
		// 		msTransform: '-ms-transform',
		// 		MozTransform: '-moz-transform',
		// 		transform: 'transform'
		// 	};

		// 	// from: https://gist.github.com/lorenzopolidori/3794226
		// 	var el = document.createElement('div');
		// 	el.style[prop] = 'translate3d(1px,1px,1px)';
		// 	document.body.insertBefore(el, null);
		// 	var val = getComputedStyle(el).getPropertyValue(map[prop]);
		// 	document.body.removeChild(el);
		// 	var exports = null != val && val.length && 'none' != val;
		// 	return exports;
		// }

	


		
	//loop();
	update();// sets the main loop into motion
});
        
	}
	

}