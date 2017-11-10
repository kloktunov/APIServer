var m = function (id, __account, __db_client, __cb){

	/*
		1. Проверить наличие приложения
		2. Дернусь запись из БД
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

				checker.isInstallApp();

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
					checker.finish(0);
					return;
				}

				checker.finish(1);
			});
		},

		finish: function (status){
			__cb({
				install: status
			})
		}
	}

	checker.checkApp();
}



module.exports = m;