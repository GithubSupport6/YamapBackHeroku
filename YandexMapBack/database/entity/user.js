var mongoose = require('../database').mongoose;
var crypto = require('crypto-js');

const User = mongoose.model('User',{
    username:String,
    password:String,
});

User.validPassword = function(user,password){
    return user.password == crypto.SHA256(password);
}

module.exports.User = User;