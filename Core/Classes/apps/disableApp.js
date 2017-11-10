var m = function (id, __account, __db_client, __cb){
	/*
		1. Проверить наличие приложения
		2. Сделать запись в БД
	*/

	var checker = {

		error: function (err){
			__cb(err);
			return;
		},

		checkApp: function (){

			__db_client.query('SELECT COUNT(*) FROM apps WHERE id=? AND author=? AND ban=0 AND disable=0', [id, __account.id], function (err, rows, fields){

				if(err != null){
					checker.error(1);
					return;
				}

				// приложение с таким id не найдено
				if(rows[0]['COUNT(*)'] == 0){
					checker.error(2);
					return;
				}

				checker.disableApp();

			});

		},

		disableApp: function (){
			__db_client.query('UPDATE apps SET disable=1 WHERE id=?', [id], function (err, rows, fields){

				if(err != null){
					switch(err.errno){
						case 1062:
							// приложение уже установленно
							checker.error(3);

						break;
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
				disable: 1
			})
		}

	}

	checker.checkApp();
}


module.exports = m;