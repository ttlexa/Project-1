// app/socket.js

// функции для работы с "passport.socketio"
// определение что делать с Auth & NO_Auth пользователями
exports.AuthSuccess = function (data, accept){
  console.log('successful connection to socket.io');
  accept(); 	// запуск функции дает доступ к socket.io ('connection')
};

exports.AuthFail = function (data, message, error, accept){
  if(error)
    throw new Error(message);
  console.log('failed connection to socket.io:', message);
	// this error will be sent to the user as a special error-package
	// see: http://socket.io/docs/client-api/#socket > error-object
  if(error)
    accept(new Error(message)); 	// запуск функции НЕ дает доступ к socket.io ('connection')
};