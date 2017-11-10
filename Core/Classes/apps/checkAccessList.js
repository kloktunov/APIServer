var m = function (access){
	var split_access = access.split(',');

	var valid_access = [];

	for(var i = 0, length = split_access.length; i < length; i++){

		var current_class = split_access[i].trim();
		if(global.APIServer.API.classes[current_class] == undefined) continue;

		valid_access.push(current_class);
	}

	return valid_access;
};

module.exports = m;