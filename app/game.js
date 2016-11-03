// app/game.js

var socket 	= require('./game_socket.js');

var games 	= []; 		// для хранения созданных игр (напр. с разными ставками)
exports.games=games;

var Game = function(gameNum, roundTime){
	this.gameNum = gameNum;
	this.roundTime = roundTime;
	// Game Status:
	// 0 - Game Init: wait for players
	// 1 - Game Start: wait for bet's from players
	// 2 - Game Start: spinning wheel
	// 3 - Game Done: show WIN-number, check WIN bet's in cells
	this.gameStatus = 0;
	this.players = {};
	this.cells = {};
};

exports.initGame = function(roundTime){
	var gameNum=games.length;
	games[gameNum]=new Game(gameNum, roundTime);
	console.log('\n - - - initGame: > ' + gameNum + ' (' + roundTime + 
		' sec) < at  ' + new Date() + '\n');
};

// Object.keys(this.players).length
Game.prototype.playerJoin = function(user, nick, money){
	console.log('\n - - - player: ' + nick + ' (' + money + ' money) Join to > ' 
		+ this.gameNum + ' (' + this.roundTime + ' sec) < at  ' + new Date() + '\n');
	this.players[user.id] = {'nick' : nick, 'money' : money};
	console.log(this.players);
	this.checkgameStatus();
};

Game.prototype.playerLeave = function(user, nick, money){
	console.log('\n - - - player: ' + nick + ' (' + money + ' money) Leave from > ' 
		+ this.gameNum + ' (' + this.roundTime + ' sec) < at  ' + new Date() + '\n');
	// console.log(this.players.indexOf({'nick': nick, 'money': money}));
	// for (var key in this.players){
	// 	console.log(this.players[key].nick)
	// }
	
	// // перебор, поиск и удаление в индексированном массиве
	// this.players.forEach(function(item,i){
	// 	if(item.nick===nick)
	// 		return this.players.splice(i,1);
	// });
	for (var key in this.players){
		if(key === user.id){
			delete this.players[key]
		};
	};
	console.log(this.players);
	// // ВРЕМЕННО:
	this.gameStatus = 0;
};

Game.prototype.checkgameStatus = function(){
	console.log('Game Status: ' + this.gameStatus);
	switch (this.gameStatus){
		case 0: this.startRound();
				break;
		case 1: 
				break;
		case 2: 
				break;
		case 3: 
				break;
	};

};

Game.prototype.startRound = function(){
	this.gameStatus = 1;
	this.startTimeForBet();
};

Game.prototype.startTimeForBet = function(){
	var timeForBet = this.roundTime;
	// for (timeForBet; timeForBet > 0; timeForBet--) {
	// 	setTimeout (function(){
	// 		socket.startTimeForBet(timeForBet);
	// 		console.log (timeForBet);
	// 	}, 1000);
	// while (timeForBet > 0){
	// 	var timerId = setInterval (function(){
	// 			socket.startTimeForBet(timeForBet);
	// 			console.log (timeForBet);
	// 			timeForBet--;
	// 		}, 1000);
	// 	clearInterval(timerId)
	// };
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