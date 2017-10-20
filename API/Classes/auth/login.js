var mAPI = function (params, account, db_client, cb){
	
	var login = params.login;
	var password = params.password;
	var salt = params.salt;
	var app_id = params.app_id;

	global.APIServer.Core.classes.auth.login(login, password, salt, app_id, db_client, cb);

};

module.exports = mAPI;