// config/passport.js

// подключение необходимого модуля passport
var LocalStrategy   = require('passport-local').Strategy;
// подключение модели пользователя
var User            = require('../app/models/user');

// экспорт passport'a
module.exports = function(passport) {

    // passport установка сессии ===============================================
    // =========================================================================

    // serialize пользователя для сессии
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize пользователя для сессии
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // использование LocalStrategy для регистрации

    passport.use('local-signup', new LocalStrategy({
        // обычно используется логин а не email, тут изменено
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // позволяет передать обратно запрос Callback
    },
    function(req, email, password, done) {
        // ассинхронность
        // User.findOne не сработает пока данные не прийдут обратно
        process.nextTick(function() {
            // проверка на существование такого email
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // обработчик ошибки
                if (err)
                    return done(err);
                // если такой email уже занят - вывод сообщения (flash)
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    // если email свободен - создание нового пользователя
                    var newUser            = new User();
                    // запись данных о пользователе
                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.roulette.money = 1000;

                    // сохранение пользователя в БД
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));

    // LOCAL LOGIN =============================================================
    // =========================================================================
    // использование LocalStrategy для логина

    passport.use('local-login', new LocalStrategy({
        // обычно используется логин а не email, тут изменено
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // позволяет передать обратно запрос Callback
    },
    function(req, email, password, done) { // получение почты и пароля из формы
        // проверка на существование такого email
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // обработчик ошибки
            if (err)
                return done(err);
            // если такого email нет в БД - вывод сообщения (flash)
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            // если пользователь существует, но не верный пароль - вывод сообщения
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            // если все ОК
            return done(null, user);
        });
    }));

};