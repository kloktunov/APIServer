var fs = require('fs');
var path = require('path');

var main = (function (){

	return {

		init: function (cb){
			// 1. Подгружаем классы и методы в global
			// 2. Подругжаем свою библиотеку для БД в global

			global.APIServer = {

				API: {

					schema: require('./Config/schema.js'),

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

						// 1. Проверка класса и метода 
						// 2. Проверка параметров по схеме

						// 1.1. Проверка классов и методов по схеме API

						if(global.APIServer.API.schema.classes[class_name] == undefined || global.APIServer.API.schema.classes[class_name].methods[method_name] == undefined){
							callback(1);
							return;
						}

						// 1.2. Проверка реализации классов и методов
						if(global.APIServer.API.classes[class_name] == undefined || global.APIServer.API.classes[class_name][method_name] == undefined){
							callback(1);
							return;
						}


						/*
							2. Проверка параметров по схеме
								2.1. Проверяем условия метода:
									- Авторизация
									- Доступ админа
									- Доступ к бд
								2.2. Проверяем параметры из списка
									- Тип
									- Обязательная или нет
									- etc.
						*/


						var methodSchema = global.APIServer.API.schema.classes[class_name].methods[method_name];
						var paramsSchema = methodSchema.params;

						if(methodSchema.is_auth) methodSchema.is_db = true;

						var db_client;
						var account = {
							id: -1,
							app: {
								id: -1,
								name: "system",
								access: [ "root" ]
							},
							is_admin: false,
							token: ""
						};

						var apiParams = {};

						var checker = {

							start: function (){

							},


							isDB: function (){
								
								if(methodSchema.is_db){
									db_client = global.APIServer.Core.db.createClient();
								}

							},

							isAuth: function (){
								// Если требуется авторизация
								if(methodSchema.is_auth){
									
									var token_param = params["token"];

									if(token_param == undefined){

										// нет параметра с токеном
										callback(2);
										return;
									}

								}

							},

							isAdmin: function (){
								// Если метод только для администраторов
								if(methodSchema.is_admin){

									
										
								}

							},


							paramsCheck: function(){

								for(param in paramsSchema){

									var qParam = params[param.name];

									if(qParam == undefined && param.optional == false){

										// Нет обязательной переменной
										callback(2);
										return;
									}

									switch(param.type){
										case 1:
											// int
											if(!(/^\+?(0|[1-9]\d*)$/.test(qParam))){

												// Несоответсвие типов
												callback(2);
												return;

											}


										break;
										case 2:
											// string
										break;
									}

									apiParams[param.name] = qParam;
								}


							},

							finish: function (){
								global.APIServer.API.classes[class_name][method_name](apiParams, account, db_client, callback);
							}

						}

						checker.start();

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

					getAccount: function (token, db_client, callback){

						db_client.query('SELECT * FROM accounts WHERE hash=?', auth_hash, function (err, rows, fields) {
							if(err || rows.length == 0){
								callback(null);
							}
	
							callback(rows[0].id);							
	
							db_client.end();
						});									

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

			fs.readdirSync(p).forEach(function (class_name, index, arr){

			    classes[class_name] = {

			    };

			    var class_dir = p + "/" + class_name;
			    fs.readdirSync(class_dir).forEach(function (method_name, index, arr){

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

			fs.readdirSync(p).forEach(function (class_name, index, arr){

			    classes[class_name] = {

			    };

			    var class_dir = p + "/" + class_name;
			    fs.readdirSync(class_dir).forEach(function (method_name, index, arr){

			    	var method_call_name = method_name.split('.')[0];
			    	classes[class_name][method_call_name] = require(class_dir + "/" + method_name);

				});

			});

			return classes;

		}

	};

})();

module.exports = main;