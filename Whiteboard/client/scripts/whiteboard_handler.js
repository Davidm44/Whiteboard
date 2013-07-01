var canvas;
var context;

var curr_mouse_pos= {x:0,y:0};
var last_mouse_pos= {x:0,y:0};



canvas = document.getElementById("wb_canvas");
	
mycontext = canvas.getContext("2d");

var old_color;
var old_width;
var old_composite;

var default_size = 15;

mycontext.globalCompositeOperation = "source-over";
mycontext.strokeStyle = 'black';
mycontext.lineWidth = default_size;
mycontext.lineJoin = 'round';
mycontext.lineCap = 'round';



function LineCoordinates(context,lastmouse,currmouse) {
	this.index;
	
	this.context = {
		strokeStyle: context.strokeStyle,
		lineWidth: context.lineWidth,
		globalCompositeOperation: context.globalCompositeOperation
	}
	this.lastmouse = {x:lastmouse.x,y:lastmouse.y};
	this.currmouse = {x:currmouse.x,y:currmouse.y};
}

canvas.addEventListener('mousemove',function(e) {
	last_mouse_pos.x = curr_mouse_pos.x;
	last_mouse_pos.y = curr_mouse_pos.y;
	
	curr_mouse_pos.x = e.pageX - this.offsetLeft;
	curr_mouse_pos.y = e.pageY - this.offsetTop;
},false);

canvas.addEventListener("mousedown",function(e){
	
	e.preventDefault();
	e.stopPropagation();
	e.target.style.cursor = 'crosshair';
	onDraw();
	canvas.addEventListener("mousemove",onDraw,false);
	
},false);

canvas.addEventListener("mouseup",function(e){
	canvas.removeEventListener("mousemove",onDraw,false);
	websocket.send(JSON.stringify({type:WHITEBOARD_MESSAGE,action:INACTIVE,data:0}));
	
	
},false);

Draw = function(context,last_mouse,curr_mouse) {
	
	old_color = mycontext.strokeStyle;
	old_width = mycontext.lineWidth;
	old_composite = mycontext.globalCompositeOperation;
	
	
	mycontext.strokeStyle = context.strokeStyle;
	mycontext.lineWidth = context.lineWidth;
	mycontext.globalCompositeOperation = context.globalCompositeOperation;
	
	mycontext.beginPath();
	mycontext.moveTo(last_mouse.x, last_mouse.y);
	mycontext.lineTo(curr_mouse.x, curr_mouse.y);
	mycontext.closePath();
	mycontext.stroke();
	
	mycontext.strokeStyle = old_color;
	mycontext.lineWidth = old_width;
	mycontext.globalCompositeOperation = old_composite;
	
}

onDraw = function() {
	var line = new LineCoordinates(mycontext,last_mouse_pos,curr_mouse_pos);
	
	Draw(mycontext,last_mouse_pos,curr_mouse_pos);
	websocket.send(JSON.stringify({type:WHITEBOARD_MESSAGE,action:DRAW,data:line}));
}

clearCanvas = function() {
	mycontext.clearRect(0,0,canvas.width,canvas.height);
	websocket.send(JSON.stringify({type:WHITEBOARD_MESSAGE,action:CLEAR_CANVAS}));
}


whiteboard_handler = function(action,data) {
	switch(action) {
		case DRAW:

			Draw(data.context,data.lastmouse,data.currmouse);
		break;
		
		case DRAW_HISTORY:
			console.log(data);
			for(var i=0;i<data.length;i++) {
				Draw(data[i].context,data[i].lastmouse,data[i].currmouse);
			}
			
		break;
		
		case CLEAR_CANVAS:
			mycontext.clearRect(0,0,canvas.width,canvas.height);
		break;
		
		case ACTIVE:
			var client = document.getElementById("list").getElementsByTagName("li")[data];
			client.style.color = "#FF9D00";
		break;
		
		case INACTIVE:
			var client = document.getElementById("list").getElementsByTagName("li")[data];
			client.style.color = "#009DFF";
		break;
	
	}
}


