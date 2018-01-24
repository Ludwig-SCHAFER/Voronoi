defaultSettings ={
	points:25,
	draw:{
		points:true,
		vertices:true,
		triangles:false,
		circumcircles:false,
		centers:false
	},
	colors:{
		background:'#ffffff',
		points:'auto',
		vertices:'#0000ff',
		triangles:'#cccccc',
		circumcircles:'#00ff00',
		centers:'#ff0000',
	},
	settings:{
		lang:'en',
		langs:['en','fr'],
		opacity:0,
		preset:'set_00',
		snap:true,
		refresh:false
	},
	version:0.1
};

settings = {}; //global
/**********************************************************************************************************************
 *settings.*
 **********************************************************************************************************************/
function getSettings()
{
	let settingsLocale = localStorage.getItem('settings');
	if(settingsLocale == null)
	{
		settings = defaultSettings;
		setSettings();
	}
	else
	{
		settings = JSON.parse(settingsLocale);
	}
}

function setSettings(){
	localStorage.setItem('settings', JSON.stringify(settings));
}

function resetStorage()
{
	localStorage.removeItem('settings');
}

function initializeSettings()
{
	console.log("INIT initializeSettings")
	let el;
	//settings.colors.*
	document.getElementById('points_amount').value = settings.points;
	document.getElementById('color_background').value = settings.colors.background;
	document.getElementById('color_vertices').value = settings.colors.vertices;
	document.getElementById('color_triangles').value = settings.colors.triangles;
	document.getElementById('color_circumcircles').value = settings.colors.circumcircles;
	document.getElementById('color_circumcenters').value = settings.colors.centers;
	//settings.draw.*
	setCheckbox(draw_points, 			settings.draw.points);
	setCheckbox(draw_vertices, 			settings.draw.vertices);
	setCheckbox(draw_triangles, 		settings.draw.triangles);
	setCheckbox(draw_circumcircles, 	settings.draw.circumcircles);
	setCheckbox(draw_circumcenters, 	settings.draw.centers);
}

function setCheckbox(element, bit)
{
	bit ? element.setAttribute('checked', 'checked') : element.removeAttribute ('checked');
}
/**********************************************************************************************************************
 *settings.draw.*
 **********************************************************************************************************************/
function drawPoints()
{
	settings.draw.points = !settings.draw.points;
	redraw();
}

function drawVertices()
{
	settings.draw.vertices = !settings.draw.vertices;
	redraw();
}

function drawTriangles()
{
	settings.draw.triangles = !settings.draw.triangles;
	redraw();
}

function drawCircumcircles()
{
	settings.draw.circumcircles = !settings.draw.circumcircles;
	redraw();
}

function drawCircumcenters()
{
	settings.draw.centers = !settings.draw.centers;
	redraw();
}

/**********************************************************************************************************************
 *settings.colors.*
 **********************************************************************************************************************/
function colorBackground()
{
	let el = document.getElementById('color_background');
	settings.colors.background = el.value;
	redraw();
}

function colorVertices()
{
	let el = document.getElementById('color_vertices');
	settings.colors.vertices = el.value;
	redraw();
}

function colorTriangles()
{
	let el = document.getElementById('color_triangles');
	settings.colors.triangles = el.value;
	redraw();
}

function colorCircumcircles()
{
	let el = document.getElementById('color_circumcircles');
	settings.colors.circumcircles = el.value;
	redraw();
}

function colorCircumcenters()
{
	let el = document.getElementById('color_circumcenters');
	settings.colors.circumcenters = el.value;
	redraw();
}

/**********************************************************************************************************************
 *???
 **********************************************************************************************************************/



getSettings();
initializeSettings();
redraw();
