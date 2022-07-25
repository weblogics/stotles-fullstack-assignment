import { Sequelize } from "sequelize-typescript";

const sqlite: Sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env["SQLITE_DB"] || "./db.sqlite3",
});

export default sqlite;
