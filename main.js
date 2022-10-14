/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

window.onload = function() {
	//Canvas Configuration
	var canvas = document.getElementById("mainDisplay");
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = CANVAS_WIDTH;
	ctx.canvas.height = CANVAS_HEIGHT;
	
	//Keybinding Listeners
	document.body.addEventListener("keydown", function (e) {
		//Preventing Certain Keys from Affecting the Browser
		if(PREVENTKEYDEFAULTS.indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	
		CURRENTKEYS[e.keyCode] = true;
	});
	document.body.addEventListener("keyup", function (e) {
		CURRENTKEYS[e.keyCode] = false;
	});
	
	//Initialize Game Engine
	GAME_ENGINE = new GameEngine(ctx);
	
	/* Below is the code for handling buttons on various screens */
	/* General Buttons That Appear on Multiple Screens */
	//Main Menu Button
	var mainMenuButtons = document.getElementsByClassName("returnToMainMenuButton");
	
	for(var i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].addEventListener("click", function() {
			if(document.getElementById("pauseScreen").style.display == "inline") {
				if(confirm("Are you sure you want to return to the main menu? You will lose your current progress.")) {
					GAME_ENGINE.toggleGameLoop();
					document.getElementById("pauseScreen").style.display = "none";
					document.getElementById("splashScreen").style.display = "inline";
				}
			}
			else {
				document.getElementById("gameOverScreen").style.display = "none";
				document.getElementById("winScreen").style.display = "none";
				document.getElementById("splashScreen").style.display = "inline";
			}
		}, false);
	}
	
	/* Splash Screen */
	//Start Button
	document.getElementById("startButton").onclick = function() {
		document.getElementById("splashScreen").style.display = "none";
		document.getElementById("mainDisplay").style.display = "inline";
		GAME_ENGINE.toggleGameLoop();
	}
	
	/* Pause Menu */
	//Return to Game Button
	document.getElementById("returnToGameButton").onclick = function() {
		GAME_ENGINE.togglePauseScreen();
	}
};