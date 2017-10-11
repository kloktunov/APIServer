var m = function (cb){

	var version = "0.1";
	var project_name = "Test project";

	// response
	cb({

		project_name: project_name,
		version: version

	});
};


module.exports = m;