var express = require('express');
var router = express.Router();
var Data = require('../database/entity/marker').Marker;
var User = require('../database/entity/user').User;
var debug = require('debug')('authtest:server');
var passport = require('../database/auth/passport.config').passport;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/username',(req,res,next)=>{
  res.send(req.user);
})

router.post('/add-data',(req,res,next)=>{
  var newData = new Data({
    longitude: req.body.text,
    latitude: req.body.name
  });

  newData.save().then((val)=>{
    debug(val);
  });

});



router.get('/get-data',(req,res,next) => {

    //check auth

    if (!req.isAuthenticated()){
      res.end();
    }

    var datas = Data.find().exec().then(val=>{
      res.send(val);
    });

});

module.exports = router;
