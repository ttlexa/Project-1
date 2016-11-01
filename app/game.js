// app/game.js

var socket 	= require('./game_socket.js');

var games 	= []; 		// для хранения созданных игр (напр. с разными ставками)
exports.games=games;

var Game = function(gameNum, roundTime){
	this.gameNum = gameNum;
	this.roundTime = roundTime;
	this.gameStatus = 0;
	this.players = [];
	this.cells = {};
};

exports.initGame = function(roundTime){
	var gameNum=games.length;
	games[gameNum]=new Game(gameNum, roundTime);
	console.log('\n - - - initGame: > ' + gameNum + ' (' + roundTime + 
		' sec) < at  ' + new Date() + '\n');
};

// Object.keys(this.players).length
Game.prototype.playerJoin = function(nick, money){
	console.log('\n - - - player: ' + nick + ' (' + money + ' money) Join to > ' 
		+ this.gameNum + ' (' + this.roundTime + ' sec) < at  ' + new Date() + '\n');
	var playerNum = this.players.length;
	this.players[playerNum] = {'nick' : nick, 'money' : money};
	console.log(this.players);
};

Game.prototype.playerLeave = function(nick, money){
	console.log('\n - - - player: ' + nick + ' (' + money + ' money) Leave from > ' 
		+ this.gameNum + ' (' + this.roundTime + ' sec) < at  ' + new Date() + '\n');
	// // КАК НАЙТИ И УДАЛИТЬ ИЗ МАССИВА НЕОБХОДИМОГО ЮЗЕРА ?????
	// console.log(this.players.indexOf({'nick': nick, 'money': money}));
	// for (var key in this.players){
	// 	console.log(this.players[key].nick)
	// }
	console.log(this.players[0].nick);
};









// Game.prototype.addBet = function(player,bet,cell){
// 	this.cells[cell]={	player:player,
// 						bet:bet	      };
// };
// Game.prototype.startRound = function(){
// 	if (this.players.length > 1) 
// 		return this.playerSitOnTable();
// 	this.playerSitOnTable();
// 	this.startTimeout();
	
// }
// Game.prototype.startTimeout = function(){

// }
// var i=30;
// while(i>0){
// 	setTimeout(function() {
// 		i-=1;
// 		soketEmit(i)
// 	}, 1000);
// }


// games[0].addBet(player,bet,cell)