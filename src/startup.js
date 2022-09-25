import express from "express";
import database from "./configs/database.config.js";
import controller from "./controllers/base.controller.js";

database.on("error", console.log.bind(console, "ERROR: Database connect"));
database.once("open", () => { });

const startup = express();
startup.use(express.json());

controller(startup);

export default startup