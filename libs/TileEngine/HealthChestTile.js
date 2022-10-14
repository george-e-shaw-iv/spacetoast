/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	Collidable tile that gives health to player
	
	@params "x, y, type" Handled by parent class Tile
	@param "healAmount" The amount of health the player is given by the chest
*/
class HealthChestTile extends Tile {
	constructor(x, y, type, healAmount = 5) {
		super(x, y, type);
		
		this.healAmount = healAmount;
		this.collision = new Collision();
	}
	
	/* Method that gets called once per frame */
	update() {
		if(this.collision.aabb(this.x, this.y, TILE_SIZE, TILE_SIZE, PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height)) {
			if(PLAYER.health !== PLAYER.maxHealth) {
				this.type = -1;
				PLAYER.heal(this.healAmount);
				
				return true;
			}
		}
		
		return false;
	}
}