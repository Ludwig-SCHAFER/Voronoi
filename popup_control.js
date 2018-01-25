'use strict';

/**********************************************************************************************************************
 * with some help from the internetz
 * source: https://stackoverflow.com/a/24050777
 *
 * I wasn't realizing i need the mouseup and mousemove events to be attached to the document.
 * This is so obvious, this fixes the input-to-display lag that causes cursor to move outside of the div element for one 100th of a second.
 **********************************************************************************************************************/

/**********************************************************************************************************************
 * CUSTOM : DRAG AND DROP where holding for x ms = HOLDING
 **********************************************************************************************************************/

/**********************************************************************************************************************
 *DOM and Events
 **********************************************************************************************************************/

let popup = document.getElementById("popup");
popup.classList.toggle("dropped");
//set the capture to #popup
popup.addEventListener('mousedown', mDown, false);
//set the motion and release to @document (mouse can move away from #popup when shaken too fast)
document.addEventListener('mouseup', mUp, false);
document.addEventListener('mousemove', mMove, false);
//TODO : not sure if this is useful, but it's fun to work on this function
//window.addEventListener('resize', popupIntoView, false);

let fs = document.getElementsByTagName('legend');
	//fs is an HTML collection and not an array, hence .foreach deoesn't work with this

for (var i = 0; i < fs.length; i++) {
	fs[i].addEventListener('click', toggleFieldset, false);
	fs[i].parentElement.classList.toggle("transition_static");
}


/**********************************************************************************************************************
 * Initial values
 **********************************************************************************************************************/

//distance between the click position and the top-left corner of the popup.
let offset = {x:0,y:0};
//status indicating we clicked on the popup (without knowing user's intention).
let clicked = false;
//status indicating the popup is being selected by a click.
let selected = false;
//status indicating we are now considered being dragged..
let dragged = false;
//status of the minimizeing option
let minimized = false;
//position at start of click (x,y, when).
let originalPosition = {left:0,top:0, time:0, width:0, height:0};
//current position when checked (x,y, when).
let currentPosition = {left:0,top:0,time:0};
//constant telling how many miliseconds an item must be hold to be considered being dragged.
const TIMEOUT_CLICK = 300

/**********************************************************************************************************************
 * Event handling functions
 **********************************************************************************************************************/

//when the poup is being clicked (fired once per click).
function mDown(e)	
{
	clicked = true;
	selected = true;
	dragged = false;
	offset.x = this.offsetLeft - e.clientX;
	offset.y = this.offsetTop - e.clientY;
 	originalPosition = {left:popup.offsetLeft, top:popup.offsetTop, time:Date.now()}
 	setTimeout(checkIfHoldedDown, TIMEOUT_CLICK);
}

//when the popup is being moved, fired several time per seconds.
function mUp(e)
{
	clicked = false;
	if(dragged)
	{
		popup.classList.toggle("dragged");
		popup.classList.toggle("dropped");
	}
	selected = false;
	dragged = false;
}

//when the poup is being unclicked (fired once per click) (triggered by mouse even if cursos is no longer over the popup).
function mMove(e)
{
	e.preventDefault();
	currentPosition = {left: e.clientX, top: e.clientY, time:Date.now()}
	if((originalPosition.left != currentPosition.left || originalPosition.top != currentPosition.top) && ! dragged && selected)
	{
		clicked = false;
		dragged = true;
		popup.classList.toggle("dragged");
		popup.classList.toggle("dropped");
	}

	if (dragged)
	{
		let mousePosition = {x : e.clientX, y : e.clientY};
		popup.style.left = (mousePosition.x + offset.x) + 'px';
		popup.style.top  = (mousePosition.y + offset.y) + 'px';
	}
}

//used to check if user is still holding the popup.
function checkIfHoldedDown()
{
	if(clicked && (Date.now() - originalPosition.time) >= TIMEOUT_CLICK)
	{
		dragged = true;
		popup.classList.toggle("dragged");
		popup.classList.toggle("dropped");
	}
}

//minimize the popup to show more of the content
function toggleControlWindow()
{
	minimized = !minimized;
	let popup_main = popup.children[1];
	let popup_footer = popup.children[2];
	let btn = document.getElementById('control_toggle').children[0];
	if(minimized)
	{
		popup_main.style.display = "none";
		popup_footer.style.visibility = "hidden";
		//🗖
		btn.innerHTML = "&#128470";
	}
	else
	{
		popup_main	.style.display = "block";
		popup_footer.style.visibility = "visible";
		//🗕
		btn.innerHTML = "&#128469";
	}
}

//
function popupInit()
{
	originalPosition.width = popup.offsetWidth;
	//let cs_w = parseInt(window.getComputedStyle(popup).width.slice(0,-2));
	//let cs_h = parseInt(window.getComputedStyle(popup).height.slice(0,-2));
	let cs_w = popup.offsetWidth;
	let cs_h = popup.offsetHeight;

	let w_w = window.innerWidth;
	let w_h = window.innerHeight;

	let temp_left =  (w_w - cs_w)/2;
	if( temp_left < 0)
	{
		temp_left = 0;
	}
	popup.style.left  = temp_left + 'px';

	let temp_top =  (w_h - cs_h)/2;
	if( temp_top < 0)
	{
		temp_top = 0;
	}
	popup.style.top  = temp_top + 'px';

}

//
function popupIntoView()
{
	const percentOfPopupVisible = 30/100;
	//let cs_w = parseInt(window.getComputedStyle(popup).width.slice(0,-2));
	//let cs_h = parseInt(window.getComputedStyle(popup).height.slice(0,-2));
	//let cs_l = parseInt(window.getComputedStyle(popup).left.slice(0,-2));
	//let cs_t = parseInt(window.getComputedStyle(popup).top.slice(0,-2));

	let cs_w = popup.offsetWidth;
	let cs_h = popup.offsetHeight;
	let cs_l = popup.offsetLeft;
	let cs_t = popup.offsetTop;

	console.clear();
	console.log(cs_w, cs_h, cs_l, cs_t, window.innerWidth, window.innerHeight);

	if(cs_l >= 0)
	{
		console.log("	>0")
		if(cs_l + cs_w +10> window.innerWidth)
		{
			console.log("		", (cs_l + cs_w + 10),'>?', window.innerWidth, "----->", window.innerWidth - cs_w)
			popup.style.left = (window.innerWidth - cs_w - 10) + 'px';
		}
	}
}

//
function toggleFieldset(e)
{
	this.parentElement.classList.toggle("transition_dynamic");
}




popupInit();
//force closed at start
//toggleControlWindow();
