//message types
var SERVER_MESSAGE 			=	0x00;
var WHITEBOARD_MESSAGE		=	0x01;

//server actions
var CLIENT_CONNECTED 		=	0x00;
var CLIENT_SELF_CONNECTED 	=	0x01;
var CLIENT_DISCONNECTED 	=	0x02;

//whiteboard actions
var DRAW					=	0x00;
var DRAW_HISTORY			=	0x01;
var CLEAR_CANVAS			=	0x02;
var ADD_IMAGE				=	0x03;
var ACTIVE 					=	0x04;
var INACTIVE				=	0x05;


//header
require("./ClientManager");
var WebSocketServer = require("websocket").server;
var http = require("http");

//globals
var cm = new ClientManager();
var connections = new Array();

var drawHistory = new Array();
var curr_image;


var server = http.createServer(function(socket) {
	
});

server.listen(1337,function() {});

wsServer = new WebSocketServer({
	httpServer: server
});

wsServer.on("request",function(request) {
	var connection = request.accept(null,request.origin);

	connections.push(connection);

	connection.on("message",function(message) {
		var index = connections.indexOf(connection);

		var msg = JSON.parse(message.utf8Data);

		if(msg.type == "handshake") {
			cm.addClient(msg.data,connection);
			console.log(msg.data + " has connected.");

			var client_names = new Array();
			for(i in cm.getClients()) {
				client_names.push(cm.getClients()[i].getName());
			}

			cm.getClientByIndex(index).send(JSON.stringify({type:SERVER_MESSAGE,action:CLIENT_SELF_CONNECTED,data:client_names}));
			cm.broadcastMessage(index,JSON.stringify({type:SERVER_MESSAGE,action:CLIENT_CONNECTED,data:msg.data}));

			cm.getClientByIndex(index).send(JSON.stringify({type:WHITEBOARD_MESSAGE,action:DRAW_HISTORY,data:drawHistory}));

		}

		if(msg.type == WHITEBOARD_MESSAGE) {
			switch(msg.action) {
				case DRAW:
					drawHistory.push(msg.data);
					console.log(msg.data);

					cm.broadcastMessage(index,JSON.stringify(msg));
					cm.broadcastMessage(-1,JSON.stringify({type:WHITEBOARD_MESSAGE,action:ACTIVE,data:index}))
				break;
				
				case CLEAR_CANVAS:
					drawHistory.splice(0,drawHistory.length);
					cm.broadcastMessage(index,JSON.stringify(msg));
					console.log(cm.getClientByIndex(index).getName() + " cleared the canvas.");
				break;
				
				case INACTIVE:
					msg.data = index;
					
					cm.broadcastMessage(-1,JSON.stringify(msg));
				break;

			}

		}


	});

	connection.on("close",function() {
		var index = connections.indexOf(connection);

		console.log(cm.getClientByIndex(index).getName() + " has disconnected.");
		cm.broadcastMessage(index,JSON.stringify({type:SERVER_MESSAGE,action:CLIENT_DISCONNECTED,data:index}));
		cm.removeClient(index);

		connections.splice(index,1);
	});

	
});