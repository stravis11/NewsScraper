// Scrape script

// Axios & Cheerio
const axios = require("axios");
const cheerio = require("cheerio");

// Scrape Webesite Function
const scrape = function() {
  return axios.get("http://www.nytimes.com").then(res => {
    const $ = cheerio.load(res.data);
    console.log("Scraping News");

    // Article Info Array
    const articles = [];

    // Find & looop through each article element
    // $("div.css-1ee8y2t").each(function(i, element)
    $("div.css-1qiat4j").each(function(i, element) {
      // Grab Headline Text From Story Heading Class
      const head = $(this)
        .find("h2")
        .text()
        .trim();

      // Grab Article Link
      const url = $(this)
        .find("a")
        .attr("href");

      // Grab inner text from summary class
      const sum = $(this)
        .find("p")
        .text()
        .trim();

      if (head && sum && url) {
        let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize and Push To Articles Array

        const dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.nytimes.com" + url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export
module.exports = scrape;
