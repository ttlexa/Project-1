// app/models/user.js
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// создаем схему для модели пользователя ===============================
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    }
    // ,
    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // },
    // twitter          : {
    //     id           : String,
    //     token        : String,
    //     displayName  : String,
    //     username     : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // }

});

// создаем методы для модели пользователя ==============================
// генерация hash для пароля пользователя
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// проверка на соответствие пароля
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// создание модели пользователя и её экспорт как "User"
module.exports = mongoose.model('User', userSchema);