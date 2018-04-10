var m = function (sex, __account, __db_client, __cb){

	var checker = {
		error: function (err){
			__cb(err);
		},

		checkSex: function (){

			if(sex != 0 && sex != 1){
				checker.error(1);
				return;
			}	

			checker.setNewSex();

		},

		setNewSex: function (){

			__db_client.query('UPDATE profile SET sex = ? WHERE id = ?', [sex, __account.id], function (err, rows, fields){

				if(err != null){
					checker.error(2);
					return;
				}

				checker.finish();
			});

		},

		finish: function (){
			__cb({
				sex: parseInt(sex)
			});
		}

	}

	checker.checkSex();
}


module.exports = m;