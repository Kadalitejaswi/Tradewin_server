const Schema = require('mongoose').Schema;

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
    body:[{
        head:String,
        para:String,
        rating:{
            type:Number,
            min:0,
            max:5,
            "default":2
        }
    }],
    footer:{
        likes:Number,
        comments:Number,
        createdOn:Date
    },
    rating:[{
        name:String,
        stars:Number,
        comment:String
    }]
})