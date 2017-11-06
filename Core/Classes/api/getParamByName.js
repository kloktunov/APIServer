var m = function (class_name, method_name, param_name, __account, __cb){

	if(global.APIServer.API.schema.classes[class_name] == undefined || global.APIServer.API.schema.classes[class_name].methods[method_name] == undefined || global.APIServer.API.schema.classes[class_name].methods[method_name].params[param_name] == undefined){
		callback(1);
		return;
	}

	var param_info = global.APIServer.API.schema.classes[class_name].methods[method_name].params[param_name];
	
	switch(param_info.type){
		case 1:
			param_info.type = 'Int';
		break;
		case 2:
			param_info.type = 'String';
		break;
		case 3:
			param_info.type = 'Array';
		break;
		default:
			param_info.type = 'String';
		break;

	}

	// response
	__cb(param_info);
}


module.exports = m;