// public/js/chat.js
"use strict"

$(document).ready(function(){
	;(function(){

		var socket = io('/chat');	// подключение socket.io (Namespaces = '/chat')

		// сохр. в переменнные выборки jQuery
		var $window 	= $(window);
		var $chatForm 	= $('#chatForm');
		var $chatOutput = $('#chatOutput');
		var $chatInput 	= $('#chatInput');

		// // ПРИ НАЖАТИИ ЛЮБОЙ КЛАВИШИ: ФОКУС В ПОЛЕ ВВОДА СООБЩЕНИЯ
		$window.keydown(function (event) {
			if (!(event.ctrlKey || event.metaKey || event.altKey)) {
				$chatInput.focus();
			};
		});

		$chatForm.on('submit', function(){
			var text = $chatInput.val();	// сохранение текста из поля input
			$chatInput.val('');				// очистка ранее сохраненного текста

			// // формирование события 'message'
			// // Вывод своего же сообщения через callback функцию на клиенте
			// // означает, что сервер получил событие
			socket.emit('message', text, function(nick){
				$chatOutput.append('<p><strong><a href="#">' + nick + ': </a></strong>' + text + '</p>');
				// // плавная прокрутка вниз страницы - можно добавить отдельную кнопку / флаг
				// // для включения / отключения данной функции
				$('body').animate({scrollTop:$(document).height()}, 2000);
			});
			return false;	// отключение стандарт. submit
		});

		// при получении события 'message' от сервера - вывод сообщений в чат
		socket.on('message', function(nick, text){
			$chatOutput.append('<p><strong><a href="#">' + nick + ': </a></strong>' + text + '</p>');
			// // плавная прокрутка вниз страницы - можно добавить отдельную кнопку / флаг
			// // для включения / отключения данной функции
			$('body').animate({scrollTop:$(document).height()}, 2000);
		});

	}) ();// END of ;(function(){

}); // END of $(document).ready(function(){