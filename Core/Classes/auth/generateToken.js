var crypto = require('crypto');
var unixtime = require('unixtime');

var m = function (user_id, app_id, __db_client, __cb){

	/*
		1. Проверить существует ли приложение
		2. Проверить установленно ли приложение у пользователя
		   -- если нет - ошибка
		3. Сгенерировать токен
		4. Сделать запись в БД
	*/

	var checker = {

		error: function (err){
			__cb(err);
		},

		checkIdAuthorBan: function (){
			if(app_id == 1){

				checker.generateToken();
				return;
			}

			__db_client.query('SELECT COUNT(*) FROM apps WHERE id=? AND ban=0 AND disable=0', [app_id], function (err, rows, fields){

				if(err != null){
					checker.error(1);
					return;
				}

				if(rows[0]['COUNT(*)'] == 0){
					// нет доступа для редактирования					
					checker.error(2);
					return;
				}

				checker.isInstallApp();

			});

		},

		isInstallApp: function (){
			__db_client.query('SELECT COUNT(*) FROM apps_install WHERE app_id=? AND user_id=?', [app_id, user_id], function (err, rows, fields){

				if(err != null){
					switch(err.errno){
						default:
							checker.error(1);
						break;
					}
					return;
				}

				if(rows[0]['COUNT(*)'] == 0){
					checker.error(3);
					return;
				}

				checker.generateToken();
			});
		},

		generateToken: function (){
			var token = crypto.createHash('sha256').update(user_id + "_" + Math.random()).digest('hex');
			var date = unixtime();

			__db_client.query('INSERT INTO tokens (app_id, user_id, token, date) VALUES (?, ?, ?, ?)', [app_id, user_id, token, date], function (err, rows, fields){

				if(err != null){
					switch(err.errno){
						default:
							checker.error(1);
						break;
					}
					return;
				}

				var token_data = {
					id: user_id,
					app_id: app_id,
					access_token: token,
					date: date
				}

				checker.finish(token_data);

			});

		},

		finish: function (td){
			__cb(td);
		}
	}

	checker.checkIdAuthorBan();
}


module.exports = m;