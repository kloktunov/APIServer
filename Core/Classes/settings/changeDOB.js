var m = function (dob, __account, __db_client, __cb){

	dob = dob + "";
	
	var year = parseInt(dob[0] + dob[1] + dob[2] + dob[3]);
	var month = parseInt(dob[4] + dob[5]);
	var day = parseInt(dob[6] + dob[7]);

	var current_date = new Date();


	var checker = {
		error: function (err){
			__cb(err);
		},

		checkDate: function (){
			// Проверяем интервалы

			if(year > (current_date.getYear() + 1900) || year < 1900){
				checker.error(2);
				return;
			}

			if(month > 12 || month < 1){
				checker.error(2);
				return;
			}

			if(day > 31 || day < 1){
				checker.error(2);
				return;
			}


			// Если дата рождения больше текщей
			var dobDate = new Date(year, month - 1, day);
			if(dob > current_date){
				checker.error(2);
				return;				
			}

			checker.setNewDOB();

		},

		setNewDOB: function (){

			__db_client.query('UPDATE profile SET dob = ? WHERE id = ?', [dob, __account.id], function (err, rows, fields){

				if(err != null){
					checker.error(2);
					return;
				}

				checker.finish();
			});

		},

		finish: function (){
			__cb({
				dob: parseInt(dob)
			});
		}

	}

	checker.checkDate();

}


module.exports = m;