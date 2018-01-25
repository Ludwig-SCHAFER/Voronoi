'use strict';

class Circle {
	constructor(center, radius, id)
	{
		this.center = center;
		this.radius = radius;
		this.id = id;
	}

	toConsole()
	{
		//fancy debug with color in console and clean characters : https://en.wikipedia.org/wiki/Block_Elements
		console.log('%c███','color:' + '#00FF00' + ';' , 'Circle[' + this.id + '] at x='+ this.center.x + ' and y='+ this.center.y+ ' and of radius='+ this.radius);
	}

	draw(color)
	{
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.arc(this.center.x, c.height - this.center.y, this.radius, 0, 6.3);//6.3 is 2*Math.Pi rounded.
		ctx.stroke();
	}

	drawCenter(color)
	{
		this.center.drawAsCross(color);
	}
}
