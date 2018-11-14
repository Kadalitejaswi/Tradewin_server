const mongoose = require('mongoose');
var User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/index');

module.exports.registration = (req,res,next)=>{
    if(!req.body || !req.body.name || !req.body.email ||
         !req.body.password || !req.body.role){
            res.status(404).set('application/json')
            .json({
                errorState:"data not found",
                message:"Required Fields are Missing"
            })
    }
    else {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hashPwd = bcrypt.hashSync(req.body.password,salt);

        // var newUser = new User(req.body);
        var newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashPwd,
            role:req.body.role,
            phoneNumber:req.body.phoneNumber
        });

        newUser.save((err,user)=>{
            if(err) {
                res.status(500).set('application/json')
                .json({
                    error:err,
                    message:"Failed to register a user"
                })
            }
            else {
                var token = jwt.sign({_id:user._id},CONFIG.SECRETKEY,{expiresIn:"24h"})
                res.status(200).set('application/json')
                .json({
                    auth:true,
                    message:"User registration Successfull!",
                    token:token
                    // user:user
                });
            }
        })
    }
}

module.exports.login = (req,res,next)=>{
    if(!req.body || !req.body.email || !req.body.password) {
        res.status(404).set('application/json')
        .json({
            errorState:"Data not found",
            message:"Required fields are missing"
        })
    }
    else {
        User.findOne({email:req.body.email},(error,user)=>{
            if(error) {
                res.status(500).set('application/json')
                .json({
                    error:error,
                    message:"Failed to find a user"
                })
            }
            else if(!user) {
                res.status(404).set('application/json')
                .json({
                    error:error,
                    message:"User not found get Registered"
                })
            }
            else {
                var isPwd = bcrypt.compareSync(req.body.password,user.password);
                if(isPwd) {
                    var token = jwt.sign({_id:user._id},CONFIG.SECRETKEY,{expiresIn:"24h"})
                    res.status(200).set('application/json')
                    .json({
                        auth:true,
                        message:"Login Successfull",
                        token:token
                        // user:user
                    })
                }
                else {
                    res.status(500).set('application/json')
                    .json({
                        error:error,
                        message:"Enter correct password"
                    })
                }
            }
        })
    }
}

module.exports.tokenValidator = (req,res,next)=>{
    var token = req.headers['x-access-token']
    if(!token) {
        res.status(404).set('application/json')
        .json({
            auth:false,
            token:null,
            message:"Failed to authenticate, Token not Found"
        });
    }
    else {
        jwt.verify(token,CONFIG.SECRETKEY,(error,doc)=>{
            if(error) {
                res.status(401).set('application/json')
                .json({
                    error:error,
                    message:"Failed to authenticate, Unauthorized token"
                });
            }
            else {
                User.findById(doc._id).exec((error,user)=>{
                    if(error) {
                        res.status(500).set('application/json')
                        .json({
                            error:error,
                            message:"Failed to find a user via token"
                        })
                    }
                    else if(!user) {
                        res.status(404).set('application/json')
                        .json({
                            error:error,
                            message:"User not found via token id"
                        })
                    }
                    else {
                        // res.status(200).set('application/json')
                        // .json({
                        //     auth:true,
                        //     message:"valid token",
                        //     token:user
                        // })
                        // call function after token evaluation
                        next();
                    }
                })
                
            }
        })
    }
}