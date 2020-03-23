var express = require('express');
var router = express.Router();
var passport = require('../database/auth/passport.config').passport;
var crypto = require('crypto-js');
var User = require('../database/entity/user').User;
  
router.post('/register',(req,res,next)=>{
    var newUser = new User({
      username:req.body.params.username,
      password: crypto.SHA256(req.body.params.password)
    });

    newUser.save().then((val)=>{
      passport.authenticate('local',function(err, user, info){
        req.logIn(user);
        res.end();
      })
    });
});

router.post('/login', (req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{

    if (err) {
      if(info){
        res.set('info',info);
      }
      return next(err);
    }
 
   if (!user)
   { 
      res.send({
        status: 'Incorrect login or password'
      });
      
      return res.end();
   }
 

   req.logIn(user, function(err) {
    if (err) { 
       return next(err);
    }
    return res.end();
   });



    })(req,res,next);
  }   
);
  
router.get('/user',(req,res,next)=>{

  var test = req.user;

  res.send({
    isAuthenticated:req.isAuthenticated()
  });

  res.end();
})

router.get('/logout',(req,res,next)=>{
    req.logOut();
    res.end();
});

module.exports = router;