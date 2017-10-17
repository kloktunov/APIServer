var mAPI = function (params, db_client, cb){
	
	function callback (data){

		var api_response = data;

		cb(global.APIServer.API.renderResponse(0, "auth", "login", api_response));

	}


	var login = params.login;
	var password = params.password;
	var salt = params.salt;
	var app_id = params.app_id;

	global.APIServer.Core.classes.auth.login(login, password, salt, app_id, db_client, callback);

};

module.exports = mAPI;