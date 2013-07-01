Client = function(name,connection) {
	this.name = name;

	this.connection = connection;
}

Client.prototype.getName = function() {
	return this.name;
}

Client.prototype.send = function(message) {
	this.connection.send(message);
}