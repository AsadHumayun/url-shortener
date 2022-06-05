/**
 * Starts the database and defines models.
 */

import Sequelize from "sequelize";
import { join } from "node:path";

import { getData } from "../models/Data.js";

export function dbInit() {
	const sequelize = new Sequelize("database", "user", "password", {
		host: "localhost",
		dialect: "sqlite",
		storage: join(process.cwd(), "_assets", "db", "database.sqlite"),
		logging: false,
	});

	const Data = getData(sequelize);

	if (process.argv.includes("--syncsql")) {
		console.info("[Sequelize] Syncing database...");
		sequelize.sync({ force: true });
		console.info("[Sequelize] Successfully synced sequelize database");
	}

	return {
		sequelize,
		Data,
	};
}