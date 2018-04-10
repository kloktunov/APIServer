const util = require('util');

var rr = require('./renderResponse.js');


var data = {

	"int_value": 1,
	"float_value": 3.3,
	"string_value": "its string",

	"int_array": [1, 2, 3, 4],
	"float_array": [1.0, 2.1, 3.3, 4.5],
	"string_array": ["qwe", "rte", "string", "one more string"],

	"object_value": {

		"int_value": 1,
		"float_value": 3.3,
		"string_value": "its string",

		"int_array": [1, 2, 3, 4],
		"float_array": [1.0, 2.1, 3.3, 4.5],
		"string_array": ["qwe", "rte", "string", "one more string"]

	},

	"object_array": [
		{
			"int_value": 1,
			"float_value": 3.3,
			"string_value": "its string",

			"int_array": [1, 2, 3, 4],
			"float_array": [1.0, 2.1, 3.3, 4.5],
			"string_array": ["qwe", "rte", "string", "one more string"],

			"object_value": {

				"int_value": 1,
				"float_value": 3.3,
				"string_value": "its string",

				"int_array": [1, 2, 3, 4],
				"float_array": [1.0, 2.1, 3.3, 4.5],
				"string_array": ["qwe", "rte", "string", "one more string"]

			}

		},
		{
			"int_value": 1,
			"float_value": 3.3,
			"string_value": "its string",

			"int_array": [1, 2, 3, 4],
			"float_array": [1.0, 2.1, 3.3, 4.5],
			"string_array": ["qwe", "rte", "string", "one more string"],

			"object_value": {

				"int_value": 1,
				"float_value": 3.3,
				"string_value": "its string",

				"int_array": [1, 2, 3, 4],
				"float_array": [1.0, 2.1, 3.3, 4.5],
				"string_array": ["qwe", "rte", "string", "one more string"]

			}

		},
		{
			"int_value": 1,
			"float_value": 3.3,
			"string_value": "its string",

			"int_array": [1, 2, 3, 4],
			"float_array": [1.0, 2.1, 3.3, 4.5],
			"string_array": ["qwe", "rte", "string", "one more string"],

			"object_value": {

				"int_value": 1,
				"float_value": 3.3,
				"string_value": "its string",

				"int_array": [1, 2, 3, 4],
				"float_array": [1.0, 2.1, 3.3, 4.5],
				"string_array": ["qwe", "rte", "string", "one more string"]

			}

		}
	]
}

console.log(util.inspect(rr.render("class", "method", data), false, null))
