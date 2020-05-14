var mongoose = require('mongoose');

//heroku
//mongodb://me:password1@ds263295.mlab.com:63295/heroku_5v8fwwk6

//local
//mongodb://localhost:27017/yamap

mongoose.connect('mongodb://me:password1@ds263295.mlab.com:63295/heroku_5v8fwwk6', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});


module.exports.mongoose = mongoose;