var mAPI = function (params, cb){

	global.APIServer.Core.classes.api.version(function (data){

		var api_response = data;

		cb(global.APIServer.API.renderResponse(0, api_response));

	});

};

module.exports = mAPI;