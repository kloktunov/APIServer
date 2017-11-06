var m = function (login, password, first_name, last_name, captcha_id, captcha_code, __account, __db_client, __cb){

	/*
		1. Проверить login на RegEx
		2. password в schema
		3. Проверить first_name
		4. Проверить last_name
		5. Проверить captcha_id и captcha_code checkCode()
		6. Сделать запись в БД
	*/

	var loginRegex = /^[a-zA-Z0-9]+$/;
	var nameRegex = /^[a-zA-Zа-яА-Я]+$/

	//	1. Проверить login на RegEx
	if(!loginRegex.test(login)){
		// error в патерне логина
		__cb(1);
	}

	login = login.toLowerCase();

	//	3. Проверить first_name
	//	4. Проверить last_name
	if(!nameRegex.test(first_name) || !nameRegex.test(last_name)){
		// error в патерне имени
		__cb(2);
	}


	var checker = {

		error: function (err){
			__cb(err);
		},

		checkCaptcha: function (){
			global.APIServer.Core.classes.captcha.checkCode(captcha_id, captcha_code, __db_client, function (res){

				// Ошибка captcha
				if(!res){
					checker.error(3);
					return;
				}

				checker.createAccountSQL();

			});
		},

		createAccountSQL: function (){

			var salt = global.APIServer.Core.classes.account.generateSalt();
			var password_hash = global.APIServer.Core.classes.account.hashPassword(password, salt);

			__db_client.query('INSERT INTO accounts (login, password, salt) VALUES (?, ?, ?)', [login, password_hash, salt], function (err, rows, fields){
				if(err != null){
					switch(err.errno){
						case 1062:
							checker.error(5); // такой логин уже занят
						break;
						default:
							checker.error(4); // error DB
						break;
					}
					return;
				}

				var id = rows.insertId;

				checker.createProfileSQL(id);
			});
		},

		createProfileSQL: function (id){

			__db_client.query('INSERT INTO profile (id, screen_name, first_name, last_name) VALUES (?, ?, ?, ?)', [id, 'id' + id, first_name, last_name], function (err, rows, fields){
				if(err != null){
					console.log(err);
					checker.error(4); // error DB
					return;
				}

				checker.generateToken(id);
			});

		},

		generateToken: function (id){
			checker.finish(id, "123");
		},

		finish: function (id, token){

			__cb({
				id: 1,
				token: 123
			});

		}


	};

	checker.checkCaptcha();

	

}


module.exports = m;