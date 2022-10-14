/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/* Tile Class used in TileEngine to build tile maps */
class Tile {
	constructor(x, y, type) {
		this.x = x;
		this.y = y;
		this.type = type;
	}
	
	renderHealth(ctx) {
		ctx.strokeStyle = "#7a35d8";
		ctx.strokeRect(this.x - 1, this.y - 1, TILE_SIZE + 1, this.healthBarHeight + 1);
		
		var healthBarWidth = (TILE_SIZE / this.maxHealth) * this.health;
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, healthBarWidth, this.healthBarHeight);
	}
}