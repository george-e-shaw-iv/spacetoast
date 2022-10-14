/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	Main players class

	@param "x" Positional x-coord
	@param "y" Positional y-coord
*/
class Player {
	constructor(x, y, tilemap) {
		this.x = x;
		this.y = y;
		this.width = 60;
		this.height = 48;
		this.hitboxModifier = 10; //Shrinks the hitbox for collision purposes on both sides of player
		
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.speed = 5;
		this.friction = 0.80;
		
		this.maxHealth = 10
		this.health = this.maxHealth;
		this.alive = true;
		
		this.maxAmmo = 50;
		this.ammo = this.maxAmmo;
		this.damage = 2;
		
		this.shootingOffset = 100; //.1 secs
		this.shootingTimer = Date.now();
		
		this.tilemap = tilemap;
		this.collision = new Collision();
		
		//Directions relating to the region of the sprite map (character_animation.png)
		this.direction = {
			right: 1,
			left: -1
		};
		this.currentDirection = this.direction.right;

		//Afterburner
		this.verticalBurner = false;
		this.horizontalBurner = false;
	}
	
	/*
		Renders the current state of the tileEngine based off of maps and currentMapIndex
		
		@param "ctx" 2D Canvas drawing context
	*/
	render(ctx) {
		GFX_PLAYER.render(ctx, this.x, this.y, 0);
		
		//Handle vertical afterburner
		if(this.verticalBurner) {
			GFX_PLAYER_AFTERBURN.render(ctx, this.x + (this.width / 2) - (GFX_PLAYER_AFTERBURN.width / 2), this.y + this.height + GFX_PLAYER_AFTERBURN.width - 1, 270);
		}
		
		//Handle horizontal afterburner
		if(this.horizontalBurner) {
			switch(this.currentDirection) {
				case this.direction.right:
					GFX_PLAYER_AFTERBURN.render(ctx, this.x - GFX_PLAYER_AFTERBURN.width, this.y + (this.height / 2) - (GFX_PLAYER_AFTERBURN.width / 2), 0);
					break;
				case this.direction.left:
					GFX_PLAYER_AFTERBURN.render(ctx, this.x + this.width + GFX_PLAYER_AFTERBURN.width, this.y + this.height - GFX_PLAYER_AFTERBURN.width, 180);
					break;
				default:
					break;
			}
		}
	}
	
	/* Handles Character Keybinds and Movement */
	update() {
		if(!this.alive) { //If play dies, toggle the game loop and show the game over screen
			GAME_ENGINE.toggleGameLoop();
			document.getElementById("mainDisplay").style.display = "none";
			document.getElementById("gameOverScreen").style.display = "inline";
		}
	
		/* Check if afterburners are still on */
		//The xVelocity will never truely be 0 it will always be very very very close to it (so rounding)
		if(Math.floor(this.xVelocity) == 0 || Math.ceil(this.xVelocity) == 0) this.horizontalBurner = false;
		//The yVelocity when not being manipulated by player will even out at the (speed * friction) (has to be rounded)
		if(Math.floor(this.yVelocity) == (this.speed * this.friction) || Math.ceil(this.yVelocity) == (this.speed * this.friction)) this.verticalBurner = false;
	
		if(CURRENTKEYS[32]) { //Shooting with Space Bar
			if(this.ammo > 0) {
				this.shoot();
			}
		}
		
		if(CURRENTKEYS[87] || CURRENTKEYS[38]) { //Jumping with W and Up
			if(Math.floor(this.yVelocity) >= 0) {
				this.verticalBurner = true;
			}
			
			if(this.yVelocity > -this.speed) {
				this.yVelocity-=5;
			}
		}
		this.yVelocity++; //This is "gravity"
		
		if(CURRENTKEYS[68] || CURRENTKEYS[39]) { //Moving right with D and Right
			this.currentDirection = this.direction.right;
			this.horizontalBurner = true;
			if(this.xVelocity < this.speed) {
				this.xVelocity++;
			}
		}
	
		if(CURRENTKEYS[65] || CURRENTKEYS[37]) { //Moving left with A and Left
			this.currentDirection = this.direction.left;
			this.horizontalBurner = true;
			if(this.xVelocity > -this.speed) {
				this.xVelocity--;
			}
		}
		
		//Apply friction and then make the movement
		this.yVelocity *= this.friction;
		this.y += this.yVelocity;
		this.xVelocity *= this.friction;
		this.x += this.xVelocity;
		
		/* Canvas Collision Detection */
		//Check X Canvas Bounds
		if(this.x > (CANVAS_WIDTH - this.width)) {
			if(WORLD.changeMap(1, false, true)) { //Advance tilemap to the right if there is a next one
				this.tilemap = WORLD.currentMapArray;
				this.x = 10; //Change the side of the canvas that the player is on
			}
			else {
				this.x = CANVAS_WIDTH - this.width;
			}
		}
		else if(this.x < 0) {
			if(WORLD.changeMap(-1, false, true)) { //Advance tilemap to the left if there is a previous one
				this.tilemap = WORLD.currentMapArray;
				this.x = (CANVAS_WIDTH - this.width) - 10; //Change the side of the canvas that the player is on
			}
			else {
				this.x = 0;
			}
		}
		
		//Check Y Canvas Bounds
		if(this.y > CANVAS_HEIGHT) { //Falling out of the map
			this.alive = false;
		}
		else if(this.y < 0) {
			this.y = 0;
		}
		
		/* Tilemap Collision Detection */
		//Detect Partition of tiles to check (Checks the closest 3 columns of tiles)
		var startCol = Math.floor(this.x / TILE_SIZE);
		var endCol = Math.floor((this.x + this.width) / TILE_SIZE);
		if(startCol >= 1) startCol--;
		if(endCol < ((CANVAS_WIDTH/TILE_SIZE) - 1)) endCol++;
		
		//Loop through partition
		for(var row = 0; row < (CANVAS_HEIGHT/TILE_SIZE); row++) { //Horizontal , x
			for(var col = startCol; col <= endCol; col++) { //Vertical , y
				var arrayIndex = (row * (CANVAS_WIDTH/TILE_SIZE)) + col;
				var currentTile = this.tilemap[arrayIndex];
				
				if(WORLD.noncollidableTiles.includes(currentTile.type)) continue; //Skip air, ammo, and health tiles
				else {
					var x = col * TILE_SIZE;
					var y = row * TILE_SIZE;
					
					//Check for collision
					if(this.collision.aabb(this.x + this.hitboxModifier, this.y, this.width - this.hitboxModifier, this.height, x, y, TILE_SIZE, TILE_SIZE)) {
						this.y -= this.yVelocity; //If collision is happening, reverse the Y step, then check again
						if(this.collision.aabb(this.x + this.hitboxModifier, this.y, this.width - this.hitboxModifier, this.height, x, y, TILE_SIZE, TILE_SIZE)) {
							this.x -= this.xVelocity; //If collision is still happening, reverse the X step
						}
					}
				}
			}
		}
		
		/* Debugging (press "p" key for player debugging) */
		if(CURRENTKEYS[80]) console.log(this);
	}

	/* Shoot a ball out of the character's mouth */
	shoot() {
		if((Date.now() - this.shootingTimer) >= this.shootingOffset) {
			this.ammo--;
			this.shootingTimer = Date.now();
			
			var spawnX = this.x + (this.width / 2);
			var spawnY = this.y + (this.height / 2);
			
			var bullet = new Projectile(spawnX, spawnY, this.currentDirection, 10);
			GAME_ENGINE.addEntity(bullet, true, true);
		}
		else return;
	}
	
	/*
	Player taking damage to their health
	
	@param "damage" An integer to decrease health by
	*/
	takeDamage(damage) {
		if((this.health - damage) <= 0) {
			this.health = 0;
			this.alive = false;
		}
		else {
			this.health -= damage;
		}
	}

	/*
		Player healing
		
		@param "health" An integer to increase health by
	*/
	heal(health) {
		if((this.health + health) > this.maxHealth) {
			this.health = this.maxHealth;
		}
		else {
			this.health += health;
		}
	}

	/*
		Player collecting ammo
		
		@param "amount" An integer to increase ammo by
	*/
	collectAmmo(amount) {
		if((this.ammo + amount) > this.maxAmmo) {
			this.ammo = this.maxAmmo;
		}
		else {
			this.ammo += amount;
		}
	}

	/*
		Set a new tilemap for the character to check collisions with
		
		@param "tilemap" The new tilemap array
	*/
	setTilemap(tilemap) {
		this.tilemap = tilemap;
	}
}