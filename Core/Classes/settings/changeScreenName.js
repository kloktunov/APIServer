var m = function (screen_name, __account, __db_client, __cb){
	
	var checker = {
		error: function (err){
			__cb(err);
		},

		checkName: function (){
			var screenNameRegex = /^[a-zA-Z0-9_]+$/;
			var blockRegex = /^id[0-9]+$/;
			var blockRegex2 = /^[0-9]+$/;
			var blocksArray = ['developers', 'developer', 'dev', 'support', 'vip', 'administrator', 'admin', 'kloktun', 'kloktunov', 'andrey', 'alexey', 'rubl', 'bubble', 'hub', 'vlad'];


			screen_name = screen_name.toLowerCase();

			//	1. Проверить screen_name на RegEx
			if(!screenNameRegex.test(screen_name)){
				// error в патерне логина
				checker.error(1);
				return;
			}

			if(blockRegex.test(screen_name)){
				checker.error(2);
				return;
			}

			if(blockRegex2.test(screen_name)){
				checker.error(2);
				return;
			}

			if(blocksArray.indexOf(screen_name) != -1){
				checker.error(2);
				return;
			}

			if(screen_name.length < 3){
				checker.error(2);
				return;				
			}


			checker.checkUniqueName();
		},

		checkUniqueName: function (){
			__db_client.query('SELECT COUNT(*) FROM profile WHERE screen_name = ?  AND id != ?', [screen_name, __account.id], function (err, rows, fields){

				if(err != null){
					checker.error(3);
					return;
				}

				if(rows[0]['COUNT(*)'] > 0){
					checker.error(4);
					return;
				}

				checker.setNewScreenName();
			});

		},

		setNewScreenName: function (){
			__db_client.query('UPDATE profile SET screen_name = ? WHERE id = ?', [screen_name, __account.id], function (err, rows, fields){

				if(err != null){
					checker.error(3);
					return;
				}

				checker.finish();
			});
		},

		finish: function (){
			__cb({
				screen_name: screen_name,
			});
		}
	}

	checker.checkName();
}


module.exports = m;