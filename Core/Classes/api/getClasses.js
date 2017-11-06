var m = function (offset, count, __account, __cb){

	var classes_list = Object.keys(global.APIServer.API.schema.classes);

	var response = {
		classes: []
	};

	for(var i = offset, length = classes_list.length, max = offset + count; i < max && i < length; i++){

		var class_name = classes_list[i];
		var class_info = global.APIServer.API.schema.classes[class_name];

		response.classes.push({
			name: class_info.name,
			description: class_info.description
		});
	}

	// response
	__cb(response);
}


module.exports = m;