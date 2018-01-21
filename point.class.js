'use strict';

class Point {
	constructor(x, y, color, id)
	{
		this.x = x;
		this.y = y;
		this.color = color;
		this.id = id;
	}

	toConsole()
	{
		//fancy debug with color in console and clean characters : https://en.wikipedia.org/wiki/Block_Elements
		console.log('%c███','color:' + this.color + ';' , 'Point[' + this.id + '] at x='+ this.x + ' and y='+ this.y+ ' and of color='+ this.color);
	}

	drawAsSquare(color = this.color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(this.x-3, c.height - this.y-3, 7, 7);
		ctx.strokeStyle = 'black';
	}

	drawAsCross(color)
	{
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(this.x - 5, c.height - this.y - 5);
		ctx.lineTo(this.x + 5, c.height - this.y + 5);
		ctx.moveTo(this.x - 5, c.height - this.y + 5);
		ctx.lineTo(this.x + 5, c.height - this.y - 5);
		ctx.stroke();
	}

	drawNumber()
	{
		ctx.fillStyle = '#000000';
		ctx.font = '16px consolas';
		ctx.fillText(this.id, this.x+4,c.height - this.y+4);
	}

	distanceFrom(p)
	{
		return Math.sqrt((this.x - p.x)*(this.x - p.x)+(this.y - p.y)*(this.y - p.y));
	}
}
