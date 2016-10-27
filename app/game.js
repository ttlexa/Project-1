// app/game.js

var socket 	= require('./game_socket.js');

var games 	= []; 		// для хранения созданных игр (напр. с разными ставками)
exports.games=games;

var Game = function(gameNum){
	this.gameNum = gameNum;
	this.gameStatus = 0;
	this.players = [];
	this.cells = {};
};

exports.initGame = function(){
	var gameNum=games.length;
	games[gameNum]=new Game(gameNum);
	console.log('\n- - - initGame: > ' + gameNum + ' < at  ' + new Date() + '\n');
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