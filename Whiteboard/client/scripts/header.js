//message types
var SERVER_MESSAGE 			=	0x00;
var WHITEBOARD_MESSAGE		=	0x01;

//server actions
var CLIENT_CONNECTED 		=	0x00;
var CLIENT_SELF_CONNECTED 	=	0x01;
var CLIENT_DISCONNECTED 	=	0x02;

//whiteboard actions
var DRAW					= 	0x00;
var DRAW_HISTORY			=	0x01;
var CLEAR_CANVAS			=	0x02;
var ADD_IMAGE				=	0x03;
var ACTIVE 					=	0x04;
var INACTIVE				=	0x05;