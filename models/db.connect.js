const CONFIG = require('../config/index')
const mongoose = require('mongoose');

var options = {
    user : CONFIG.DBUSER,
    pass:CONFIG.dbPass,
    authSource:CONFIG.AUTHSOURCE,
    useNewUrlParser: true
}

mongoose.connect(CONFIG.DBURL,options);
var db = mongoose.connection;
db.on('error',(err)=>{
    console.log("DB Connection Failed via Mongoose");
    console.log(err);
    
})
db.once('open',()=>{
    console.log("DB Connection Successfull via Mongoose");
      
})