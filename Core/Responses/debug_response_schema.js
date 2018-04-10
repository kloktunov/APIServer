var x = {

	fields: [
		{
			type: "int",
			is_array: false,
			name: "int_value",
			is_optional: false
		},

		{
			type: "float",
			is_array: false,
			name: "float_value",
			is_optional: false
		},

		{
			type: "string",
			is_array: false,
			name: "string_value",
			is_optional: false
		},

		{
			type: "int",
			is_array: true,
			name: "int_array",
			is_optional: false
		},

		{
			type: "float",
			is_array: true,
			name: "float_array",
			is_optional: false
		},

		{
			type: "string",
			is_array: true,
			name: "string_array",
			is_optional: false
		},


		{
			type: "object",
			is_array: false,
			name: "object_value",
			is_optional: false,
			fields: [
				{
					type: "int",
					is_array: false,
					name: "int_value",
					is_optional: false
				},

				{
					type: "float",
					is_array: false,
					name: "float_value",
					is_optional: false
				},

				{
					type: "string",
					is_array: false,
					name: "string_value",
					is_optional: false
				},

				{
					type: "int",
					is_array: true,
					name: "int_array",
							is_optional: false
				},

				{
					type: "float",
					is_array: true,
					name: "float_array",
					is_optional: false
				},

				{
					type: "string",
					is_array: true,
					name: "string_array",
					is_optional: false
				}

			]

		},

		{
			type: "object",
			is_array: true,
			name: "object_array",
			is_optional: false,
			fields: [
				{
					type: "int",
					is_array: false,
					name: "int_value",
					is_optional: false
				},
				{
					type: "float",
					is_array: false,
					name: "float_value",
					is_optional: false
				},
				{
					type: "string",
					is_array: false,
					name: "string_value",
					is_optional: false
				},
				{
					type: "int",
					is_array: true,
					name: "int_array",
					is_optional: false
				},

				{
					type: "float",
					is_array: true,
					name: "float_array",
					is_optional: false
				},

				{
					type: "string",
					is_array: true,
					name: "string_array",
					is_optional: false
				},
				{
					type: "object",
					is_array: false,
					name: "object_value",
					is_optional: false,
					fields: [
						{
							type: "int",
							is_array: false,
							name: "int_value",
							is_optional: false
						},

						{
							type: "float",
							is_array: false,
							name: "float_value",
							is_optional: false
						},

						{
							type: "string",
							is_array: false,
							name: "string_value",
							is_optional: false
						},

						{
							type: "int",
							is_array: true,
							name: "int_array",
									is_optional: false
						},

						{
							type: "float",
							is_array: true,
							name: "float_array",
							is_optional: false
						},

						{
							type: "string",
							is_array: true,
							name: "string_array",
							is_optional: false
						}

					]

				}
			]
		}
	]

};

module.exports = x;