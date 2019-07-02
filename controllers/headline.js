// Headline Controller
// ============================
const db = require("../models");

module.exports = {
  // Find, Sort & Send Headlines
  findAll: (req, res) => {
    db.Headline.find(req.query)
      .sort({ date: -1 })
      .then(function(dbHeadline) {
        res.json(dbHeadline);
      });
  },
  // Delete function
  delete: (req, res) => {
    db.Headline.remove({ _id: req.params.id }).then(dbHeadline => {
      res.json(dbHeadline);
    });
  },
  // Udate Function
  update: (req, res) => {
    db.Headline.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).then(dbHeadline => {
      res.json(dbHeadline);
    });
  }
};
