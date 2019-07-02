/* global bootbox */
$(document).ready(function() {
  // Adding event listeners
  const articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);
  $(".clear").on("click", handleArticleClear);

  function initPage() {
    // Run an AJAX request for any unsaved headlines
    $.get("/api/headlines?saved=false").then(data => {
      articleContainer.empty();
      // If headlines exist, render them to the page
      if (data && data.length) {
        renderArticles(data);
      } else {
        // Else render a message explaining we have no articles
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    // This function handles appending HTML containing our article data to the page
    const articleCards = [];
    // We pass each article JSON object to the createCard function
    for (let i = 0; i < articles.length; i++) {
      articleCards.push(createCard(articles[i]));
    }
    articleContainer.append(articleCards);
  }

  function createCard(article) {
    // Take in a single JSON object for an article/headline
    const card = $("<div class='card'>");
    const cardHeader = $("<div class='card-header'>").append(
      $("<h3>").append(
        $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
          .attr("href", article.url)
          .text(article.headline),
        $("<a class='btn btn-success save'>Save Article</a>")
      )
    );

    const cardBody = $("<div class='card-body'>").text(article.summary);

    card.append(cardHeader, cardBody);
    // Attach the article's id to the jQuery element
    card.data("_id", article._id);
    // Return the constructed card jQuery element
    return card;
  }

  function renderEmpty() {
    // Render some HTML to the page when there are no articles to view
    const emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>Sorry, we don't have any new articles.</h4>",
        "</div>",
        "<div class='card'>",
        "<div class='card-header text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='card-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Appending this data to the page
    articleContainer.append(emptyAlert);
  }

  function handleArticleSave() {
    // This function is triggered when the user wants to save an article
    const articleToSave = $(this)
      .parents(".card")
      .data();

    // Remove card from page
    $(this)
      .parents(".card")
      .remove();

    articleToSave.saved = true;

    $.ajax({
      method: "PUT",
      url: "/api/headlines/" + articleToSave._id,
      data: articleToSave
    }).then(data => {
      // If the data was saved successfully
      if (data.saved) {
        // Run the initPage function again.
        initPage();
      }
    });
  }

  function handleArticleScrape() {
    // This function handles the user clicking "scrape new articles" buttons
    $.get("/api/fetch").then(data => {
      initPage();
      bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
    });
  }

  function handleArticleClear() {
    $.get("api/clear").then(() => {
      articleContainer.empty();
      initPage();
    });
  }
});
