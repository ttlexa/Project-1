// app/chat.js

module.exports = function (io) {
io.on('connection', function (socket) {
	
	socket.on('message', function(text, cb){
		socket.broadcast.emit('message', text);
		cb();
	});

});
};