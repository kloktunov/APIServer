var schema = {
	classes: {

		api: {
			name: "api",
			description: "Класс содержит методы для получения информации об текущем API",

			methods: {
				version: {
					name: "version",
					description: "Получает информацию о версии текущего API",

					is_auth: false,
					is_admin: false,
					is_db: false,

					params: {

					}

				}
			}
		},

		users: {
			name: "users",
			description: "Класс содержит в себе методы для работы с пользователями",

			methods: {
				get: {
					name: "get",
					description: "Получает информацию о пользователе по его ID",

					is_auth: true,
					is_admin: false,
					is_db: true,

					params: {
						id: {
							name: "id",
							description: "Индивидуальный индентификатор пользователя",

							type: 1,

							optional: false

						}
					}
				},

			}
		},

		auth: {
			name: "auth",
			description: "Класс содержит в себе методы для работы с авторизацией",

			methods: {

			}
		}
	}

};

module.exports = schema;