#To test: Notes while developing#

To implement ->
	lobbies to join | lobbies joined by user
	be able to begin game if user is owner
	players list, with links to user profile
	satandictionary of rooms -> another branch?	
	list of players with nice format
	
	//anotaciones de clases
	rooms devuelve todos
	redir a lobbies
	sin chekeos en el front...  guardar lo de max_play y players como 4/4 y no dejar hacer click -> como 3/4 y ahí sí.
	token -> guardar localstorage (chekear con el localstorage 
	dejar el dibujado del tablero como issue abierto
	
	//a mejorar
	detallar con que issue esta relacionado el merge req
	como es frontend -> poner imagen de cómo se ve (esto es documentar!)
	documentar mejor los merge req
	a
	si no estas autent solo podes ver el login
	catch en todo fetch .. 401 redirect al login...tiene que estar en una sola funcion y que todos lo llamen
	no podes ver los juegos de otros
	no hacer mr sin testing



Should test ->
	join lobby if lobby is full
	join lobby if user is already in other lobby/game
	begin game if not min players
	join already joined lobby	
