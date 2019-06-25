const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const PORT = process.env.PORT || 3000;
const router = express.Router();
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(PORT, () => console.log("Listening on port %s", PORT));
