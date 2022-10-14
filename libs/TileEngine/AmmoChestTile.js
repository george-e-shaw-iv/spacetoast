/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	Ammo Chest Tile is the functionality of a collidable box that gives the player ammo
	
	@params "x, y, type" Handled by parent class
	@param "ammoAmount" The amount of ammo that the chest contains
*/
class AmmoChestTile extends Tile {
	constructor(x, y, type, ammoAmount = 10) {
		super(x, y, type);
		
		this.ammoAmount = ammoAmount;
		this.collision = new Collision();
	}
	
	/* Method that gets called once per frame */
	update() {
		if(this.collision.aabb(this.x, this.y, TILE_SIZE, TILE_SIZE, PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height)) {
			if((PLAYER.ammo + this.ammoAmount) <= PLAYER.maxAmmo) {
				this.type = -1;
				PLAYER.collectAmmo(this.ammoAmount);
				
				return true;
			}
		}
		
		return false;
	}
}