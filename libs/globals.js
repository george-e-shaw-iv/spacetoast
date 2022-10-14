/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/* Global variables that are accessible in any class */
//Game constants
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 400;
const TILE_SIZE = 50;
const FPS = 30;

//Keybinds
var CURRENTKEYS = [];
const PREVENTKEYDEFAULTS = [32, 38, 39, 37, 40, 27];

//Game engine reference for use in all classes
var GAME_ENGINE;

//Main player and world references
var PLAYER;
var WORLD;