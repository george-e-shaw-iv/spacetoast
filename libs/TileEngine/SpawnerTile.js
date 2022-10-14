/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	SpawningTile Class is a type of Tile that will spawn enemies
	
	@params "x, y, type" handled by the Tile class
	@param "health" The integer amount of health that the spawner has
	@param "interval" The integer range that the spawner will randomly spawn within
	@param "enemy" The enemy object that the spawner will clone and spawn
*/
class SpawnerTile extends Tile {
	constructor(x, y, type, health, interval, enemy = undefined) {
		super(x, y, type);
		
		this.maxHealth = health;
		this.health = this.maxHealth;
		this.healthBarHeight = 3;
		
		this.interval = interval;
		this.enemy = enemy;
		
		this.collision = new Collision;
		this.nextSpawn = Date.now() + Math.floor(Math.random() * ((this.interval * 1000) + 1));
	}
	
	/* Update method that runs once p/frame */
	update() {
		if(Date.now() >= this.nextSpawn) { //Handle enemy spawning
			if(this.enemy != undefined) {
				var spawnedEnemy = Object.assign(Object.create(this.enemy), this.enemy);
				GAME_ENGINE.addEntity(spawnedEnemy, true, true);
			}
			
			this.nextSpawn = Date.now() + Math.floor(Math.random() * ((this.interval * 1000) + 1));
		}
		
		//Handle interaction with projectiles
		var activeProjectiles = GAME_ENGINE.getRenderEntities(Projectile);
		if(activeProjectiles.length != 0) {
			for(var i = 0; i < activeProjectiles.length; i++) {
				if(this.collision.aabb(this.x, this.y, TILE_SIZE, TILE_SIZE,
										activeProjectiles[i].x, activeProjectiles[i].y, activeProjectiles[i].width, activeProjectiles[i].height)) {
					GAME_ENGINE.deleteEntity([activeProjectiles[i], true, true]);
					
					this.health -= PLAYER.damage;
					if(this.health <= 0) {
						this.type = -1;
						return true;
					}
				}
			}
		}
		
		return false;
	}
	
	/* Setter used to set the enemy to spawn */
	set spawnedEnemy(enemy) {
		if(enemy) this.enemy = enemy;
	}
}