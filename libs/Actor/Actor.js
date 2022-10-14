/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	Parent class used for characters, both friendly and nonfriendly
	
	@param "x" Integer - Coordinate x position
	@param "y" Integer - Coordinate y position
	@param "speed" Integer - How fast the actor moves
	@param "health" Integer - Health of the actor
	@param "damage" Integer - If the actor is nonfriendly, how much damage does he cause
*/
class Actor {
	constructor(x, y, speed, health = 0, damage = 0, followDistance = 0) {
		this.x = x;
		this.y = y;
		this.width;
		this.height;
		this.hitboxMod = 3; //Add x amount of px to each side of the hitbox
		this.speed = speed;
		this.followDistance = followDistance;
		
		this.damage = damage;
		this.maxHealth = health;
		this.health = this.maxHealth;
		this.alive = true;
		
		this.gfx;
		this.opacity = 1;
		this.glow = "#a976f0";
		
		this.healthBarHeight = 3;
		this.healthBarOffsetY = 10;
		
		this.collision = new Collision();
	}
	
	/*
	Renders the Actor to the canvas
	
	@param "ctx" 2D Canvas Context
	*/
	render(ctx) {
		ctx.save();
		
		//Apply glow effect
		ctx.shadowColor = this.glow;
		ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
	
		if(!this.alive && Math.floor(this.opacity * 10) == 0) { //If Actor is not alive and is completed faded out
			GAME_ENGINE.deleteEntity([this, true, true]);
		}
		else {
			if(!this.alive) { //If Actor is not alive
				ctx.globalAlpha = (this.opacity -= .1); //Fade out by .1 alpha
			}
			
			//Render graphic
			this.gfx.render(ctx, this.x, this.y, 0);
			
			//Render health bar
			if(this.health != 0) {
				ctx.strokeStyle = "#7a35d8";
				ctx.strokeRect(this.x - 1, this.y - this.healthBarOffsetY - 1, this.width + 1, this.healthBarHeight + 1);
				
				var healthBarWidth = (this.width / this.maxHealth) * this.health;
				ctx.fillStyle = "#FF0000";
				ctx.fillRect(this.x, this.y - this.healthBarOffsetY, healthBarWidth, this.healthBarHeight);
			}
		}
		
		ctx.restore();
	}
	
	/* Handle interaction with projectiles */
	checkIfHitByProjectile() {
		if(this.health > 0) {
			var activeProjectiles = GAME_ENGINE.getRenderEntities(Projectile);
			if(activeProjectiles.length != 0) {
				for(var i = 0; i < activeProjectiles.length; i++) {
					if(this.collision.aabb(this.x - this.hitboxMod, this.y - this.hitboxMod, this.width + this.hitboxMod, this.height + this.hitboxMod,
														activeProjectiles[i].x, activeProjectiles[i].y, activeProjectiles[i].width, activeProjectiles[i].height)) {
						GAME_ENGINE.deleteEntity([activeProjectiles[i], true, true]);
						
						this.health -= PLAYER.damage;
						if(this.health <= 0) {
							this.alive = false;
						}
					}
				}
			}
		}
	}
	
	/*
		AI Movement following the player
		
		@param "distance" Integer - The distance that the actor will follow the player by
	*/
	follow(distance) {
		if(Math.floor(this.collision.getDistance(this.x, this.y, PLAYER.x, PLAYER.y)) > distance) {
			var enemyAdjustedX = Math.floor(this.x + (this.width / 2));
			var enemyAdjustedY = Math.floor(this.y + (this.height / 2));
			var playerAdjustedX = Math.floor(PLAYER.x + (PLAYER.width / 2));
			var playerAdjustedY = Math.floor(PLAYER.y + (PLAYER.height / 2));
		
			//Handle Y Values
			if(enemyAdjustedY < playerAdjustedY) {
				this.y += this.speed;
			}
			else if(enemyAdjustedY > playerAdjustedY) {
				this.y -= this.speed;
			}
			
			//Smoothing Y
			if(this.y > (PLAYER.y - 2.5) && this.y < (PLAYER.y + 2.5)) {
				this.y = PLAYER.y;
			}
			
			//Handle X Values
			if(enemyAdjustedX < playerAdjustedX) {
				this.x += this.speed;
			}
			else if(enemyAdjustedX > playerAdjustedX) {
				this.x -= this.speed;
			}
			
			//Smoothing X
			if(this.x > (PLAYER.x - 2.5) && this.x < (PLAYER.x + 2.5)) {
				this.x = PLAYER.x;
			}
		}
	}
}