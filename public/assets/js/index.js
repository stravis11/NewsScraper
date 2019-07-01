$(document).ready(function() {
  const artclContr = $(".article-container");
  $(".btn.save").click(procArticleSave);
  $(".scrape-new").click(procArticleScrape);

  startPage();

  function startPage() {
    artclContr.empty();
    $.get("/api/headLines?saved=false").then(data => {
      if (data && data.length) {
        showArticles(data);
      } else {
        emptyPage();
      }
    });
  }

  function showArticles(articles) {
    const articlePanels = [];
    for (let i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
  }

  function createPanel(article) {
    let panel = $(
      [
        "<div class='panel panel-defaul'>",
        "<div class='panel-heading'>",
        "<h3>",
        ariticle.headline,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );
    panel.data("_id", aritcle._id);
    return panel;
  }

  function emptyPage() {
    let emptyAlert = $(
      [
        "<div class='alert alert-warning text-cneter'>",
        "<h4>Sorry, we don't have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>Try something else</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Scape New Articles</a></h4>",
        "<h4><a href='/saved'>View Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
  }

  function procArticleSave() {
    let articleToSave = $(this)
      .parents(".panel")
      .data();
    articleToSave.saved = true;
    $.ajax({
      method: "PATCH",
      url: "/api/headlines",
      data: articleToSave
    }).then(data => {
      if (data.ok) {
        startPage;
      }
    });
  }

  function procArticleScrape() {
    $.get("/api/fetch").then(data => {
      startPage();
      bootbox.alert(
        "<h3 class='text-center m-top-80'>" + data.message + "<h3>"
      );
    });
  }
});
