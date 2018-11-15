var path = require('path');

module.exports.rootRequest = function(req,res){
    console.log(req.url," ",req.method);
    res.status(200)
    .send("Server first requset on /")
}
module.exports.homeRequest = function(req,res){
    console.log(req.url," ",req.method);
    res.status(200)
    .sendFile(path.join(__dirname,'../views/index.html'))
};