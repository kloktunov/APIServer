var mAPI = function (params, account, db_client, cb){
	var callback = function (data){

		var api_response = data;

		cb(global.APIServer.API.renderResponse(0, "accounts", "get", api_response));

	};

	global.APIServer.Core.classes.accounts.get(account, db_client, callback);
};

module.exports = mAPI;