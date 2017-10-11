var fs = require('fs');
var path = require('path');

var main = (function (){

	return {

		init: function (cb){
			// 1. Подгружаем классы и методы в global
			// 2. Подругжаем свою библиотеку для БД в global

			global.APIServer = {

				API: {

					// status = 0/1, response
					renderResponse: function (status, response){

						if(status == 0){
							return {
								status: 'success',
								response: response
							}
						} else {
							return {
								status: 'error',
								error: response
							}
						}

					},

					classes: {

					},

					errors: {

					},

					call: function (class_name, method_name, params, callback){

						if(global.APIServer.API.classes[class_name] == undefined || global.APIServer.API.classes[class_name][method_name] == undefined){
							callback(1);
							return;
						}

						global.APIServer.API.classes[class_name][method_name](params, callback);				
					},

				},

				Core: {

					db: {
						mysql: require('mysql'),
						
						config: {
							host: '127.0.0.1',
							user: 'root',
							password: '',
							database: 'QAuth'							
						},

						createClient: function (){
							var c = global.APIServer.Core.db.mysql.createConnection(global.APIServer.Core.db.config);
							c.connect();
							return c;
						},

					},

					classes:{

					}
				}

			};


			global.APIServer.Core.classes = this.getClassList();
			global.APIServer.API.classes = this.getApiList();

			cb();

		},

		getClassList: function (){
			var classes = {

			};

			var p = __dirname + "/Core/Classes";

			fs.readdirSync(p).forEach(class_name => {

			    classes[class_name] = {

			    };

			    var class_dir = p + "/" + class_name;
			    fs.readdirSync(class_dir).forEach(method_name => {

			    	var method_call_name = method_name.split('.')[0];
			    	classes[class_name][method_call_name] = require(class_dir + "/" + method_name);

				});

			});

			return classes;
		},

		getApiList: function (){
			var classes = {

			};

			var p = __dirname + "/API/Classes";

			fs.readdirSync(p).forEach(class_name => {

			    classes[class_name] = {

			    };

			    var class_dir = p + "/" + class_name;
			    fs.readdirSync(class_dir).forEach(method_name => {

			    	var method_call_name = method_name.split('.')[0];
			    	classes[class_name][method_call_name] = require(class_dir + "/" + method_name);

				});

			});

			return classes;

		}

	};

})();

module.exports = main;