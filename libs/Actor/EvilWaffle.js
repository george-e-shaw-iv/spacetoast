/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	EvilWaffle type of Enemy
	
	@params "x, y, speed, health, damage, followDistance" handled by the parent Actor class
*/
class EvilWaffle extends Actor {
	constructor(x, y, speed, health = 0, damage = 0, followDistance = 0) {
		super(x, y, speed, health, damage, followDistance);
		
		this.gfx = GFX_ENEMY_WAFFLE;
		this.width = GFX_ENEMY_WAFFLE.width;
		this.height = GFX_ENEMY_WAFFLE.height;
	}
	
	/* Function that updates the enemy object that is ran once per frame (Collision and Artificial Intelligence) */
	update() {
		if(!this.alive) return;
	
		//Handle interaction with projectiles
		this.checkIfHitByProjectile();
		
		//AI Movement
		this.follow(this.followDistance);
		
		//Damage upon collision with player
		if(this.damage > 0) {
			if(this.collision.aabb(this.x, this.y, this.width, this.height, PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height)) {
				PLAYER.takeDamage(this.damage);
				this.alive = false;
			}
		}
	}
}