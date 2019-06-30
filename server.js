// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

// Set express router
const router = express.Router();

// Use bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Connect handlebars to express app
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Set requests to go through router
app.use(router);

// Set deployed or localal database
const db = process.env.MONGODB_URI || "mongodb://127.0.0.1/mongoHeadlines";

// Connect to database
mongoose.connect(db, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connection successfull");
  }
});

// Listen on port
app.listen(PORT, () => console.log("Listening on port %s", PORT));
