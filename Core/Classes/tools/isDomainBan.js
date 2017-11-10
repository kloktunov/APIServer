var url = require('url');

var m = function (link, __db_client, __cb){

	var domain = url.parse(link).hostname;

	var domainRegex = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

	if(!domainRegex.test(domain)){
		// not domain
		__cb(1);
		return;
	}

	__db_client.query('SELECT COUNT(*) FROM blacklistdomain WHERE domain=?', [domain], function (err, rows, fields){

		console.log(rows);

		if(err != null){
			__cb(2);
			return;
		}

		if(rows['COUNT(*)'] > 0){
			__cb({
				is_ban: true
			});
			return;
		}

		__cb({
			is_ban: false
		});


	});
};

module.exports = m;