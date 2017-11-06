var m = function (class_name, __account, __cb){

	if(global.APIServer.API.schema.classes[class_name] == undefined){
		// не найден класс
		__cb(1);
		return;
	}

	var class_info = global.APIServer.API.schema.classes[class_name];

	// response
	__cb({
		name: class_info.name,
		description: class_info.description
	});
}


module.exports = m;