var fs = require('fs');

var HTTServer = {

	start: function (port){
		var express = require('express');
		var app = express();

		app.get('/oauth/authorize', function(req, res){

			var authorize = require('OAuth/Pages/authorize.js');

			authorize(req, function (status, html){
				res.end(html);
			});
		});

		app.get('/oauth/aссess_token', function(req, res){

			var access_token = require('OAuth/Pages/access_token.js');

			access_token(req, function (status, html){
				res.end(html);
			});
		});

		app.get('/oauth/blank.html', function(req, res){

			// blank.html для получения request_code
			res.end("Страница авторизации");
		});

		app.get('/api/:class_name([a-zA-Z]+).:method_name([a-zA-Z]+)', function(req, res){
			
			// ограничваем количество параметров
			var params_limit = 50;

			// проверяем нет ли массивов в параметрах
			var query_params_arr = Object.keys(req.query);
			var qpa_l = query_params_arr.length;
			
			if(qpa_l > params_limit){
				res.jsonp({

					err: 'Много параметров'

				});
				res.end();
			}

			for (var i = 0; i < qpa_l && i < params_limit; i++) {
				var key = query_params_arr[i];
				if(Array.isArray(req.query[key])){
					res.jsonp({
						err: 'Есть массивы в запрсое'
					});
					res.end();
					return;
				}
			};

			global.APIServer.API.call(req.params.class_name, req.params.method_name, req.query, function (data){

				res.jsonp(data);

			});
		});

		app.get('/api/:any(*+)', function(req, res){
			res.jsonp({
				err: "кривой запрос"
			});
			res.end();
		});

		app.listen(port);
	}

}

var m = require("./main.js");

m.init(function (data){
	
	HTTServer.start(8080);

});