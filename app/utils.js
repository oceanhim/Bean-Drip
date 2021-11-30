const env = require('dotenv');

env.config();

module.exports.DBConnectionString = function() {
    return process.env.DBConnectionString
};

module.exports.clientToken = function() {
    // console.log(process.env.clientToken);
    return process.env.clientToken
}