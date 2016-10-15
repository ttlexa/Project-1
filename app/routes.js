// app/routes.js

module.exports = function(app, passport, express) {

    app.use(express.static(__dirname + '/public')); // подключение статики

    // HOME  ===============================
    // =====================================
    app.get('/', function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'index',
            user : req.user });
    });

    // LOGIN ===============================
    // =====================================
    app.get('/login', isLoggedInAccess, function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'login',
            message: req.flash('loginMessage'),
            user : req.user });
    });

    // отправка запроса для логина
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // перенаправление при удачном завершении
        failureRedirect : '/login', // перенаправление при ошибке
        failureFlash : true // включение сообщений (flash)
    }));

    // SIGNUP ==============================
    // =====================================
    app.get('/signup', isLoggedInAccess, function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'signup',
            message: req.flash('signupMessage'),
            user : req.user });
    });

    // отправка запроса для регистрации
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // перенаправление при удачном завершении
        failureRedirect : '/signup', // перенаправление при ошибке
        failureFlash : true // включение сообщений (flash)
    }));

    // PROFILE =============================
    // =====================================
    // только для залогированных пользователей
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'profile',
            user : req.user // передача данных для шаблона страницы пользователя
        });
    });

    app.get('/chat', function(req, res){
        res.render(app.get('templates_dir'), {
            page : 'chat',
            user : req.user });
    });

    app.get('/roulette', function(req, res){
        res.render(app.get('templates_dir'), {
            page : 'roulette',
            user : req.user });
    });

    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use(function(req, res){
        res.status(404);
        res.render(app.get('templates_dir'), {
            page : '404',
            user : req.user });
    });

    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render(app.get('templates_dir'), {
            page : '500',
            user : req.user });
    });
};

// проверка - залогирован ли пользователь
function isLoggedIn(req, res, next) {
    // если залогирован - все ОК - выполняется NEXT
    if (req.isAuthenticated())
        return next();
    // если нет - перенаправляется на главную страницу
    res.redirect('/login');
};

function isLoggedInAccess (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    } return next();
};