var m = function (offset, count, __account, __db_client, __cb){

	var checker = {
		error: function(err){
			__cb(err);
			return;
		},

		sqlGet: function (){

			__db_client.query('SELECT id, name, description, access  FROM apps WHERE id IN (SELECT app_id FROM apps_install WHERE user_id=?) AND ban = 0 AND disable = 0 LIMIT ?, ?', [__account.id, offset, count], function (err, rows, fields){

				if(err != null){
					checker.error(1);
					return;
				}

				for(var i = 0, length = rows.length; i < length; i++){

					rows[i].access = rows[i].access.split(',');

				}

				checker.finish(rows);

			});
		},

		finish: function(data){
			__cb({ apps: data });
		}
	}


	checker.sqlGet();
}


module.exports = m;