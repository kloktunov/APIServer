var crypto = require('crypto');
var unixtime = require('unixtime');

var m = function (name, access, description, __account, __db_client, __cb){

	// 1. Разбить access на массив 
	// 2. Проверить валидность массива
	// 3. Создать приложение sql


	var checker = {

		error: function (err){
			__cb(err);
		},

		checkAccessParam: function (){

			checker.createApp(global.APIServer.Core.classes.apps.checkAccessList(access));

		},

		createApp: function (valid_access){

			var secret_key = crypto.createHash('md5').update(Math.random() + "").digest('hex');
			if(description == undefined) description = "";
			description = description.trim();

			__db_client.query('INSERT INTO apps (name, author, access, description, secret_key, date) VALUES (?, ?, ?, ?, ?, ?)', [name, __account.id, valid_access.join(','), description, secret_key, unixtime()], function (err, rows, fields){
				if(err != null){
					console.log(err);
					checker.error(2);
					return;
				}

				__cb({
					id: rows.insertId,
					name: name,
					access: valid_access,
					author: __account.id,
					secret_key: secret_key,
				});
			});

		}

	};


	checker.checkAccessParam();
}


module.exports = m;