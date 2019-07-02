// Scraper Controller
// ============================
const db = require("../models");
const scrape = require("../scripts/scrape");

// Scrape New York Times & Insert Into Database
module.exports = {
  scrapeHeadlines: (req, res) => {
    return scrape()
      .then(articles => {
        return db.Headline.create(articles);
      })
      .then(dbHeadline => {
        if (dbHeadline.length === 0) {
          res.json({
            message: "No new articles today. Check back tomorrow!"
          });
        } else {
          // New Articles #
          res.json({
            message: "Added " + dbHeadline.length + " new articles!"
          });
        }
      })
      .catch(err => {
        res.json({
          message: "Scrape complete!!"
        });
      });
  }
};
