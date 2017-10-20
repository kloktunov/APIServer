var crypto = require('crypto');



var m = function (login, hash, salt, app_id, db_client, cb){

	if(app_id == null){
		app_id = 1;
	}

	/*
		1. Получить данные по логину
		2. Проверить хэш пароля sha512(sha512(login + "_" + password) + salt) == hash
	*/

	var checker = {

		start: function (){

		},

		getDataByLogin: function (){

			db_client.query('SELECT * FROM accounts WHERE login=?', login, function (err, rows, fields) {
				if(err || rows.length == 0){
					// Неверный логин
					cb(1);
					return;
				}

				checker.generateHash(rows[0]);							
			});

		},

		isAppInstall: function (){
			if(app_id == 1){
				checker.getDataByLogin();
				return;
			}
		},

		generateHash: function (account){


			// sha512(sha512(login + "_" + password) + "_" + salt) 
			var hashPassword = account.password;

			var checkHash = crypto.createHash('sha512').update(hashPassword + "_" + salt).digest("hex");

			if(hash != checkHash){
				// Ошибка в логине или пароле
				cb(1);
				return;
			}

		},

		generateToken: function (id, app_id){
			// 1. Проверить установленно ли приложение
			// 2. Берем данные приложения
			// 3. Генерируем token и делаем запись
		},




	}

						

	var update_key = crypto.createHash('sha512').update(""+date + Math.random()).digest("hex");

	// response
	cb({

		app_id: 1

	});
};


module.exports = m;