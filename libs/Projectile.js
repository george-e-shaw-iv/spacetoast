/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	Projectile (bullet) object (Could be expanded to handle more than just player)
	
	@param "x" Spawn x
	@param "y" Spawn y
	@param "dir" 1 (traveling right on canvas) or -1 (traveling left on canvas) depending on direction
*/
class Projectile {
	constructor(x, y, dir, speed) {
		this.x = x;
		this.y = y;
		this.width = GFX_TOASTER_PROJECTILE.width;
		this.height = GFX_TOASTER_PROJECTILE.height;
		
		this.dir = dir;
		this.speed = speed;
	}
	
	/*
	Renders the projectile to the canvas
	
	@param "ctx" 2D Canvas Context
	*/
	render(ctx) {
		switch(this.dir) {
			case 1:
				GFX_TOASTER_PROJECTILE.render(ctx, this.x, this.y, 0);
				break;
			case -1:
				GFX_TOASTER_PROJECTILE.render(ctx, this.x, this.y + (GFX_TOASTER_PROJECTILE.height), 180);
				break;
			default:
				GFX_TOASTER_PROJECTILE.render(ctx, this.x, this.y, 0);
				break;
		}
	}
	
	/* Updates the Projectile */
	update() {
		this.x += this.dir * this.speed;
		
		if(this.x > CANVAS_WIDTH || this.x < 0) {
			GAME_ENGINE.deleteEntity([this, true, true]);
		}
	}
}