var m = function (class_name, offset, count, __account, __cb){

	if(global.APIServer.API.schema.classes[class_name] == undefined){
		// не найден класс
		__cb(1);
		return;
	}

	var methods_list = Object.keys(global.APIServer.API.schema.classes[class_name].methods);

	var response = {
		methods: []
	};

	for(var i = offset, length = methods_list.length, max = offset + count; i < max && i < length; i++){

		var method_name = methods_list[i];
		var method_info = global.APIServer.API.schema.classes[class_name].methods[method_name];

		response.methods.push({
			name: method_info.name,
			description: method_info.description,
			is_auth: method_info.is_auth
		});
	}

	// response
	__cb(response);
}


module.exports = m;