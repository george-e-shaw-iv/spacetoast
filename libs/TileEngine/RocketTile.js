/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/* 
	Game winning tile when collided upon
	
	@params "x, y, type" Handled by parent class Tile
	@param "canWin" A boolean that either allows or disallows this tile to render winning
*/
class RocketTile extends Tile {
	constructor(x, y, type, canWin) {
		super(x, y, type);
		
		this.canWin = canWin;
		this.collision = new Collision;
	}
	
	/* Method that gets called once per frame */
	update() {
		if(this.collision.aabb(this.x, this.y, TILE_SIZE, TILE_SIZE, PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height)) {
			if(this.canWin) {
				this.type = -1;
				
				document.getElementById("mainDisplay").style.display = "none";
				document.getElementById("winScreen").style.display = "inline";
				GAME_ENGINE.toggleGameLoop();
				
				return true;
			}
		}
		
		return false;
	}
}