/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Download (zip): https://drive.google.com/open?id=0B6Gu69KoAdUhRUxXSU9JNUlGZm8
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/* This js file preloads all of the graphics for the level editor */
//Load background sprite
var GFX_BACKGROUND;
var background = new Image();
background.src = "../../gfx/space_background.png";

background.onload = function() {
	GFX_BACKGROUND = new Sprite(background, CANVAS_WIDTH, CANVAS_HEIGHT);
	delete background;
}

//Load tileset sprites
var GFX_TILES;
var tileset = new Image();
tileset.src = "../../gfx/space_tileset.png";

tileset.onload = function() {
	GFX_TILES = new Sprite(tileset, tileset.width, tileset.height, 50);
	delete tileset;
}