/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/* Class that handles all of the rendering and interaction of tiles that compose the world */
class TileEngine {
	constructor() {
		//Raw Data (Given by the Level Editor developer tool)
		var rawDataMaps = [
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,[11,10,5,[0,2,4,2,0]],-1,-1,-1,-1,-1,-1,-1,-1,-1,[9,10],0,1,1,1,0,1,1,2,-1,-1,0,4,4,4,4,6,7,7,8,-1,-1,6,7,7,7,7],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,-1,-1,-1,-1,[11,10,5,[0,2,10,2,0]],[10,5],[9,10],-1,4,4,4,1,2,-1,-1,0,1,1,2,7,7,7,7,8,-1,-1,6,7,7,8],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,[11,10,3,[0,2,2,2,0]],-1,-1,-1,-1,-1,-1,-1,-1,-1,[11,10,3,[0,2,2,2,0]],0,1,-1,-1,[9,10],-1,[9,10],[10,5],-1,[11,10,5,[0,2,4,2,0]],0,4,4,1,1,2,-1,0,2,-1,0,4,4,4,7,7,8,-1,3,5,-1,6,7,7,7],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,[9,10],[9,10],-1,-1,-1,-1,-1,-1,-1,-1,4,1,1,2,[10,5],-1,[11,10,2,[0,2,4,2,0]],-1,-1,[12,true],[12,true],4,4,4,4,1,1,2,-1,-1,0,2,7,7,7,7,7,7,8,-1,-1,6,8]
		];
		
		/*
			Non-collidable Tiles (will not stop player's movement)
			
			-1: Air
			9: AmmoChestTile
			10: HealthChestTile
			12: Rocket Tile (Winning Platform)
		*/
		this.noncollidableTiles = [-1, 9, 10, 12];
		
		this.maps = [];
		this.currentMapIndex = 0;
		
		//Generate the tile based maps based off of the raw data maps
		for(var i = 0; i < rawDataMaps.length; i++) {
			this.maps.push([]);
			for(var z = 0; z < rawDataMaps[i].length; z++) {
				var relativeX = z % (CANVAS_WIDTH / TILE_SIZE);
				var relativeY = (z - relativeX) / (CANVAS_WIDTH / TILE_SIZE);
				
				relativeX *= TILE_SIZE;
				relativeY *= TILE_SIZE;
				
				if(Array.isArray(rawDataMaps[i][z])) { //Special tile type (tiles that have more data than just graphics)
					switch(rawDataMaps[i][z][0]) { //Switch the type, which is stored in the first index
						case 9: //Ammo Chest
							this.maps[i].push(new AmmoChestTile(relativeX, relativeY, rawDataMaps[i][z][0], rawDataMaps[i][z][1]));
							break;
						case 10: //Health Chest
							this.maps[i].push(new HealthChestTile(relativeX, relativeY, rawDataMaps[i][z][0], rawDataMaps[i][z][1]));
							break;
						case 11: //Spawner Tile
							var newSpawner = new SpawnerTile(relativeX, relativeY, rawDataMaps[i][z][0], rawDataMaps[i][z][1], rawDataMaps[i][z][2]);
							
							switch(rawDataMaps[i][z][3][0]) { //Switch Enemy Type
								case 0:
									newSpawner.spawnedEnemy = new EvilWaffle(relativeX + 10, relativeY + 10, rawDataMaps[i][z][3][1], rawDataMaps[i][z][3][2], rawDataMaps[i][z][3][3], rawDataMaps[i][z][3][4]);
									break;
								default:
									break;
							}
							this.maps[i].push(newSpawner);
							break;
						case 12: //Game winning rocket tile
							this.maps[i].push(new RocketTile(relativeX, relativeY, rawDataMaps[i][z][0], rawDataMaps[i][z][1]));
							break;
						default: //Default catch-all
							this.maps[i].push(new Tile(relativeX, relativeY, -1));
							break;
					}
				}
				else { //Tiles that are just graphical
					this.maps[i].push(new Tile(relativeX, relativeY, rawDataMaps[i][z]));
				}
			}
		}
	}
	
	/*
		Renders each of the tiles
		
		@param "ctx" 2D Canvas Drawing Context
	*/
	render(ctx) {
		GFX_BACKGROUND.render(ctx, 0, 0, 0); //Set background
		
		for(var i = 0; i < this.maps[this.currentMapIndex].length; i++) {
			var currentTile = this.maps[this.currentMapIndex][i];
			
			if(currentTile.type != -1) {
				if(currentTile.type == -2) { //Debugging tile
					ctx.fillStyle = "#FF0000";
					ctx.fillRect(currentTile.x, currentTile.y, TILE_SIZE, TILE_SIZE);
				}
				else {
					GFX_TILES.render(ctx, currentTile.x, currentTile.y, 0, currentTile.type);
					
					if(typeof currentTile.health === "number") {
						currentTile.renderHealth(ctx);
					}
				}
			}
			else continue;
		}
	}
	
	/* The TileEngine itself has no need to update, however interactable tiles, like Ammo Chests, have to be updated */
	update() {
		for(var i = 0; i < this.maps[this.currentMapIndex].length; i++) { //Loop through the tile map
			if(typeof this.maps[this.currentMapIndex][i].update === "function") { //If the current tile has an update field of type function
				if(this.maps[this.currentMapIndex][i].update()) { //Try and update said tile
					this.maps[this.currentMapIndex][i].update = undefined; //If it is done being updated, remove the update function
				}
			}
		}
	}
	
	/*
		Method to change the current visible map
		
		@param "index" Integer - If override is false, 1 will progress the map forward and -1 will degress the map backwards. If
						override is true, the map will attempt to change to the given index
		@param "override" Boolean - Functionality is given in the above index parameter details
		@param "checkEnemies" Boolean - If true, will not change map if there are enemies present
		@return Boolean - Depending on whether or not the action succeeded
	*/
	changeMap(index, override, checkEnemies) {
		if(checkEnemies) {
			var activeEnemies = GAME_ENGINE.getRenderEntities(Actor);
			
			for(var i = 0; i < activeEnemies.length; i++) {
				if(activeEnemies[i] instanceof EvilWaffle) { //If the actor in question is an EvilWaffle (this can be extended with ||), do not progress
					return false;
				}
			}
		}
	
		if(index == 1 && !override) {
			if((this.currentMapIndex + 1) >= this.maps.length) return false;
			else {
				this.currentMapIndex++;
				return true;
			}
		}
		else if(index == -1 && !override) {
			if((this.currentMapIndex - 1) < 0) return false;
			else {
				this.currentMapIndex--;
				return true;
			}
		}
		else {
			if(index >= this.maps.length || index < 0) return false;
			else {
				this.currentMapIndex = index;
				return true;
			}
		}
	}
	
	/*
		Method used to mark specific tiles in an effort to debug
		
		@param "index" Integer - The index of the desired tile needing to be debugged
		@param "tileType" Integer (Default -2) - The desired tileType to change the tile to
	*/
	debugTile(index, tileType = -2) {
		this.maps[this.currentMapIndex][index] = tileType;
	}
	
	/* Getters */
	get allMaps() { return this.maps; }
	get mapIndex() { return this.currentMapIndex; }
	get currentMapArray() { return this.maps[this.currentMapIndex]; }
}