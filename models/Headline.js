// Headline Model

// Mongoose
const mongoose = require("mongoose");

// Mongoose Schema Method
const Schema = mongoose.Schema;

// Headline Schema
const headlineSchema = new Schema({
  // Headline
  headline: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },

  // Summary
  summary: {
    type: String,
    required: true
  },

  // Link
  url: {
    type: String,
    required: true
  },

  // Date
  date: {
    type: Date,
    default: Date.now
  },
  saved: {
    type: Boolean,
    default: false
  }
});

// Create Headline From Schema
const Headline = mongoose.model("Headline", headlineSchema);

// Headline Modal Export
module.exports = Headline;
