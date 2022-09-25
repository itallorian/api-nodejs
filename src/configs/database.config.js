import config from "config";
import mongoose from "mongoose";

mongoose.connect(config.get("connectionString.default"));

let context = mongoose.connection;

export default context;