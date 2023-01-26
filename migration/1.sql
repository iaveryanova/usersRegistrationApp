DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `firstname` varchar(128) NOT NULL,
                         `lastname` varchar(128) NOT NULL,
                         `email` varchar(128) NOT NULL,
                         `login` varchar(128) NOT NULL,
                         `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         `last_login` datetime DEFAULT NULL,
                         `status` tinyint NOT NULL DEFAULT '1',
                         `token` varchar(256) DEFAULT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;