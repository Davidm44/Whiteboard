var websocket;
var connected = false;

pressedEnter = function(e) {
	if(!connected) {
		var key = window.event ? event.keyCode : e.which;
		if(key == 13) {
			document.getElementById("button_connect").click();
		}
	}
}

connect = function() {
	
	var name = document.getElementById("name_textarea").value;
			
	if(name == "") {
		alert("You must insert a name!");
		return;
	}
	
	websocket = new WebSocket("ws://24.201.208.61:1337");
	websocket.onopen = function() {
		
		//send handshake data needed
	
		document.getElementById("connect_screen").style.display = "none";
		document.getElementById("whiteboard_screen").style.display = "block";
	
		websocket.send(JSON.stringify({type:"handshake",data:name}));
		
		message_handler();
		
		connected = true;
	};
}

message_handler = function() {
	websocket.onmessage = function(msg) {
		var message = JSON.parse(msg.data);
		
		
		switch(message.type) {
			case SERVER_MESSAGE:
				
				server_handler(message.action,message.data);
			break;
			
			case WHITEBOARD_MESSAGE:
				whiteboard_handler(message.action,message.data);
			break;
		}
	}
}
