// server.js

// установка ==========================================================
// подключение необходимых модулей
var config 		= require('./config');
var express 	= require('express');
var app 		= express();
var cookieParser = require('cookie-parser');
var bodyParser 	= require('body-parser');
var session 	= require('express-session');
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var mongoStore 	= require('connect-mongo')(session);
var passport 	= require('passport');
var flash 		= require('connect-flash');
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);
var sessionStore = new mongoStore({
	url : config.get('db:connection') + config.get('db:name')
});
var passportSocketIo = require("passport.socketio");
// ЗАКРЫТ ДОСТУП к socket.io ('connection') без авторизации
// Что бы ОТКРЫТЬ ДОСТУП к socket.io ('connection')
// в функции "AuthFail" - запустить "accept();"
var socket 		= require('./app/socket.js');

// конфигурация =======================================================
mongoose.connect(config.get('db:connection') + config.get('db:name')); // подключение к БД по пути из config'a

require('./app/passport.js')(passport); // передача passport'a дял конфигурации

// настройка express'a и др. модулей
app.use(morgan('dev'));			// логирование запросов в консоль
app.use(cookieParser());		// чтение cookies (необходимо для auth)
app.use(bodyParser.json());		// получение информации из html
app.use(bodyParser.urlencoded({	// получение информации из html
  extended: true
}));
app.use(session({
	secret 	: config.get('session:secret'), 	// ключ-секрет сессии
	cookie 	: config.get('session:cookie'), 	// настройки cookie
	resave 	: false,
	saveUninitialized 	: true,
    store 	: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 		// использование connect-flash для сообщений в сессии
app.use(express.static(__dirname + '/public')); 	// подключение статичных файлов

app.set('port', process.env.PORT || config.get("port"));	// установка порта для сервера из config'a
app.set('view engine', 'ejs'); 						// установка ejs'a для шаблонизации
app.set('templates_dir', 'templates/template.ejs'); // путь к шаблонам

io.use(passportSocketIo.authorize({
  cookieParser 	: cookieParser, 		// переменная с модулем 'cookie-parser'
  key 			: 'connect.sid', 		// имя сессии
  secret 		: config.get('session:secret'), 	// ключ-секрет сессии
  store 		: sessionStore, 		// переменная для хранения сессии
  success 		: socket.AuthSuccess, 	// доп.параметр: callback-функция, которая выполнится, если авторизирован
  fail 			: socket.AuthFail, 		// доп.параметр: callback-функция, которая выполнится, если fail/error
}));
io.set('origins', config.get('io:domain') + config.get('io:port'));	// доступ к моему socket.io только с домена и порта из config'a

// подключение доп. модулей ===========================================
require('./app/routes.js')(app, passport, io);  // подключение роутинга и передача ему необходимых модулей
// ПОЗЖЕ УДАЛИТЬ, т.к.:
// подключение данных модулей перенесено в "routes.js"

// ========= ПРОБЛЕМА: ============
// СОБЫТИЕ "CONNECTION" - ПРОИСХОДИТ ОДНОВРЕМЕННО ИЗ ДВУХ МОДУЛЕЙ
require('./app/chat.js')(io);               // подключение модуля чата
require('./app/game_socket.js')(io);        // подключение модуля игры

// запуск сервера =====================================================
http.listen(app.get('port'));
console.log('Server START on ' + app.get("port") + ' port');