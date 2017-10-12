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
									- Условия
						*/


						var methodSchema = global.APIServer.API.schema.classes[class_name].methods[method_name];
						var paramsSchema = methodSchema.params;

						if(methodSchema.is_admin) methodSchema.is_auth = true;
						if(methodSchema.is_auth) methodSchema.is_db = true;

						var db_client;
						var account = {
							id: -1,
							app: {
								id: 1,
								name: "system",
								access: [ "system" ]
							},
							is_admin: false,
							token: ""
						};

						var apiParams = {};

						var checker = {

							start: function (){
								checker.isDB();
							},


							isDB: function (){
								
								if(methodSchema.is_db){
									db_client = global.APIServer.Core.db.createClient();
								}

								checker.isAuth();

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


									global.APIServer.Core.getAccount(token_param, db_client, checker.checkAccount);
									return;
								}

								checker.checkAccount(null);

							},

							checkAccount: function (acc){

								if(acc 	== null && methodSchema.is_auth){
									// не авторизован
									callback(2);
									return;
								}

								account = acc;

								checker.isAdmin();

							},

							isAdmin: function (){
								// Если метод только для администраторов
								if(!methodSchema.is_admin){
									checker.paramsCheck();
									return;					
								}

								if(account.is_admin == false){

									// метод только для админов. нет доступа
									callback(2);
									return;

								}

								checker.paramsCheck();

							},


							paramsCheck: function(){

								for(param_name in paramsSchema){

									var param = paramsSchema[param_name];
									var qParam = params[param.name];

									if((qParam == null || qParam == undefined) && param.optional == false){

										// Нет обязательной переменной
										callback(2);
										return;
									}

									if(qParam == null){
										continue;
									}

									switch(param.type){
										case 1:
											// int
											qParam = parseInt(qParam);
											if(qParam == null || isNaN(qParam)){

												// Несоответсвие типов
												callback(2);
												return;

											}
										break;
										case 2:
											// string
										break;
										case 3:
											// array
										break;
									}

									/*
										Проверяем conditions
									*/

									var conditions = param.conditions;
									for(var i = 0, length = conditions.length; i < length; i++){

										var cond = conditions[i];
										switch(cond.type){
											case 'min_limit':

												if(param.type !== 1){
													// Невыполненно условие
													callback(2);
													return;
												}

												if(qParam < cond.min){
													// Невыполненно условие
													callback(2);
													return;														
												}

											break;
											case 'max_limit':

												if(param.type !== 1){
													// Невыполненно условие
													callback(2);
													return;
												}

												if(qParam > cond.max){
													// Невыполненно условие
													callback(2);
													return;														
												}

											break;
											case 'interval':

												if(param.type !== 1){
													// Невыполненно условие
													callback(2);
													return;
												}

												if(qParam < cond.min || qParam > cond.max){
													// Невыполненно условие
													callback(2);
													return;														
												}

											break;
											case 'min_length':

												if(qParam.length < cond.min){
													// Невыполненно условие
													callback(2);
													return;														
												}

											break;
											case 'max_length':

												if(qParam.length > cond.max){
													// Невыполненно условие
													callback(2);
													return;														
												}

											break;
											default:
												console.log('not support: ' + cond.type);
											break;
										}

									}

									apiParams[param.name] = qParam;
								}


								checker.finish();


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
						
						config: require('./Config/db_config.js'),

						createClient: function (){
							var c = global.APIServer.Core.db.mysql.createConnection(global.APIServer.Core.db.config);
							c.connect();
							return c;
						},

					},

					getAccount: function (token, db_client, callback){
						db_client.query('SELECT tokens.user_id, tokens.app_id, apps.name AS app_name, apps.access AS app_access, accounts.admin, tokens.token FROM accounts, apps, tokens WHERE apps.id = tokens.app_id AND accounts.id = tokens.user_id AND tokens.token = ?', token, function (err, rows, fields) {
							if(err || rows.length == 0){
								callback(null);
								return;
							}

							var account = {
								id: rows[0].user_id,
								app: {
									id: rows[0].app_id,
									name: rows[0].app_name,
									access: rows[0].app_access.split(',')
								},
								is_admin: (rows[0].admin == 1),
								token: rows[0].token
							};

							callback(account);					
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