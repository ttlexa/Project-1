// app/routes.js

module.exports = function(app, passport, io) {

    // HOME  ===============================
    // =====================================
    app.get('/', function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'index',
            user : req.user }); // передача данных о пользователе на страницу
    });

    // LOGIN ===============================
    // =====================================
    // перенаправление авторизированных пользователей
    app.get('/login', isLoggedInAccess, function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'login',
            message: req.flash('loginMessage'),
            user : req.user });
    });

    // отправка POST-запроса для LOGIN
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // перенаправление при удачном завершении
        failureRedirect : '/login', // перенаправление при ошибке
        failureFlash : true // включение сообщений (flash)
    }));

    // SIGNUP ==============================
    // =====================================
    // перенаправление авторизированных пользователей
    app.get('/signup', isLoggedInAccess, function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'signup',
            message: req.flash('signupMessage'),
            user : req.user });
    });

    // отправка POST-запроса для SIGNUP
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // перенаправление при удачном завершении
        failureRedirect : '/signup', // перенаправление при ошибке
        failureFlash : true // включение сообщений (flash)
    }));

    // PROFILE =============================
    // =====================================
    // только для авторизированных пользователей
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render(app.get('templates_dir'), {
            page : 'profile',
            user : req.user });
    });

    // CHAT ================================
    // =====================================
    // только для авторизированных пользователей
    app.get('/chat', isLoggedIn, function(req, res){
        // require('./chat.js')(io); // подключение модуля чата
        res.render(app.get('templates_dir'), {
            page : 'chat',
            user : req.user });
    });

    // ROULETTE ============================
    // =====================================
    // только для авторизированных пользователей
    app.get('/roulette', isLoggedIn, function(req, res){
        // require('./game_socket.js')(io); // подключение модуля рулетки
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

    // 404 =================================
    // =====================================
    app.use(function(req, res){
        res.status(404);
        res.render(app.get('templates_dir'), {
            page : '404',
            user : req.user });
    });

    // 500 =================================
    // =====================================
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render(app.get('templates_dir'), {
            page : '500',
            user : req.user });
    });
};

// проверка - авторизирован ли пользователь
function isLoggedIn(req, res, next) {
    // если залогирован - все ОК - выполняется NEXT
    if (req.isAuthenticated())
        return next();
    // если нет - перенаправляется на главную страницу
    res.redirect('/login');
};

// проверка-2 - авторизирован ли пользователь
function isLoggedInAccess (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    }else return next();
};