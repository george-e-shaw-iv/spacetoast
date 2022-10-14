/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/* This js file preloads all of the graphics for the game */
//Load background sprite
var GFX_BACKGROUND;
var background = new Image();
background.src = "gfx/space_background.png";

background.onload = function() {
	GFX_BACKGROUND = new Sprite(background, CANVAS_WIDTH, CANVAS_HEIGHT);
	delete background;
}

//Load tileset sprites
var GFX_TILES;
var tileset = new Image();
tileset.src = "gfx/space_tileset.png";

tileset.onload = function() {
	GFX_TILES = new Sprite(tileset, tileset.width, tileset.height, 50);
	delete tileset;
}

/* Load Character Graphics */
//Load Character Graphic
var GFX_PLAYER;
var playerSprite = new Image();
playerSprite.src = "gfx/space_toast_player.png";

playerSprite.onload = function() {
	GFX_PLAYER = new Sprite(playerSprite, playerSprite.width, playerSprite.height, 60);
	delete playerSprite;
}

//Load Character Afterburner
var GFX_PLAYER_AFTERBURN;
var afterburnSprite = new Image();
afterburnSprite.src = "gfx/toaster_afterburn.png";

afterburnSprite.onload = function() {
	GFX_PLAYER_AFTERBURN = new Sprite(afterburnSprite, afterburnSprite.width, afterburnSprite.height, 60);
	delete afterburnSprite;
}
	
//Load projectile graphics
var GFX_TOASTER_PROJECTILE;
var projectileSprite = new Image();
projectileSprite.src = "gfx/toaster_projectile.png";

projectileSprite.onload = function() {
	GFX_TOASTER_PROJECTILE = new Sprite(projectileSprite, projectileSprite.width, projectileSprite.height, 12);
	delete projectileSprite;
}

/* Load Enemy Graphics */
//Load Waffle Enemy Graphic
var GFX_ENEMY_WAFFLE;
var waffleSprite = new Image();
waffleSprite.src = "gfx/waffle_enemy.png";

waffleSprite.onload = function() {
	GFX_ENEMY_WAFFLE = new Sprite(waffleSprite, waffleSprite.width, waffleSprite.height, 30);
	delete waffleSprite;
}