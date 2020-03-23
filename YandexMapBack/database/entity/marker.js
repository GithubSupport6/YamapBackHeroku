var mongoose = require('../database').mongoose;

const Marker = mongoose.model('Marker',{
    longitude:String,
    latitude:String,
    name:String,
    user:String
});

module.exports.Marker = Marker;