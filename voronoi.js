'use strict';

function loadPointsFromLocaleStorage()
{
	let jsonData = JSON.parse(localStorage.getItem('points'));

	points = [];

	for (let i = 0; i < jsonData.length; i++)
	{
		let a = jsonData[i]
		points[i] = new Point(a.x, a.y, a.color, a.id);
	}
}

function savePointsToLocaleStorage()
{
	localStorage.setItem('points', JSON.stringify(points));
}

function generateRandomPoints(n)
{
	for(let i = 0; i < n; i++)
	{
		let x = Math.random() * c.width;
		let y = Math.random() * c.height;

		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);

		let color = 'rgb(' + r + ', ' + g +', ' + b + ')';

		points.push(new Point(x, y, color, i));
	}
	addCheatedPointsInFarCorners();
}

function sortPointsByX()
{
	for(let i = 0; i < points.length; i++)
	{
		let ref = 0;
		for(let j = 0; j < points.length-i; j++)
		{
			if(points[ref].x < points[j].x)
			{
				ref = j;
			}
			let temp = points[points.length-i-1];
			points[points.length-i-1] = points[ref];
			points[ref] = temp;
		}
	}
}

function addCheatedPointsInFarCorners()
{
	//cheat/hack
	//i generate points in corners that are very very far away from the canvas view.
	//this is a hack that is made so i do not have to find the rare triangles that do not have adjacents triangles
	//illusion : 10/10
	//laziness : 10/10
	points.push(new Point(-999999.99,-999999.96,'#555', points.length));
	points.push(new Point(+999999.98,-999999.97,'#555', points.length));
	points.push(new Point(-999999.97,+999999.98,'#555', points.length));
	points.push(new Point(+999999.96,+999999.99,'#555', points.length));
}

function consoleSeparator()
{
	console.log('%c' + '▄'.repeat(120) , 'color:#FFB000;');
}

/*===========================================================================*/
/*
console.log('TODO : gerer polygones ocmmes objets');
console.log('TODO : sauver PARAMETRES en obj - localstorage');
console.log('TODO : ajouter un point au clic (option pour desactiver)');
console.log('TODO : charger une image custom avec 0 points');
console.log('TODO : image de fond à prévoir dans le script');


//TODO : position de la fenêtre à sauvegarder
//TODO en vue du coloriage des cellules, bouton : shuffle colors des points !
//TODO : un gestionnaire de TODO perso
//TODO : redraw en fonction du resize de window (avec un timer afin de pas faire 15 redraw /sec)
//homogeneiser les commentaires fr/en & style
// gestion des objets, verifier qu'ils sont passés correctement et ne pas les recreer à la volée.
/**/
console.log("START");
const c   = document.getElementById("canvas_voronoi");
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext("2d");

let points = [];
let triangles = [];
let circles = [];
let pairs = [];

const MAX_POINTS = 50;

//create array of points
generateRandomPoints(MAX_POINTS);

// sort point by X
sortPointsByX();

//reassign ids from left to right
for(let i = 0; i < points.length; i++)
{
	points[i].id = i;
}

let flagCircleInvalid = false;
let done = [];

function process()
{
	triangles = [];
	circles = [];
	pairs = [];

	//console.log('Start processing triangles');
	for (let i = 0; i < points.length; i++)
	{
		done[i] = [];
		for (let j = 0; j < points.length; j++)
		{
			done[i][j] = [];
			for (let k = 0; k < points.length; k++)
			{
				//don't do it if it's alreadydone.
				let u =i;
				let v =j;
				let w =k;
				let temp = 0;
				if(u>v){temp = u;u = v;v = temp;}
				if(v>w){temp = v;v = w;w = temp;}
				if(u>v){temp = u;u = v;v = temp;}//it's ok if it's the same as line 1 !!

				if(done[u][v][w])
				{
					continue;
				}
				if(i ==j || j ==k || i ==k)
				{
					continue;
				}
				done[u][v][w] = true;
				//calculer cercle circonscrit
				//triangle ABC
				//je prend E et F milieu de AB at AC
				//je tourne de 90° (x,y) => (-y,x) AB et AC pour obtenir les vecteurs v1 et v2
				//je calcule d1 la droite qui suit le vecteur v1 et qui passe par E
				//je calcule d2 la droite qui suit le vecteur v2 et qui passe par F
				//je résout d1 = d2 pour trouver le poitn d'intersection des médiatrices et j'ai le centre du triangle circonscrit
				let A = points[u];
				let B = points[v];
				let C = points[w];

				let E = {x:0,y:0};
				let F = {x:0,y:0};

				E.x = (A.x + B.x)/2;
				E.y = (A.y + B.y)/2;
				F.x = (A.x + C.x)/2;
				F.y = (A.y + C.y)/2;

				let v1 = {x:0,y:0};
				let v2 = {x:0,y:0};

				v1.x = -B.y+A.y;
				v1.y =  B.x-A.x;
				v2.x = -C.y+A.y;
				v2.y =  C.x-A.x;

				let d1 = {a:0,b:0};
				let d2 = {a:0,b:0};

				d1.a = v1.y/v1.x;
				d2.a = v2.y/v2.x;
				//case when 2 points share the same y value, d1.a = infinty (vertical) since v1.x = 0 and we divise by this value :(
				if(!isFinite(d1.a))
				{
					d1.a = 10000;
					console.log('woops, same Y value found', u, v, w);
				}
				//case when 2 points share the same y value, d2.a = infinty (vertical) since v2.x = 0 and we divise by this value :(
				if(!isFinite(d2.a))
				{
					d2.a = 10000;
					console.log('woops, same Y value found', u, v, w);
				}
				d1.b = E.y - d1.a * E.x;
				d2.b = F.y - d2.a * F.x;

				let circumcircle = new Circle (new Point(0, 0, 0), 0);

				circumcircle.center.x = (d2.b-d1.b)/(d1.a-d2.a);
				circumcircle.center.y = d1.a * circumcircle.center.x + d1.b;
				circumcircle.radius = circumcircle.center.distanceFrom(A);

				//pour chaque point non i j k, est il dans le cercle ? (dist p<->centre < rayon)
				//	si oui, triplet est faux : 'break', flag!!
				//	si non, ajouter triplet i j k à liste de triangles OK
				flagCircleInvalid = false;
				for (let m = 0; m < points.length; m++)
				{
					if (m == i || m == j || m == k)
					{
						continue;
					}
					//let distFromCenter = Math.sqrt((points[m].x - circumcircle.x) * (points[m].x - circumcircle.x) + (points[m].y - circumcircle.y) * (points[m].y - circumcircle.y));
					let distFromCenter = circumcircle.center.distanceFrom(points[m]);
					if (distFromCenter < circumcircle.radius)
					{
						flagCircleInvalid = true;
						break;
					}
				}//end for m
				if(!flagCircleInvalid)
				{
					triangles.push( new Triangle(points[u],points[v],points[w], circumcircle, triangles.length));
					circumcircle.id = circles.length;
					circles.push(circumcircle);
				}
			}//end for k
		}//end for j
	}//end for i
	//console.log('Stop processing triangles. Found ' +  triangles.length + '.');
	//NOTE: The Delaunay flipping is done implicitly since we didnt allow a triangle to live if the circumcircle cointained a point not from the triangle itself!!!
	//console.log('Start pairing triangles');
	for (let i = 0; i < triangles.length; i++)
	{
		let t1 = triangles[i];
		let t1_points = [t1.a.id, t1.b.id, t1.c.id];

		for (let j = i+1; j < triangles.length; j++)
		{

			let t2 = triangles[j];
			let t2_points = [t2.a.id, t2.b.id, t2.c.id];

			let ctr = 0;
			for (let u = 0; u < t1_points.length; u++)
			{
				for (let v = 0; v < t1_points.length; v++)
				{
					if (t1_points[u] == t2_points[v])
					{
						ctr++;
					}
				}
			}

			if(ctr == 3)
			{
				console.log('erreur triangle doublon');
				t1.toConsole();
				t2.toConsole();
			}
			if(ctr == 2)
			{
				pairs.push({t1:t1.id, t2:t2.id});
			}
		}
	}
	//console.log('Stop pairing triangles. Paired ' + pairs.length + '.');
}
process();

function redraw()
{
	setSettings();

	clearCanvas();

	if(settings.draw.points)
	{
		points.forEach(p => p.drawAsSquare());
		points.forEach(p => p.drawNumber());
	}

	if(settings.draw.triangles)
	{
		triangles.forEach(t=> t.draw(settings.colors.triangles));
	}

	if(settings.draw.circumcircles)
	{
		circles.forEach(c=> c.draw(settings.colors.circumcircles));
	}

	if(settings.draw.centers)
	{
		triangles.forEach(t=> t.circumcircle.drawCenter(settings.colors.centers));
	}

	if(settings.draw.vertices)
	{
		for (let i = 0; i < pairs.length; i++)
		{
			ctx.strokeStyle = settings.colors.vertices;
			ctx.beginPath();
			ctx.moveTo(triangles[pairs[i].t1].circumcircle.center.x, c.height- triangles[pairs[i].t1].circumcircle.center.y);
			ctx.lineTo(triangles[pairs[i].t2].circumcircle.center.x, c.height- triangles[pairs[i].t2].circumcircle.center.y);
			ctx.stroke();
		}
	}
}

function clearCanvas()
{
	c.width = c.width;
	//ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = settings.colors.background;
	ctx.fillRect(0, 0, c.width, c.height);
}


/*
consoleSeparator();
console.groupCollapsed('[LIST OF POINTS]');
points.forEach(p => p.toConsole());
console.groupEnd();
consoleSeparator();
console.groupCollapsed('[LIST OF TRIANGLES]');
triangles.forEach(t => t.toConsole());
console.groupEnd();
consoleSeparator();
console.groupCollapsed('[LIST OF CIRCLES]');
circles.forEach(c => c.toConsole());
console.groupEnd();
consoleSeparator();
console.groupCollapsed('[LIST OF PAIRS OF TRIANGLES]');
pairs.forEach(p => console.log(p.t1, p.t2));
console.groupEnd();
consoleSeparator();
console.log("END");/**/

//console.clear();
