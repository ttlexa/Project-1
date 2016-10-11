// app/routes.js

module.exports = function(app, passport, express) {

    app.use(express.static(__dirname + '/public')); // подключение статики

    // HOME  ===============================
    // =====================================
    app.get('/', function(req, res) {
        res.render(app.get('templates_dir'), {page: 'index'});
    });

    // LOGIN ===============================
    // =====================================
    app.get('/login', function(req, res) {
        res.render(app.get('templates_dir'), {page: 'login', message: req.flash('loginMessage') });
    });

    // отправка запроса для логина
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // перенаправление при удачном завершении
        failureRedirect : '/login', // перенаправление при ошибке
        failureFlash : true // включение сообщений (flash)
    }));

    // SIGNUP ==============================
    // =====================================
    app.get('/signup', function(req, res) {
        res.render(app.get('templates_dir'), {page: 'signup', message: req.flash('signupMessage') });
    });

    // отправка запроса для регистрации
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // перенаправление при удачном завершении
        failureRedirect : '/signup', // перенаправление при ошибке
        failureFlash : true // включение сообщений (flash)
    }));

    // PROFILE SECTION =====================
    // =====================================
    // только для залогированных пользователей
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'profile',
            user : req.user // передача данных для шаблона страницы пользователя
        });
    });

    app.get('/chat', isLoggedIn, function(req, res){
        res.render(app.get('templates_dir'), {page: 'chat'});
    });

    app.get('/roulette', function(req, res){
        res.render(app.get('templates_dir'), {page: 'roulette'});
    });

    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use(function(req, res){
        res.status(404);
        res.render(app.get('templates_dir'), {page: '404'});
    });

    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render(app.get('templates_dir'), {page: '500'});
    });
};

// проверка - залогирован ли пользователь
function isLoggedIn(req, res, next) {
    // если залогирован - все ОК - выполняется NEXT
    if (req.isAuthenticated())
        return next();
    // если нет - перенаправляется на главную страницу
    res.redirect('/');
}