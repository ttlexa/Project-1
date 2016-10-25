// app/chat.js

module.exports = function (app, io) {

	io.on('connection', function (socket) {
	// console.log(socket.handshake);
	// console.log(socket.request);
	console.log(socket.request.user);

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

	});
};