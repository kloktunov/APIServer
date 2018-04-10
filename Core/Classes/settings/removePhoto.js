var m = function (__account, __db_client, __cb){

	var checker = {
		error: function (err){
			__cb(err);
		},

		removePhoto: function (){

			__db_client.query('UPDATE profile SET pid = 0 WHERE id = ?', [__account.id], function (err, rows, fields){

				if(err != null){
					checker.error(2);
					return;
				}

				checker.finish();
			});

		},

		finish: function (){
			__cb({
				remove: 1
			});
		}

	}

	checker.removePhoto();
}


module.exports = m;