let popup = document.getElementById("popup");

popup.addEventListener('dragstart', this.dragStartFunction, false);
popup.addEventListener('drop',      this.dropFunction, false);


function dragStartFunction(e)
{
	console.log("dragstart");
	console.log(this);
	console.log(e);
}

function dropFunction()
{
	console.log("drop");
	console.log(this);
	console.log(e);
}
