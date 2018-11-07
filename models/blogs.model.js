const mongoose = require('mongoose');

const Schema = require('mongoose').Schema;
var bodySchema = new Schema({
    head:String,
    para:String,
    rating:{
        type:Number,
        min:0,
        max:5,
        "default":2
    }
})
var footerSchema = new Schema({
    likes:Number,
    comments:Number,
    createdOn:Date
})

var blogsSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        unique:true,
        "default":"Admin"
    },
    body:[bodySchema],
    footer: footerSchema,
    rating:[{
        name:String,
        stars:Number,
        comment:String
    }]
})

mongoose.model('Blog',blogsSchema);