var m = function (login, password, captcha_id, captcha_code, __account, __db_client, __cb){

	/*
		1. Проверить логин и вытащить запись из БД
		2. Проверить пароль
		3. Проверить требуется ли каптча
		4. Сгенерировать токен
		5. Вернуть запись
	*/

	var checker = {

		error: function (err){
			__cb(err);
		},

		checkLogin: function (){
			__db_client.query('SELECT * FROM accounts WHERE login=?', [login], function (err, rows, fields){

				if(err != null){
					switch(err.errno){
						default:
							checker.error(1);
						break;
					}
					return;
				}

				// ошибка в логине
				if(rows.length == 0){
					checker.error(2);
					return;
				}

				// аккаунт в бане
				if(rows[0].ban == 1){
					checker.error(3);
					return;
				}

				var login_data = {
					id: rows[0].id,
					login: rows[0].login,
					password: rows[0].password,
					salt: rows[0].salt
				}

				// если требуется проверка captcha
				if(rows[0].need_captcha == 1){
					checker.checkCaptcha(login_data);
					return;
				}

				checker.checkPassword(login_data);


			});
		},

		checkCaptcha: function (login_data){
			global.APIServer.Core.classes.captcha.checkCode(captcha_id, captcha_code, __db_client, function (res){

				// Ошибка captcha
				if(!res){
					checker.error(4);
					return;
				}

				login_data['set_captcha'] = 0;

				checker.checkPassword(login_data);

			});
		},


		checkPassword: function (login_data){
			var c_password_hash = global.APIServer.Core.classes.account.hashPassword(password, login_data.salt);

			// ошибка в пароле
			if(c_password_hash != login_data.password){
				checker.error(5);
				return;
			}

			if(login_data.set_captcha == 0){
				checker.setCaptchaNull(login_data);
				return;
			}

			checker.generateToken(login_data);
		},

		setCaptchaNull: function (login_data){
			__db_client.query('UPDATE accounts SET need_captcha = 0 WHERE login=? ', [login], function (err, rows, fields){

				if(err != null){
					switch(err.errno){
						default:
							checker.error(1);
						break;
					}
					return;
				}

				checker.generateToken(login_data);
			});
		},

		generateToken: function (login_data){
			global.APIServer.Core.classes.auth.generateToken(login_data.id, 1, __db_client, function (td){

				// ошибка при генерации токена
				if(!isNaN(parseInt(td))){
					checker.error(6);
					return;
				}

				checker.finish(td);

			});
		},

		finish: function (token_data){
			__cb(token_data);
		}

	}
	

	checker.checkLogin();
}


module.exports = m;