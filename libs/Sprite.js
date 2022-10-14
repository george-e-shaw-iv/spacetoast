/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/*
	Handles sprites and sprite sheets for various entities and world objects
	
	@param "img" A Javascript Image Object of the sprite/spritesheet
	@param "width" The width of img
	@param "height" The height of img
	@param "spriteSize" If img is a sprite sheet, width should equal height of each sprite, provide px
*/
class Sprite {
	constructor(img, width, height, spriteSize) {
		this.img = img;
		this.width = width;
		this.height = height;
		this.spriteSize = spriteSize;
		this.region = [];

		var numRegions = (this.width / this.spriteSize) * (this.height / this.spriteSize);
		for(var i = 0; i < numRegions; i++) {
			var relativeX = i % (this.width / this.spriteSize);
			var relativeY = (i - relativeX) / (this.width / this.spriteSize);

			this.region.push([relativeX * this.spriteSize, relativeY * this.spriteSize]);
		}
	}
}

/*
	Renders the Sprite Object onto the canvas
	
	@param "ctx" 2D Canvas drawing context
	@param "x" The x coordinate of the sprite to be placed on the canvas
	@param "y" The y coordinate of the sprite to be placed on the canvas
	@param "region" If the sprite is within a sprite sheet, region index
	@param "degrees" Angle in degrees
*/
Sprite.prototype.render = function(ctx, x, y, degrees, region = null) {
	if(degrees != 0) {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(degrees * (Math.PI/180));
		
		x = 0;
		y = 0;
	}
	
	if(region != null) {
		ctx.drawImage(this.img, this.region[region][0], this.region[region][1], this.spriteSize, this.spriteSize, x, y, this.spriteSize, this.spriteSize);
	}
	else {
		ctx.drawImage(this.img, x, y, this.width, this.height);
	}
	
	if(degrees != 0) ctx.restore();
};