var ERR_SUCCESS 		= 0x00;
var ERR_CLIENT_EXISTS 	= 0x01;

require("./Client")

ClientManager = function() {
	this.clients = new Array();
}

ClientManager.prototype.addClient = function(name,connection) {
	
	var newclient = new Client(name,connection);
	this.clients.push(newclient);


};

ClientManager.prototype.getClientListSize = function() {
	return this.clients.length;
};

ClientManager.prototype.getClients = function() {
	return this.clients;
};

ClientManager.prototype.removeClient  = function(index) {
	this.clients.splice(index,1);
};

ClientManager.prototype.getClientByIndex = function(index) {
	return this.clients[index];
}

ClientManager.prototype.broadcastMessage = function(sender,message) {
	for(i in this.clients) {
		if(i == sender) {
			continue;
		} else {
			this.clients[i].send(message);
		}
	}
}