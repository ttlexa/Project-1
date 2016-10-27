// app/game_socket.js

var game = require('./game.js');
game.initGame();

module.exports = function(io) {
	io.on('connection', function(socket) {
		console.log('\n - - - connect "GAME_SOCKET.JS"');
		// console.log(socket.request.headers);
	});
};