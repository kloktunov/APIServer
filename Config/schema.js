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

		accounts: {
			name: "accounts",
			description: "Класс содержит методы для работы с аккаунтом",

			methods: {
				get: {
					name: "get",
					description: "Получает информацию об аккаунте",

					is_auth: true,
					is_admin: false,
					is_db: true,

					params: {
						offset: {
							name: "offset",
							description: "Стартовая позиция",

							type: 2,

							optional: false,

							conditions: [

							]
						},
					}

				},

				getSessions: {
					name: "getSessions",
					description: "Содержит список последних сессий пользователя",

					is_auth: true,
					is_admin: false,
					is_db: true,

					params: {

						offset: {
							name: "offset",
							description: "Стартовая позиция",

							type: 1,

							optional: false,

							conditions: [

								{
									type: 'min_limit',
									min: 0
								}

							]
						},

						count: {
							name: "count",
							description: "Количество строк",

							type: 1,

							optional: false,

							conditions: [

								{
									type: 'max_limit',
									max: 100
								}

							]
						}

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

							optional: false,

							conditions: [

							]

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