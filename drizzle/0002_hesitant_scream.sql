CREATE TABLE `menus` (
	`id` text PRIMARY KEY NOT NULL,
	`location` text NOT NULL,
	`items` text DEFAULT '[]' NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `menus_location_unique` ON `menus` (`location`);--> statement-breakpoint
CREATE TABLE `site_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text,
	`group` text DEFAULT 'general'
);
