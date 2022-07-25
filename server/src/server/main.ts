import express from "express";
import { Sequelize } from "sequelize-typescript";
import { Buyer } from "../models/sequelize/Buyer.Model";
import { ProcurementRecord } from "../models/sequelize/ProcurementRecord.Model";
import routes from "../routes";
import dbInit from "../db/init";

/**
 * This file has little structure and doesn't represent production quality code.
 * Feel free to refactor it or add comments on what could be improved.
 *
 * We specifically avoided any use of sequelize ORM features and used plain SQL
 * queries and only the data mapping to get nice JavaScript objects from the DB.
 *
 * You can switch to using the ORM features or continue using SQL.
 */
dbInit();

const baseUrl = process.env.basePath || "/api";
const app = express();

app.set("baseUrl", baseUrl);
app.set("port", process.env.PORT || 3000);
app.set("views", "./views");
app.set("view engine", "ejs");

app.locals["assets_url"] = process.env.VITE_URL || "http://localhost:3001";

app.use(express.json());

app.get("/", (_req, res) => {
  res.render("index.html.ejs");
});

app.use(baseUrl, routes(app.get("baseUrl")));

async function startServer(): Promise<void> {
  try {
    app.listen(app.get("port"), () => {
      console.log("  App is running at http://localhost:%d", app.get("port"));
      console.log("  Press CTRL-C to stop\n");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

void startServer();
