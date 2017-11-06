var m = function (class_name, method_name, __account, __cb){

	if(global.APIServer.API.schema.classes[class_name] == undefined || global.APIServer.API.schema.classes[class_name].methods[method_name] == undefined){
		callback(1);
		return;
	}

	var method_info = global.APIServer.API.schema.classes[class_name].methods[method_name];

	// response
	__cb({
		name: method_info.name,
		description: method_info.description,
		is_auth: method_info.is_auth,
	});
}


module.exports = m;