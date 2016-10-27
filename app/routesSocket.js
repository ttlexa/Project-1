// app/routesSocket.js

module.exports = function(io) {
	io.on('connection', function(socket) {
		console.log('\n - - - connect GLOBAL at ' + socket.id);
		
		require('./chat.js')(io, socket);               // подключение модуля чата
		require('./game_socket.js')(io, socket);        // подключение модуля игры  
		
		socket.on('disconnect', function(socket){
			console.log('\n - - - GLOBAL DISconnect');
		});
	});
};