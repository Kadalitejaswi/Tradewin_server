const mongoose = require('mongoose');

var user = mongoose.model('User');

module.exports.getAllUsers = (req,res,next)=>{
    console.log(req.url);
    console.log(req.query);
    
    var offset = 0;
    var count = 1;

    if(req.query && req.query.offset) {
        offset = Number(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = Number(req.query.count);
    }
    user.find().skip(offset).limit(count).exec((error,response)=>{
        if(error) {
            res.status(500).set('application/json')
            .json({
                error:error,
                message:"Users not found"
            })
        }
        else {
            res.status(200).set('application/json')
            .json({response})
        }
    })
}

module.exports.getOneUser = (req,res,next)=>{

    var userId = req.params.userId;
    if(req.params.userId) {
        user.findById(userId).exec((err,response)=>{
            if(err) {
                res.status(500).set('application/json')
                .json({
                    error:error,
                    message:"Internal error"
                })
            }
            else {
                res.status(200).set('application/json')
                .json(response)
            }
        })
    }
    else {
        res.status(404).set('application/json')
        .json({
            error:error,
            message:"Id Not Found"
        })
    }
}

module.exports.deleteOneUser = (req,res,next)=>{
    var userId = req.params.userId;
    if(req.params.userId) {
        user.findByIdAndDelete(userId).exec((error,response)=>{
            if(error) {
                res.status(500).set('application/json')
                .json({
                    error:error,
                    message:"Internal error"
                })
            }
            else {
                res.status(200).set('application/json')
                .json(response)
            }
        })
    }
    else {
        res.status(404).set('application/json')
        .json({
            error:error,
            message:"Id Not Found"
        })
    }
}

module.exports.addOneUser = (req,res,next)=>{
    if(req.body) {
        user.create(req.body,(error,response)=>{
            if(error) {
                res.status(500).set('application/json')
                .json({
                    error:error,
                    message:"Internal error"
                })
            }
            else {
                res.status(200).set('application/json')
                .json(response)
            }
        })
    }
    else {
        res.status(404).set('application/json')
        .json({
            error:error,
            message:"Id Not Found"
        })
    }  
}