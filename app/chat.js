// app/chat.js

module.exports = function (io) {

	var chat = io.of('/chat');

	chat.on('connection', function(socket){
		
		var nick = socket.request.user.local.email;	

		// console.log(socket.handshake);
		// console.log(socket.request);
		// console.log(socket.request.user);
		console.log('\n - - - connect "CHAT.JS" at socket.id: ' + socket.id);

		// // Вывод своего же сообщения через callback функцию на клиенте
		// // означает, что сервер получил событие
		socket.on('message', function(text, cb){
			socket.broadcast.emit('message', nick, text);
			cb(nick);	// запуск callback-функции означает, что сервер получил сообщение
		});

		socket.on('disconnect', function(socket){
			console.log('\n - - - "CHAT.JS" DISconnect');
		});

	});
};