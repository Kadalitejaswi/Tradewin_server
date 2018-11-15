var host = "127.0.0.1"; 
var port = 3030;

const dbUrl = 'mongodb://127.0.0.1:27017/tradewin';

const authSource = 'admin';
const dbUser = 'tejaswikadali';
const dbPass = 'kadali';
const secretekey = "ThisisTejaswikadali"

module.exports = {
    HOST:host,
    PORT:port,
    DBURL:dbUrl,
    AUTHSOURCE:authSource,
    DBUSER:dbUser,
    dbPass:dbPass,
    SECRETKEY:secretekey
}