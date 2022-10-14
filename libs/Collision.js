/*
	All programming, markup, styling, and graphics of "The Adventures of Space Toaster" were completed by:
	
	George E. Shaw IV // george.e.shaw.iv@outlook.com // Completed on May 5, 2017
	Developer Log: https://drive.google.com/open?id=18tFs7-pxCQT4uEvEK4r8bhC-qDC97KUuarzVGSiJsyU
*/

/* Class containing basic collision functions */
class Collision {
	/*
		Checks collision between axis-aligned bounding boxes (aabb)
		
		@param "x1 / x2" The x position in relation to the canvas for the respective aabb
		@param "y1 / y2" The y position in relation to the canvas for the respective aabb
		@param "width1 / width2" The width of the respective aabb
		@param "height1 / height2" The height of the respective aabb
		@return True if colliding, false if not colliding
	*/
	aabb(x1, y1, width1, height1, x2, y2, width2, height2) {
		if(x1 < (x2 + width2) &&
		(x1 + width1) > x2 &&
		y1 < (y2 + height2) &&
		(height1 + y1) > y2) {
			return true;
		} else {
			return false;
		}
	}
	
	/*
		Get the distance between to coordinate points
		
		@param "x1 / x2" Integer x positions
		@param "y1 / y2" Integer y positions
		@return The distance between the two coordinate points
	*/
	getDistance(x1, y1, x2, y2) {
		var calcX = Math.pow((x2 - x1), 2);
		var calcY = Math.pow((y2 - y1), 2);
		return Math.sqrt(calcX + calcY);
	}
}