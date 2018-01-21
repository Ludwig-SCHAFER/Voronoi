'use strict';

class Triangle {
	constructor(a, b, c, circumcircle, id)
	{
		this.a = a;
		this.b = b;
		this.c = c;
		this.circumcircle = new Circle(new Point(circumcircle.center.x, circumcircle.center.y,'white',this.id), circumcircle.radius, this.id) ;
		this.id = id;
	}

	toConsole()
	{
		//fancy debug with color in console and clean characters : https://en.wikipedia.org/wiki/Block_Elements
		console.log('%c█%c█%c█','color:' + this.a.color + ';' ,'color:' + this.b.color + ';' ,'color:' + this.c.color + ';' , 'Triangle ' + this.id +' [' + this.a.id + ','+ this.b.id + ','+ this.c.id + '] (' + (Math.round(this.circumcircle.x *100)/100) + ';' + (Math.round(this.circumcircle.y *100)/100) + ')@' + (Math.round(this.circumcircle.radius *100)/100) +'');
	}

	draw(color)
	{
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(this.a.x, c.height - this.a.y);
		ctx.lineTo(this.b.x, c.height - this.b.y);
		ctx.lineTo(this.c.x, c.height - this.c.y);
		ctx.lineTo(this.a.x, c.height - this.a.y);
		ctx.stroke();
	}
}
