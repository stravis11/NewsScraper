module.exports = function(router) {
  // Render homepage
  router.get("/", (req, res) => {
    res.render("home");
  });
  // Render saved handlebars
  router.get("/saved", (req, res) => {
    res.render("saved");
  });
};
