/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	Stores components (update, render) to be used in the game loop
	
	@param "context" 2D drawing context of the canvas
*/
class GameEngine {
	constructor(context) {
		this.updateEntities = [];
		this.renderEntities = [];
		this.ctx = context;
		this.max_entities = 100;
		
		this.realtimeFPS = 30;
		this.lastFrame = Date.now();
		this.lastCalc = Date.now();
		this.fpsCalcDelay = 750;
		
		this.game_loop;
		this.running = false;
		this.paused = false;
		this.lastPause = 0;
		this.pauseTimer = 500;
		
		//Add the WORLD
		WORLD = new TileEngine();
		this.renderEntities.push(WORLD);
		this.updateEntities.push(WORLD);
		
		//Add the PLAYER
		PLAYER = new Player(10, 230, WORLD.currentMapArray);
		this.renderEntities.push(PLAYER);
		this.updateEntities.push(PLAYER);
	}
	
	/* Method used to reset the game */
	toggleGameLoop() {
		clearInterval(this.game_loop);
		this.running = !this.running;
		
		if(this.running) {
			//Reset the game
			this.resetEngine();
			
			/* Game Loop Variables */
			var _this = this;
			var currentFrame;
			
			/* Game Loop */
			this.game_loop = setInterval(function() {
				/* FPS Calculator */
				currentFrame = Date.now()
				if((currentFrame - _this.lastCalc) >= _this.fpsCalcDelay) {
					_this.realtimeFPS = Math.floor(1000 / (currentFrame - _this.lastFrame));
					_this.lastCalc = currentFrame;
				}
				_this.lastFrame = currentFrame;
				
				/* Game Logic */
				_this.update(); //Update has to continue to run if the game is paused because if it didn't run they would not be able to unpause it. Check update method to understand
				if(!_this.paused) _this.renderFrame();
			}, (1000/FPS));
		}
	}

	/* Draws each entity in its current state to the canvas */
	renderFrame() {
		this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
		for(var i = 0; i < this.renderEntities.length; i++) {
			this.renderEntities[i].render(this.ctx);
		}
		
		/* Top left overlay for FPS/Health/Ammo */
		//Containing Box
		this.ctx.fillStyle = "#7a35d8";
		this.ctx.fillRect(0, 0, 101, 51);
		this.ctx.fillStyle = "#4b198f";
		this.ctx.fillRect(0, 0, 100, 50);
		
		//Display FPS
		this.ctx.font = "14px sans-serif";
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillText("FPS: " + this.realtimeFPS, 5, 15);
		
		//Display Health
		this.ctx.fillText("Health:", 5, 30);
		this.ctx.fillStyle = "#7a35d8";
		this.ctx.strokeRect(55, 20, 40, 11);
		this.ctx.fillRect(56, 21, (39 / PLAYER.maxHealth) * PLAYER.health, 10);
		
		//Display Ammo
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillText("Ammo:", 5, 45);
		this.ctx.fillStyle = "#7a35d8";
		this.ctx.strokeRect(55, 35, 40, 11);
		this.ctx.fillRect(56, 36, (39 / PLAYER.maxAmmo) * PLAYER.ammo, 10);
	}
	
	/* Updates various aspects of the game and entities */
	update() {
		//Check for game pause/unpause
		if(CURRENTKEYS[27] && (Date.now() - this.lastPause) >= this.pauseTimer) {
			this.togglePauseScreen();
		}
		
		//Update entities if the game is not paused
		if(!this.paused) {
			for(var i = 0; i < this.updateEntities.length; i++) {
				this.updateEntities[i].update();
			}
		}
	}
	
	/*
		Adds an entity into the game engine
		
		@param "obj" Entity to add
		@param "renderable" If the entity has a render method this is true, else false
		@param "updatable" If the entity has an update method this is true, else false
		@return Boolean depending on outcome of function
	*/
	addEntity(obj, renderable, updatable) {
		if(renderable) {
			if((this.renderEntities.length + 1) <= this.max_entities &&
			typeof obj.render === "function") {
				this.renderEntities.push(obj);
			}
			else return false;
		}
		
		if(updatable) {
			if((this.updateEntities.length + 1) <= this.max_entities &&
			typeof obj.update === "function") {
				this.updateEntities.push(obj);
			}
			else return false;
		}
		
		return true;
	}
	
	/*
		Removes an entity from the game engine
		
		@param "obj" Entity to remove
		@param "renderable" If the entity has a render method this is true, else false
		@param "updatable" If the entity has an update method this is true, else false
		@return Boolean depending on outcome of function
	*/
	removeEntity(obj, render, update) {
		var renderObj = this.renderEntities.indexOf(obj);
		var updateObj = this.updateEntities.indexOf(obj);
		
		if(renderObj == -1 && updateObj == -1) {
			return false;
		}
		
		if(render && renderObj != -1) {
			this.renderEntities.splice(renderObj, 1);
		}
		
		if(update && updateObj != -1) {
			this.updateEntities.splice(updateObj, 1);
		}
		
		return true;
	}
	
	/* Method used to debug the current entities being rendered by the Game Engine */
	getRenderEntities(type = null) {
		if(type == null) return this.renderEntities;
		else {
			var returnedEntities = [];
			
			for(var i = 0; i < this.renderEntities.length; i++) {
				if(this.renderEntities[i] instanceof type) returnedEntities.push(this.renderEntities[i]);
			}
			
			return returnedEntities;
		}
	}
	
	/* Method used to reset the variables used by Game Engine */
	resetEngine() {
		this.updateEntities = [];
		this.renderEntities = [];
		
		this.realtimeFPS = 30;
		this.lastFrame = Date.now();
		this.lastCalc = Date.now();
		this.fpsCalcDelay = 750;
		
		this.paused = false;
		this.lastPause = 0;
		this.pauseTimer = 500;
		
		//Add the WORLD
		WORLD = new TileEngine();
		this.renderEntities.push(WORLD);
		this.updateEntities.push(WORLD);
		
		//Add the PLAYER
		PLAYER = new Player(10, 230, WORLD.currentMapArray);
		this.renderEntities.push(PLAYER);
		this.updateEntities.push(PLAYER);
	}
	
	/* Method that toggles the pause function and the pause screen */
	togglePauseScreen() {
		this.lastPause = Date.now();
		this.paused = !this.paused;
		
		if(this.paused) {
			document.getElementById("pauseScreen").style.display = "inline";
			document.getElementById("mainDisplay").style.display = "none";
		}
		else {
			document.getElementById("pauseScreen").style.display = "none";
			document.getElementById("mainDisplay").style.display = "inline";
		}
	}
	
	/*
	Memory Management - Deleting Objects
	
	@param(s) "[object, render boolean, update boolean]" This function takes a variable amount of arguments in
				an array format. The first index of the array should contain a reference to the object, the second
				index is a boolean tied to whether or not the object should be removed from the rendering data of
				the game engine, and the third index is a boolean tied to whether or not the object should be removed
				from the updating data of the game engine.
	
	@example
	var myObject = new Object(foo, bar, baz);
	GAME_ENGINE.addEntity(myObject, true, true); <-- Add myObject to the game engine as renderable and updatable data
	
	... myObject does stuff...
	
	GAME_ENGINE.deleteEntity([myObject, true, true]); <-- After myObject is not needed anymore, it can be deleted from data
	*/
	deleteEntity() {
		for(var i = 0; i < arguments.length; i++) {
			GAME_ENGINE.removeEntity(arguments[i][0], arguments[i][1], arguments[i][2]);
		}
	}
	
	/* Debugging */
	renderEntityCount() { return this.renderEntities.length; }
	updateEntityCount() { return this.updateEntities.length; }
}