// Note Model

// Mongoose
const mongoose = require("mongoose");

// Mongoose Schema Method
const Schema = mongoose.Schema;

// Schema Object Note Schema
const noteSchema = new Schema({
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },

  date: {
    type: Date,
    default: Date.now
  },

  noteText: String
});

// Note Schema Note Model
const Note = mongoose.model("Note", noteSchema);

// Note Model Export
module.exports = Note;
