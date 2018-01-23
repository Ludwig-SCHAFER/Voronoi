/*
 * with some help from the internetz
 * source: https://stackoverflow.com/a/24050777
 *
 * I wasn't realizing i need the mouseup and mousemove events to be attached to the document.
 * This is so obvious, this fixes the input-to-display lag that causes cursor to move outside of the div element for one 100th of a second.
 */



/*
 * DOM and Events
 */
 let popup = document.getElementById("popup");
 //set the capture to #popup
popup.addEventListener('mousedown', mDown, true);
//set the motion and release to @document (mouse can move away from #popup when shaken too fast)
document.addEventListener('mouseup', mUp, true);
document.addEventListener('mousemove', mMove, true);

/*
 * Initial values
 */
let mousePosition;
let offset = {x:0,y:0};
let grid = {x:15,y:15};//grid used fro snapping
let originalDimensions = {w:popup.offsetWidth, h:popup.offsetHeight}
let dragged = false;

/*
 * Event handling functions
 */
function mDown(e)
{
	dragged = true;
	offset.x = this.offsetLeft - e.clientX;
	offset.y = this.offsetTop - e.clientY;
	originalDimensions = {w:popup.offsetWidth, h:popup.offsetHeight}
}

function mUp(e)
{
	dragged = false;
}

function mMove(e)
{
	e.preventDefault();
	if (dragged)
	{
		mousePosition = {x : e.clientX, y : e.clientY};
		popup.style.left = Math.round((mousePosition.x + offset.x)/grid.x)*grid.x + 'px';
		popup.style.top  = Math.round((mousePosition.y + offset.y)/grid.y)*grid.y + 'px';
	}
}
