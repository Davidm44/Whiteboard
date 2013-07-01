

//this is the only jquery on this site
$(document).ready(function() {
	$("#brush_size").hover(
		function() {
			$("ul",this).stop(true,true).slideDown(100);
		},
		function() {
			$("ul",this).stop(true,true).slideUp(100);
		});
		
	$("#colors").hover(
		function() {
			$("ul",this).stop(true,true).slideDown(100);
		},
		function() {
			$("ul",this).stop(true,true).slideUp(100);
		});
});

document.getElementById("clear").onclick = function() {
	clearCanvas();
}

document.getElementById("add_background").onclick = function() {
	var img = prompt("Image URL","");
	document.getElementById("wb_canvas").style.backgroundImage = "url("+img+")";
}



var color_before_erase;

document.getElementById("eraser").onclick = function() {
		color_before_erase = mycontext.strokeStyle;
	
		mycontext.globalCompositeOperation = "destination-out";
		mycontext.fillStyle = "rgba(0,0,0,1);";
		mycontext.strokeStyle = "rgba(0,0,0,1);";
		
		//this.getElementsByTagName("span")[0].innerHTML = "Brush";
		//this.getElementsByTagName("div")[0].style.backgroundImage = "url(images/brush2.png)";
		
		this.style.display = "none";
		document.getElementById("brush").style.display = "block";
}

document.getElementById("brush").onclick = function() {
		
		mycontext.globalCompositeOperation = "source-over";
		mycontext.fillStyle = color_before_erase;
		mycontext.strokeStyle = color_before_erase;
		
		this.style.display = "none";
		document.getElementById("eraser").style.display = "block";
}


chosesize = function(e) {
	var size;
	if(e.id == "custom") {
		size = prompt("Enter brush size","");
	} else {
		size = e.id;
	}
	mycontext.lineWidth = parseInt(size);
}

chosecolor = function(e) {
	
	mycontext.strokeStyle = e.id;
}
