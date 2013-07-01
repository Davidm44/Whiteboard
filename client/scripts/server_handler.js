server_handler = function(action,data) {
	switch(action) {
		case CLIENT_SELF_CONNECTED:
			var curr_clients = data;
			for(i in curr_clients) {
				var li = document.createElement("li");
				var text = document.createTextNode(curr_clients[i]);
				li.appendChild(text);
				document.getElementById("list").appendChild( li );
			}
		break;
		
		case CLIENT_CONNECTED:
			
			var li = document.createElement("li");
			var text = document.createTextNode(data);
			li.appendChild(text);
			document.getElementById("list").appendChild( li );
			
		break;
		
		case CLIENT_DISCONNECTED:
			var client_list = document.getElementById("list");
			var list = client_list.getElementsByTagName("li");
			
			client_list.removeChild(list[data]);
			
		break;
	}
}
