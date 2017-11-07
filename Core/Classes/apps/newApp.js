var crypto = require('crypto');
var unixtime = require('unixtime');

var m = function (name, access, __account, __db_client, __cb){

	// 1. Разбить access на массив 
	// 2. Проверить валидность массива
	// 3. Создать приложение sql


	var checker = {

		error: function (err){
			__cb(err);
		}

		splitAccessParam: function (){

			var split_access = access.split(',');

			checker.checkValidAccess(split_access);
		},

		checkValidAccess: function (split_access){

			var valid_access = [];

			for(var i = 0, length = split_access.lenght; i < lenght; i++){

				var current_class = split_access[i].trim();
				if(global.APIServer.API.classes[current_class] == undefined) continue;

				valid_access.push(current_class);

			}

			checker.createApp(valid_access);

		},

		createApp: function (valid_access){

			var secret_key = crypto.createHash('md5').update(Math.random()).digest('hex');

			__db_client.query('INSERT INTO apps (name, author, secret_key, date) VALUES (?, ?, ?, ?)', [name, __account.id, secret_key, unixtime()], function (err, rows, fields){
				if(err != null){
					checker.error(2);
					return;
				}

				__cb({
					id: rows.insertId;
					name: name,
					access: [],
					author: __account.id,
					secret_key: secret_key,
				});
			});

		}

	};


	checker.splitAccessParam();
}


module.exports = m;