var m = function (first_name, last_name, __account, __db_client, __cb){

	var checker = {
		error: function (err){
			__cb(err);
		},

		checkName: function (){
			var nameRegex = /^[a-zA-Zа-яА-Я]+$/

			//	1. Проверить first_name
			//	2. Проверить last_name
			if(!nameRegex.test(first_name) || !nameRegex.test(last_name)){
				// error в патерне имени
				checker.error(2);
				return;
			}

			checker.setNewName();
		},

		setNewName: function (){
			__db_client.query('UPDATE profile SET first_name = ?, last_name = ? WHERE id = ?', [first_name, last_name, __account.id], function (err, rows, fields){

				if(err != null){
					checker.error(2);
					return;
				}

				checker.finish();
			});
		},

		finish: function (){
			__cb({
				first_name: first_name,
				last_name: last_name
			});
		}
	}

	checker.checkName();
}


module.exports = m;