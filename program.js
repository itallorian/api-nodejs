import startup from "./src/startup.js";

const port = process.env.PORT || 3000;
startup.listen(port);