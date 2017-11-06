var m = function (class_name, method_name, offset, count, __account, __cb){

	if(global.APIServer.API.schema.classes[class_name] == undefined || global.APIServer.API.schema.classes[class_name].methods[method_name] == undefined){
		callback(1);
		return;
	}

	var params_list = Object.keys(global.APIServer.API.schema.classes[class_name].methods[method_name].params);

	var response = {
		params: []
	};

	for(var i = offset, length = params_list.length, max = offset + count; i < max && i < length; i++){

		var param_name = params_list[i];
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

		response.params.push(param_info);
	}

	// response
	__cb(response);
}


module.exports = m;