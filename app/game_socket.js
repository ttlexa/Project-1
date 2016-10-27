// app/game_socket.js

var game = require('./game.js');
game.initGame();

module.exports = function(io, socket) {
	console.log('\n - - - connect "GAME_SOCKET.JS" at ' + socket.id);
	// console.log(socket.request.headers);

	socket.on('disconnect', function(socket){
		console.log('\n - - - "GAME_SOCKET.JS" DISconnect');
	});
};