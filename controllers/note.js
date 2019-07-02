// Notes Controller
const db = require("../models");

// Find, Create & Delete Note
module.exports = {
  find: (req, res) => {
    db.Note.find({ _headlineId: req.params.id }).then(dbNote => {
      res.json(dbNote);
    });
  },

  create: function(req, res) {
    db.Note.create(req.body).then(dbNote => {
      res.json(dbNote);
    });
  },

  delete: function(req, res) {
    db.Note.remove({ _id: req.params.id }).then(dbNote => {
      res.json(dbNote);
    });
  }
};
