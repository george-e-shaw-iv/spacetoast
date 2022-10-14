/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

$(document).ready(function() {
	var canvas = document.getElementById("mainDisplay");
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = CANVAS_WIDTH;
	ctx.canvas.height = CANVAS_HEIGHT;
	
	//Create Canvas Display
	var display = new TileDisplay();
	$("#rawMapData").val(display.getSectors(true));
	
	//Function of "Clear Map" button
	$("#clearMap").on("click", function() {
		if(confirm("Are you sure you want to clear the map?")) {
			display.newMap();
			$("#rawMapData").val(display.getSectors(true));
		}
		else return;
	});
	
	//Tile Selection
	var selected = "zero";
	$("#tileset > tbody > tr > td").on("click", function() {
		$("#tileset > tbody > tr > td").each(function() {
			$(this).removeClass("selected");
		});
		$(this).addClass("selected");
		selected = $(this).children("img").attr("class");
	});
	
	//Changing Tiles on Canvas Display
	$("#mainDisplay").on("click", function(e) {
		var parentOffset = $(this).offset();
		var relX = e.pageX - parentOffset.left;
		var relY = e.pageY - parentOffset.top;
		
		var col = Math.floor(relX / TILE_SIZE);
		var row = Math.floor(relY / TILE_SIZE);
		var index = (row * (CANVAS_WIDTH / TILE_SIZE)) + col;
		var tileType = -1;
		
		switch(selected) {
			case "zero":
				tileType = 0;
				break;
			case "one":
				tileType = 1;
				break;
			case "two":
				tileType = 2;
				break;
			case "three":
				tileType = 3;
				break;
			case "four":
				tileType = 4;
				break;
			case "five":
				tileType = 5;
				break;
			case "six":
				tileType = 6;
				break;
			case "seven":
				tileType = 7;
				break;
			case "eight":
				tileType = 8;
				break;
			case "nine": //Ammo
				var ammoAmount = parseInt($("#ammoChestAmount").val());
				tileType = [9, ammoAmount];
				break;
			case "ten": //Health
				var healAmount = parseInt($("#healthChestAmount").val());
				tileType = [10, healAmount];
				break;
			case "eleven": //Spawner
				var spawnHealth = parseInt($("#spawnHealth").val());
				var spawnInterval = parseInt($("#spawnInterval").val());
				
				switch($("#enemyType").val()) {
					case "Evil Waffle":
						var enemyType = 0;
						break;
					default:
						var enemyType = 0;
						break;
				}
				var enemySpeed = parseInt($("#enemySpeed").val());
				var enemyHealth = parseInt($("#enemyHealth").val());
				var enemyDamage = parseInt($("#enemyDamage").val());
				var enemyFollow = parseInt($("#enemyFollow").val());
				
				tileType = [11, spawnHealth, spawnInterval, [enemyType, enemySpeed, enemyHealth, enemyDamage, enemyFollow]];
				break;
			case "twelve":
				tileType = [12, true];
				break;
			default:
				tileType = -1;
				break;
		}
		
		display.changeTile(index, tileType);
		
		$("#rawMapData").val(display.getSectors(true));
	});
	
	//Render the Tile Display
	function render() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		display.render(ctx);
	}
	
	//Call render() Once Every Frame
	setInterval(function() {
		render();
	}, (1000/FPS));
});