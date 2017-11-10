/*
		1. Проверить наличие приложения
		2. Проверить установленно ли приложение
		3. Сделать запись в БД
	*/

	var checker = {

		error: function (err){
			__cb(err);
			return;
		},

		checkApp: function (){

			__db_client.query('SELECT COUNT(*) FROM apps WHERE id=? AND ban=0 AND disable=0', [id], function (err, rows, fields){

				if(err != null){
					checker.error(1);
					return;
				}

				// приложение с таким id не найдено
				if(rows[0]['COUNT(*)'] == 0){
					checker.error(2);
					return;
				}

				checker.installApp();

			});

		},

		isInstallApp: function (){
			__db_client.query('SELECT COUNT(*) FROM apps_install WHERE app_id=? AND user_id=?', [id, __account.id], function (err, rows, fields){

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

				checker.removeApp();
			});
		},


		removeApp: function (){
			__db_client.query('DELETE FROM apps_install WHERE app_id=? AND user_id=?', [id, __account.id], function (err, rows, fields){

				if(err != null){
					switch(err.errno){
						
						default:
							checker.error(1);
						break;
					}
					return;
				}

				checker.finish();
			});
		},

		finish: function (){
			__cb({
				remove: 1
			})
		}

	}

	checker.checkApp();

module.exports = m;