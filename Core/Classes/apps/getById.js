var m = function (id, __account, __db_client, __cb){

	/*
		1. Проверить наличие приложения
		2. Вывести данные в соотвествии с правами доступа
		   (если автор - вывести все, если нет - только имя и доступ)
	*/

	var checker = {

		error: function (err){
			__cb(err);
		},

		getData: function (){
			__db_client.query('SELECT * FROM apps WHERE id=? AND ban=0 AND disable=0', [id], function (err, rows, fields){

				if(err != null){
					checker.error(1);
					return;
				}

				if(rows.length == 0){
					// приложения не существует или было отключено				
					checker.error(2);
					return;
				}

				var app_data = {
					id: rows[0]['id'],
					name: rows[0]['name'],
					description: rows[0]['description'],
					access: rows[0]['access'].split(','),
				};

				if(rows[0]['author'] == __account.id){
					app_data['author'] = rows[0]['author'];
					app_data['redirect_uri'] = rows[0]['redirect_uri'];
					app_data['secret_key'] = rows[0]['secret_key'];
				}

				checker.finish(app_data);

			});
		},

		finish: function (data){
			__cb(data);
		}
	};

	checker.getData();

}


module.exports = m;