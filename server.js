// server.js

// установка ===================================================================
// подключение необходимых модулей
var express 	= require('express');
var app 		= express();
var mongoose 	= require('mongoose');
var passport 	= require('passport');
var flash 		= require('connect-flash');
var morgan 		= require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser 	= require('body-parser');
var session 	= require('express-session');
var server 		= require('http').Server(app);
var io 			= require('socket.io')(server);
var config 		= require('./config');

// конфигурация ===============================================================
mongoose.connect(config.get("db:connection") + config.get("db:name")); // подключение к БД по пути из config'a

require('./config/passport')(passport); // передача passport'a дял конфигурации

// настройка express'a и др. модулей
app.use(morgan('dev'));		// логирование запросов в консоль
app.use(cookieParser());	// чтение cookies (необходимо для auth)
app.use(bodyParser());		// получение информации из html'a
app.use(express.static(__dirname + '/public'));				// подключение статичных файлов
app.set('port', process.env.PORT || config.get("port"));	// установка порта для сервера из config'a
app.set('view engine', 'ejs'); 						// установка ejs'a для шаблонизации
app.set('templates_dir', 'templates/template.ejs'); // путь к шаблонам

// необходимо для passport'a
app.use(session({ secret: 'roulettejslexa' })); // секрет-ключ сессии
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // использование connect-flash для сообщений в сессии

// роутинг =====================================================================
require('./app/routes.js')(app, passport); // подключение роутинга и передача ему необходимых модулей

// запуск сервера ==============================================================
server.listen(app.get('port'));
console.log('Server START on ' + app.get("port") + ' port');

// TEST - socket.io
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});