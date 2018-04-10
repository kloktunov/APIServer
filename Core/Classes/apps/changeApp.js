var m = function (id, name, access, description, redirect_uri, __account, __db_client, __cb){

	/*
		1. Проверить ID + author + ban
		2. Проверить access
		3. Проверить redirect_uri
		4. Обновить данные
	*/

	var checker = {

		error: function (err){
			__cb(err);
		},

		checkIdAuthorBan: function (){

			__db_client.query('SELECT COUNT(*) FROM apps WHERE id=? AND author=? AND ban=0 AND disable=0', [id, __account.id], function (err, rows, fields){

				if(err != null){
					checker.error(1);
					return;
				}

				if(rows[0]['COUNT(*)'] == 0){
					// нет доступа для редактирования					
					checker.error(2);
					return;
				}

				checker.checkRedirectUri();

			});

		},

		checkRedirectUri: function (){

			// не URL
			if(!global.APIServer.Core.classes.tools.isURL(redirect_uri)){
				checker.error(3);
				return;
			} 

			checker.checkDomainBan(redirect_uri, __db_client, function (res){
				if(res.is_ban){
					// домен в бане
					checker.error(5);
					return;
				}

				checker.checkAccessParam();
			});

		},

		checkDomainBan: global.APIServer.Core.classes.tools.isDomainBan,

		checkAccessParam: function (){

			checker.sqlRequest(global.APIServer.Core.classes.apps.checkAccessList(access));

		},

		sqlRequest: function (valid_access){
	
			if(description == undefined) description = "";
			description = description.trim();


			__db_client.query('UPDATE apps SET name=?, access=?, description=?, redirect_uri=?  WHERE id=?', [name, valid_access.join(','), description, redirect_uri, id], function (err, rows, fields){

				if(err != null){
					checker.error(6);
					return;
				}

				checker.finish();

			});

		},

		finish: function (){
			__cb({
				changed: 1
			});
		}

	}

	checker.checkIdAuthorBan();
}


module.exports = m;