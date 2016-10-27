// app/chat.js

module.exports = function (io, socket) {

	// console.log(socket.handshake);
	// console.log(socket.request);
	// console.log(socket.request.user);
	console.log('\n - - - connect "CHAT.JS" at ' + socket.id);

	var nick = socket.request.user.local.email;

	// // ВАРИАНТ-1: невозможно выводить свой ник, т.к. ник приходит от сервера
	// // вывод своего сообщения через callback функцию
	// // означает, что сервер получил событие
	// socket.on('message', function(text, cb){
	// 	socket.broadcast.emit('message', nick, text);
	// 	cb();	// запуск callback-функции означает, что сервер получил сообщение
	// });

	// // ВАРИАНТ-2: отправка своего сообщения всем, включая себя же
	socket.on('message', function(text){
		io.emit('message', nick, text);
	});

	socket.on('disconnect', function(socket){
		console.log('\n - - - "CHAT.JS" DISconnect');
	});

};