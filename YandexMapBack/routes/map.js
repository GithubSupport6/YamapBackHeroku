var express = require('express');
var router = express.Router();
var mark = require('../database/entity/marker').Marker;

router.get('/',(req,res,next)=>{

    if (!req.isAuthenticated()){
        res.status(401).send("Not authentificated")
        res.end()
        return
    };
})

router.get('/get-marks',(req,res,next)=>{

    if (!req.isAuthenticated()){
        res.status(401).send("Not authentificated")
        res.end()
        return
    };

    mark.find({ user:req.user.username}).exec().then((val)=>{
        res.send({marks:val.map((item)=>{
                return {
                    name:item.name,
                    longitude: item.longitude,
                    latitude: item.latitude
                }
            }      
        )});
        res.end()
    })

});

router.post('/add-mark',(req,res,next)=>{

    if (!req.isAuthenticated()){
        res.status(401).send("Not authentificated")
        res.end()
        return
    };

    var newMarker = new mark({
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        name: req.body.name,
        user: req.user.username
    });

    newMarker.save().then(()=>{
        res.end();
    });

});

router.post('/edit-mark',(req,res,next)=>{

    if (!req.isAuthenticated()){
        res.status(401).send("Not authentificated")
        res.end()
        return
    };

    let query = {"user":req.user.username, "name": req.body.oldName};
    mark.findOneAndUpdate(query,req.body.newMark,(err,doc)=>{
        return res.end();
    });

});

router.post('/delete-mark',(req,res,next)=>{

    if (!req.isAuthenticated()){
        res.status(401).send("Not authentificated")
        res.end()
        return
    };

    mark.deleteOne({user:req.user.username, name: req.body.name}).exec().then((val)=>{
        console.log("Deleted mark " + req.body.name);
        console.log(val);
        res.end();
    }).catch((err)=>{
        console.log(err);
        res.end();
    });

    
});

module.exports = router;