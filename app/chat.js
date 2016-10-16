// app/chat.js

"use strict"
// TEST - socket.io
// module.exports = function(io){
// 	io.on('connection', function (socket) {
// 	  socket.emit('news', { hello: 'world' });
// 	  socket.on('my other event', function (data) {
// 	    console.log(data);
// 	  });
// 	});	
// };

var User = require('./models/user');
module.exports = function (io) {
io.on('connection', function (socket) {
	console.log(User);
	console.log('connect 111');
});
};