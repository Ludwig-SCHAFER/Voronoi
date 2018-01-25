'use strict';

/**********************************************************************************************************************
 *???
 **********************************************************************************************************************/
let defaultSettings ={
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

let settings = {}; //global

getSettings();
initializeSettings();

/**********************************************************************************************************************
 *???
 **********************************************************************************************************************/
const c   = document.getElementById("canvas_voronoi");
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext("2d");

let points = [];
let triangles = [];
let circles = [];
let pairs = [];

//create array of points
generateRandomPoints(settings.points);

// sort point by X
sortPointsByX();

//reassign ids from left to right (except for cheated points)
reassignIDs()

/**********************************************************************************************************************
 *???
 **********************************************************************************************************************/
consoleSeparator();
console.groupCollapsed('[TODO]');
console.log('TODO : gerer polygones ocmmes objets');
console.log('TODO : sauver PARAMETRES en obj - localstorage');
console.log('TODO : ajouter un point au clic (option pour desactiver)');
console.log('TODO : charger une image custom avec 0 points');
console.log('TODO : image de fond à prévoir dans le script');
console.log('TODO : position de la fenêtre à sauvegarder');
console.log('TODO : en vue du coloriage des cellules, bouton : shuffle colors des points !');
console.log('TODO : un gestionnaire de TODO perso');
console.log('TODO : redraw en fonction du resize de window (avec un timer afin de pas faire 15 redraw /sec)');
console.log('TODO : homogeneiser les commentaires fr/en & style');
console.log('TODO : gestion des objets, verifier qu\'ils sont passés correctement et ne pas les recreer à la volée.');
console.log('TODO : store triangles, point, in a hashmap and check if hashmap are \'foreach\'able');
console.log('TODO : enregister des sets de points');
console.log('TODO : charger des sets de points');
console.log('TODO : format de sauvegarde :');
console.log('TODO :		"clé:data" pour les points, clé = (defaut : timestamp) (String saisie par user)');
console.log('TODO :		"save":array[clés]');
console.log('TODO :	creer une class popup !');
console.groupEnd();


consoleSeparator();
{
	console.groupCollapsed('[PROCESSING]');
	process();
	console.groupEnd();
}
consoleSeparator();
{
	console.groupCollapsed('[LIST OF POINTS]');
	points.forEach(p => p.toConsole());
	console.groupEnd();
}
consoleSeparator();
{
	console.groupCollapsed('[LIST OF TRIANGLES]');
	triangles.forEach(t => t.toConsole());
	console.groupEnd();
}
consoleSeparator();
{
	console.groupCollapsed('[LIST OF CIRCLES]');
	circles.forEach(c => c.toConsole());
	console.groupEnd();
}
consoleSeparator();
{
	console.groupCollapsed('[LIST OF PAIRS OF TRIANGLES]');
	pairs.forEach(p => console.log(p.t1, p.t2));
	console.groupEnd();
}
consoleSeparator();


//console.clear();



/**********************************************************************************************************************
 *???
 **********************************************************************************************************************/



redraw();
