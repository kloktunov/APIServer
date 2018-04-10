var renderResponse = {
	
	parseField: function (field, data){
		var f;


		var type = field['type'];

		switch(type){
			case "object":
				return renderResponse.parseFieldObject(field, data);
			break;
			case "int":
				f = parseInt(data);
			break;
			case "float":
				f = parseFloat(data);
			break;
			case "string":
				if(typeof(data) != "string"){
					return null;
				}

				return data;
			break;
			default:
				return null;
			break;
		}

		if(isNaN(f)){
			return null;
		}

		return f;
	},

	parseFieldType: function (field, data){

	},

	parseFieldObject: function (field, data){
		console.log(field.name)

		var f = {};

		for(var i = 0, length = field.fields.length; i < length; i++){

			var i_field = field.fields[i];
			var i_field_value;

			if(!i_field.is_array){
				i_field_value = renderResponse.parseField(i_field, data[i_field.name]);
			} else {
				i_field_value = renderResponse.parseFieldArray(i_field, data[i_field.name]);				
			}

			if(i_field_value == null){
				return null;
			}

			f[i_field.name] = i_field_value;

		}

		return f;

	},

	parseFieldArray: function (field, data){
		var f = [];

		for(var i = 0, length = data.length; i < length; i++){

			var item = renderResponse.parseField(field, data[i]);

			if(item == null){
				return null;
			}

			f.push(item);

		}

		return f;
	},

	render: function (class_name, method_name, data){

		var responseSchema = global.APIServer.API.schema.classes[class_name].methods[method_name].response;

		var responseObject = {};

		for(var i = 0, length = responseSchema.fields.length; i < length; i++){

			var field = responseSchema.fields[i];

			var is_array = field['is_array'];
			var name = field['name'];
			var is_optional = field['is_optional'];


			// Проверяем обязательное ли поле
			if(!is_optional && !data[name]){
				return null;
			}

			// Проверяем ялвляется ли поле массивом
			if(!is_array && Array.isArray(data[name])){
				return null;			
			}


			if(!is_array){
				responseObject[name] = renderResponse.parseField(field, data[name]);
			} else {
				responseObject[name] = renderResponse.parseFieldArray(field, data[name]);				
			}


		}


		return responseObject;
	}


}

module.exports = renderResponse;