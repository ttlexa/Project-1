// app/game.js

var games = [];


var Game = function(gameNum){
	this.gameNum=gameNum;
	this.players=[];
	this.cells={};
};
Game.prototype.addBet=function(player,bet,cell){
	this.cells[cell]={	player:player,
						bet:bet	      };
};
Game.prototype.startRound = function(){
	if (this.players.length > 1) 
		return this.playerSitOnTable();
	this.playerSitOnTable();
	this.startTimeout();
	
}
Game.prototype.startTimeout=function(){

}
var i=30;
while(i>0){
	setTimeout(function() {
		i-=1;
		soketEmit(i)
	}, 1000);
}

















io.on('connection', function (socket) {
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
	// socket.on('message', function(text){
	// 	io.emit('message', nick, text);
	// });

});

exports.initGame=function(){
var gameNum=games.length;
games[gameNum]=new Game(gameNum);
}
games[0].addBet(player,bet,cell)