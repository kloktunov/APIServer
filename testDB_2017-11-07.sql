-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 06 2017 г., 21:19
-- Версия сервера: 10.1.24-MariaDB
-- Версия PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `testdb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) UNSIGNED NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` text,
  `admin` int(11) NOT NULL DEFAULT '0',
  `salt` text,
  `ban` int(11) NOT NULL DEFAULT '0',
  `ban_reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`id`, `login`, `password`, `admin`, `salt`, `ban`, `ban_reason`) VALUES
(1, 'kloktun', 'a4e13b4554375dfe376a73ebc108e004bedf79cfd89d02372ff41d4f2f7954d3', 1, '1592', 0, '');

-- --------------------------------------------------------

--
-- Структура таблицы `apps`
--

CREATE TABLE `apps` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` text,
  `description` text NOT NULL,
  `access` text,
  `redirect_uri` text NOT NULL,
  `secret_key` text NOT NULL,
  `date` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `apps`
--

INSERT INTO `apps` (`id`, `name`, `description`, `access`, `redirect_uri`, `secret_key`, `date`) VALUES
(1, 'default', 'Системное приложение, установленное у всех пользователей', 'default', '0', '', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `apps_install`
--

CREATE TABLE `apps_install` (
  `id` int(11) UNSIGNED NOT NULL,
  `app_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `apps_install`
--

INSERT INTO `apps_install` (`id`, `app_id`, `user_id`, `date`) VALUES
(1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `blacklist`
--

CREATE TABLE `blacklist` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `ban` int(11) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `captcha`
--

CREATE TABLE `captcha` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` text NOT NULL,
  `value` text NOT NULL,
  `status` int(11) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `follow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `album` int(11) NOT NULL,
  `description` text NOT NULL,
  `date` int(11) NOT NULL,
  `remove` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `photos_hosts`
--

CREATE TABLE `photos_hosts` (
  `id` int(11) NOT NULL,
  `host` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `photos_sizes`
--

CREATE TABLE `photos_sizes` (
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `size` text NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `host` int(11) NOT NULL,
  `filename` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `photos_upload_keys`
--

CREATE TABLE `photos_upload_keys` (
  `id` int(11) NOT NULL,
  `host` int(11) NOT NULL,
  `upload_key` text NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `screen_name` text NOT NULL,
  `first_name` text CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `last_name` text CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `sex` int(11) NOT NULL DEFAULT '0',
  `dob` int(11) NOT NULL DEFAULT '0',
  `pid` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `profile`
--

INSERT INTO `profile` (`id`, `screen_name`, `first_name`, `last_name`, `sex`, `dob`, `pid`) VALUES
(1, 'id1', 'Алексей', 'Клоктунов', 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `realtime`
--

CREATE TABLE `realtime` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `code` text NOT NULL,
  `expires` int(11) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `service` text NOT NULL,
  `oauth_id` text NOT NULL,
  `oauth_username` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `services`
--

INSERT INTO `services` (`id`, `uid`, `service`, `oauth_id`, `oauth_username`) VALUES
(1, 1, 'vk', '159940081', 'kloktunov');

-- --------------------------------------------------------

--
-- Структура таблицы `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) UNSIGNED NOT NULL,
  `app_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` text,
  `ip` text NOT NULL,
  `date` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tokens`
--

INSERT INTO `tokens` (`id`, `app_id`, `user_id`, `token`, `ip`, `date`) VALUES
(1, 1, 1, '1996f9bf26335ebe6a24f840e8a45603ec9dcdec7c820fb4d4cf4594b6e087fc', '', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- Индексы таблицы `apps`
--
ALTER TABLE `apps`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `apps_install`
--
ALTER TABLE `apps_install`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `captcha`
--
ALTER TABLE `captcha`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `photos_hosts`
--
ALTER TABLE `photos_hosts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `photos_sizes`
--
ALTER TABLE `photos_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `photos_upload_keys`
--
ALTER TABLE `photos_upload_keys`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `realtime`
--
ALTER TABLE `realtime`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `apps`
--
ALTER TABLE `apps`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `apps_install`
--
ALTER TABLE `apps_install`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `blacklist`
--
ALTER TABLE `blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `captcha`
--
ALTER TABLE `captcha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `photos_hosts`
--
ALTER TABLE `photos_hosts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `photos_sizes`
--
ALTER TABLE `photos_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `photos_upload_keys`
--
ALTER TABLE `photos_upload_keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `realtime`
--
ALTER TABLE `realtime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
