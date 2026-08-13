CREATE TABLE `generatedShares` (
	`id` varchar(32) NOT NULL,
	`imageKey` varchar(512) NOT NULL,
	`imageUrl` varchar(1024) NOT NULL,
	`format` enum('pfp','id') NOT NULL,
	`builderName` varchar(128),
	`builderHandle` varchar(128),
	`builderTitle` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `generatedShares_id` PRIMARY KEY(`id`)
);
