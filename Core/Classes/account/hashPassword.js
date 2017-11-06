var crypto = require('crypto');

var m = function (password, salt){

	return crypto.createHash('sha256').update(password + "_" + salt).digest('hex');
}


module.exports = m;