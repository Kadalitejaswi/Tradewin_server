const CONFIG = require('../config/index')
// importing mongodb client;
const mongoClient = require('mongodb').MongoClient;
var connection;
function open(){
    mongoClient.connect(CONFIG.DBURL,{authSource:CONFIG.AUTHSOURCE,useNewUrlParser: true},(error,client)=>{
        if(error) console.error("MonogDB connection Failed", error);
        else {
            connection = client;
            console.log("Mongodb Connection successfull");
        }
    
    })
}

function getConnection(){

    return connection;
}

module.exports = {
    open:open,
    get:getConnection
}