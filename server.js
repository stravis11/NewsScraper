// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// PORT Setup
const PORT = process.env.PORT || 3000;

// Express & Require Routes
const app = express();
const routes = require("./routes");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static(`${__dirname}/public`));

// Connect Handlebars & Express
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Request route
app.use(routes);

// Set deployed or local database
const db = process.env.MONGODB_URI || "mongodb://127.0.0.1/mongoHeadlines";

// Connect to database
mongoose.connect(db, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connection successful");
  }
});
// Listen on port
app.listen(PORT, () => console.log("Listening on port %s", PORT));
