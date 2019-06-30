const axios = require("axios");
const cheerio = require("cheerio");

const scrapeArticle = function(cb) {
  axios.get("http://www.nytimes.com", (err, res, body) => {
    let $ = cheerio.load(body);
    let articles = [];

    $(".theme-summary").each(function(i, element) {
      let heading = $(this)
        .children(".story-heading")
        .text()
        .trim();
      let summary = $(this)
        .children(".summary")
        .text()
        .trim();

      if (heading && summary) {
        // Clean up headings and summaries
        let headOut = heading.replace(/(\r\n|\n|\r|t|s+)/gm, " ").trim();
        let sumOut = summary.replace(/(\r\n|\n|\r|t|s+)/gm, " ").trim();

        let addData = {
          headline: headOut,
          summary: sumOut
        };
        articles.push(addData);
      }
    });
    cb(articles);
  });
};

module.exports = scrapeArticle;
