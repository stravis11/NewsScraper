const Note = require("../models/Note");
const createDate = require("../scripts/date");

module.exports = {
  get: (data, cb) => {
    Note.find(
      {
        _headlineId: data._id
      },
      cb
    );
  },
  save: (data, cb) => {
    let newNote = {
      _headlineId: data._id,
      date: createDate(),
      noteText: data.noteText
    };
    Note.create(newNote, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        cb(doc);
      }
    });
  },
  delete: (data, cb) => {
    Note.remove(
      {
        _id: data._id
      },
      cb
    );
  }
};
