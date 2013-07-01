<html>
	
	<link href="style/style.css" rel="stylesheet" type="text/css">
	<link href="style/clientlist.css" rel="stylesheet" type="text/css">
	<link href="style/toolbar.css" rel="stylesheet" type="text/css">	
	<link href="style/whiteboard.css" rel="stylesheet" type="text/css">		
	
	<body>
		<div id="connect_screen">
			
			<div id="title">
				<img id="title_text" src="images/title_text.png"/>
				<img id="title_image" src="images/title_image.png"/>
				
				<p>David M. - Thuggin' since '92.</p>
			</div>
			
			<div id="page">
				<div id="page_shade"></div>
				<div id="button_connect" onclick="connect()">
					Connect
				</div>
				
				<div id="name">
					<input type="text" id="name_textarea" onkeydown="pressedEnter(event);">
				</div>
			
			</div>
			
		</div>
		
		<div id="whiteboard_screen">
			
			<div id="toolbar">
				<ul>
					<li id="clear"><div><span>Clear</span></div></li>
					<li id="add_background"><div><span>Image</span></div></li>
					
					<li id="brush_size">
						<div>
							<span>Size</span>
						</div>
						<ul>
							<li id="1" onclick="chosesize(this);">1</li>
							<li id="5" onclick="chosesize(this);">5</li>
							<li id="10" onclick="chosesize(this);">10</li>
							<li id="15" onclick="chosesize(this);">15</li>
							<li id="20" onclick="chosesize(this);">20</li>
							<li id="30" onclick="chosesize(this);">30</li>
							<li id="200" onclick="chosesize(this);">200</li>
							
							<li id="custom" onclick="chosesize(this);">Custom</li>
						</ul>
						
					</li>
					
					<li id="eraser"><div><span>Eraser</span></div></li>
					<li id="brush" style="display:none;"><div><span>Brush</span></div></li>
					
					<li id="colors">
						<div>
							<span>Color</span>
						</div>
						
						<ul>
							<li id="Red" onclick="chosecolor(this);">Red</li>
							<li id="HotPink" onclick="chosecolor(this);">Pink</li>
							<li id="Purple" onclick="chosecolor(this);">Purple</li>
							<li id="Blue" onclick="chosecolor(this);">Blue</li>
							<li id="Aqua" onclick="chosecolor(this);">Aqua</li>
							<li id="Lime" onclick="chosecolor(this);">Green</li>
							<li id="Yellow" onclick="chosecolor(this);">Yellow</li>
							<li id="Orange" onclick="chosecolor(this);">Orange</li>
							<li id="Black" onclick="chosecolor(this);">Black</li>
							<li id="White" onclick="chosecolor(this);">White</li>
							
						</ul>
					</li>
					
					<input id="selectfile" type="file" accept="image/*" style="display:none;"/>
				</ul>
			</div>
			
			
			
			<div id="clients">
				<p>Who's Drawing?</p>
			<hr>
				<ul id="list">
					
				</ul>
			</div>
			
			
			<canvas id="wb_canvas" width="1100" height="600">
				
			</canvas>
	
			
		</div>
		
	</body>

	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="scripts/header.js"></script>
	<script src="scripts/server_handler.js"></script>
	<script src="scripts/whiteboard_handler.js"></script>
	<script src="scripts/toolbar.js"></script>
	<script src="scripts/websocket.js"></script>
	
</html>