/**********************************************************************************************************************
 * with some help from the internetz
 * source: https://stackoverflow.com/a/24050777
 *
 * I wasn't realizing i need the mouseup and mousemove events to be attached to the document.
 * This is so obvious, this fixes the input-to-display lag that causes cursor to move outside of the div element for one 100th of a second.
 **********************************************************************************************************************/



/**********************************************************************************************************************
 *DOM and Events
 **********************************************************************************************************************/
let popup = document.getElementById("popup");
//popup.classList.toggle("dropped");
//set the capture to #popup
popup.addEventListener('mousedown', mDown, true);
//set the motion and release to @document (mouse can move away from #popup when shaken too fast)
document.addEventListener('mouseup', mUp, true);
document.addEventListener('mousemove', mMove, true);

/**********************************************************************************************************************
 * Initial values
 **********************************************************************************************************************/
let mousePosition;
let offset = {x:0,y:0};
let dragged = false;
let selected = false;
let originalPosition = {left:0,top:0};
let currentPosition = {left:0,top:0};

/**********************************************************************************************************************
 * Event handling functions
 **********************************************************************************************************************/
function mDown(e)	
{
	selected = true;
	offset.x = this.offsetLeft - e.clientX;
	offset.y = this.offsetTop - e.clientY;
 	originalPosition = {left:popup.offsetLeft, top:popup.offsetTop}
}

function mUp(e)
{
	if(dragged)
	{
		popup.classList.toggle("dragged");
		popup.classList.toggle("dropped");
	}
	selected = false;
	dragged = false;
}

function mMove(e)
{
	e.preventDefault();
	currentPosition = {left: e.clientX, top: e.clientY}
	if((originalPosition.left != currentPosition.left || originalPosition.top != currentPosition.top ) && ! dragged && selected)
	{
		dragged = true;
		popup.classList.toggle("dragged");
		popup.classList.toggle("dropped");
	}

	if (dragged)
	{
		mousePosition = {x : e.clientX, y : e.clientY};
		popup.style.left = (mousePosition.x + offset.x) + 'px';
		popup.style.top  = (mousePosition.y + offset.y) + 'px';
	}
}
