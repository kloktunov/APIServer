var mAPI = function (params, account, db_client, cb){
	var callback = function (data){

		var api_response = data;

		cb(global.APIServer.API.renderResponse(0, api_response));

	};

	global.APIServer.Core.classes.accounts.get(account, callback);
};

module.exports = mAPI;