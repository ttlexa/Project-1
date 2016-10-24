// app/chat.js

module.exports = function (app, passport, io) {

// io.set('authorization', function(handshake, callback){

// })

io.on('connection', function (socket) {
// console.log(socket.handshake);
// console.log(socket.request);

	socket.on('message', function(text, cb){
		socket.broadcast.emit('message', text);
		cb();	// запуск callback-функции означает, что сервер получил сообщение
	
	});

});
};