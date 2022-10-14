/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Download (zip): https://drive.google.com/open?id=0B6Gu69KoAdUhRUxXSU9JNUlGZm8
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

function TileDisplay() {
	//Sectors of the tile display in 1D array
	var sectors = [];
	
	//Populate sectors with blank tiles
	for(var x = 0; x < (CANVAS_WIDTH / TILE_SIZE); x++) {
		for(var y = 0; y < (CANVAS_HEIGHT / TILE_SIZE); y++) {
			sectors.push(-1);
		}
	}
	
	/*
		Handle rendering of sectors
		
		@param "ctx" 2D Canvas Context Object
	*/
	this.render = function(ctx) {
		GFX_BACKGROUND.render(ctx, 0, 0, 0); //Render background
		
		//Loop through sectors
		for(var i = 0; i < sectors.length; i++) {
			var tileType = sectors[i];
			
			if(tileType != -1) {
				var relativeX = i % (CANVAS_WIDTH / TILE_SIZE);
				var relativeY = (i - relativeX) / (CANVAS_WIDTH / TILE_SIZE);
			
				if(Array.isArray(tileType)) { //Tiles with extra information, type is stored in their first index
					GFX_TILES.render(ctx, relativeX * TILE_SIZE, relativeY * TILE_SIZE, 0, tileType[0]);
				}
				else {
					GFX_TILES.render(ctx, relativeX * TILE_SIZE, relativeY * TILE_SIZE, 0, tileType);
				}
			}
			else continue;
		}
	}
	
	/*
		Change the type of specific tile
		
		@param "index" The index in the sectors array of the desired tile to change
		@param "tileType" The region of the sprite map for the desired tile to change
	*/
	this.changeTile = function(index, tileType) {
		sectors[index] = tileType;
	}
	
	/*
		Returns the sectors array (the usuable map data)
		
		@param "json" True if wanting the JSON formatted array (which is needed for use in the game), 
					false if not (debugging, returns array object)
	*/
	this.getSectors = function(json = false) {
		if(json) return JSON.stringify(sectors);
		else return sectors;
	}
	
	/* Clears the current map */
	this.newMap = function() {
		for(var i = 0; i < sectors.length; i++) {
			sectors[i] = -1;
		}
	}
}