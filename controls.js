'use strict';

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
	getSettings();
	initializeSettings();
	redraw();
}

function initializeSettings()
{
	let el;
	//settings.colors.*
	document.getElementById('points_amount').value = settings.points;
	document.getElementById('color_background').value = settings.colors.background;
	document.getElementById('color_vertices').value = settings.colors.vertices;
	document.getElementById('color_triangles').value = settings.colors.triangles;
	document.getElementById('color_circumcircles').value = settings.colors.circumcircles;
	document.getElementById('color_centers').value = settings.colors.centers;
	//settings.draw.*
	setCheckbox(draw_points, 			settings.draw.points);
	setCheckbox(draw_vertices, 			settings.draw.vertices);
	setCheckbox(draw_triangles, 		settings.draw.triangles);
	setCheckbox(draw_circumcircles, 	settings.draw.circumcircles);
	setCheckbox(draw_centers, 	settings.draw.centers);
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

function drawCenters()
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

function colorCenters()
{
	let el = document.getElementById('color_centers');
	settings.colors.centers = el.value;
	redraw();
}

/**********************************************************************************************************************
 *???
 **********************************************************************************************************************/
