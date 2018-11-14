const CONFIG = require('../config/index')
const mongoose = require('mongoose');
// require mongoose model --&-- register Model
require('./products.model');
require('./users.model');

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

function graceFullShutdown(signal,callback){
    mongoose.connection.close(()=>{
        console.log(`Mongoose connection is disconnected
            by App Termination Signal :: ${signal}`);
        callback();
    });
}
process.on('SIGINT',()=>{
    graceFullShutdown('SIGINT',()=>{
        process.exit(0)
    })
})

process.on('SIGTERM',()=>{
    graceFullShutdown('SIGTERM',()=>{
        process.exit(0)
    })
})

process.once('SIGUSR2',()=>{
    graceFullShutdown('SIGUSR2',()=>{
    process.kill(process.pid,'SIGUSR2');

    })
})