var mAPI = function (params, __class_name, __method_name, __account, __db_client, __cb){

	var name = params.name;
	var access = params.access;
	var description = params.description;


	global.APIServer.Core.classes[__class_name][__method_name](name, access, description, __account, __db_client, __cb);
};

module.exports = mAPI;