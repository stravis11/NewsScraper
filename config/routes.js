// Scrape function
const scrape = require("../scripts/scrape");

// headlines and notes controller
const headlinesController = require("../controllers/headlines");
const notesController = require("../controllers/notes");

module.exports = router => {
  // Render homepage
  router.get("/", (req, res) => {
    res.render("home");
  });
  // Render saved handlebars
  router.get("/saved", (req, res) => {
    res.render("saved");
  });

  router.get("/api/fetch", (req, res) => {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles. Check back later."
        });
      } else {
        res.json({
          message: "Added " + docs.insertedCount + " new articles."
        });
      }
    });
  });

  router.get("/api/headlines", (req, res) => {
    let query = {};
    if (req.query.saved) {
      query = req.query;
    }
    headlinesController.get(query, data => {
      res.json(data);
    });
  });

  router.delete("/api/headlines/:id", (req, res) => {
    let query = {};
    query._id = req.params.id;
    headlinesController.delete(query, (err, data) => {
      res.json(data);
    });
  });

  router.patch("/api/headling", (req, res) => {
    headlinesController.update(req.body, (err, data) => {
      res.json(data);
    });
  });

  router.get("/api/notes/:headline_id?", (req, res) => {
    let query = {};
    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }
    notesController.get(query, (err, data) => {
      res.json(data);
    });
  });

  router.delete("/api/notes/:id", (req, res) => {
    let query = {};
    query._id = req.params.id;
    notesController.delete(query, (err, data) => {
      res.json(data);
    });
  });

  router.post("/api/notes", (req, res) => {
    notesController.save(req.body, data => {
      res.json(data);
    });
  });
};
