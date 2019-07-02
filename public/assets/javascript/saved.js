$(document).ready(function() {
  // Getting a reference to the article container div
  const articleContainer = $(".article-container");
  // Adding event listeners
  $(document).on("click", ".btn.delete", handleArticleDelete);
  $(document).on("click", ".btn.notes", handleArticleNotes);
  $(document).on("click", ".btn.save", handleNoteSave);
  $(document).on("click", ".btn.note-delete", handleNoteDelete);
  $(".clear").on("click", handleArticleClear);

  function initPage() {
    // Empty the article container
    $.get("/api/headlines?saved=true").then(data => {
      articleContainer.empty();
      // If we have headlines, render them to the page
      if (data && data.length) {
        renderArticles(data);
      } else {
        // Otherwise render a message explaining we have no articles
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
    // This function takes in a single JSON object for an article/headline
    const card = $("<div class='card'>");
    const cardHeader = $("<div class='card-header'>").append(
      $("<h3>").append(
        $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
          .attr("href", article.url)
          .text(article.headline),
        $("<a class='btn btn-danger delete'>Delete From Saved</a>"),
        $("<a class='btn btn-info notes'>Article Notes</a>")
      )
    );

    const cardBody = $("<div class='card-body'>").text(article.summary);

    card.append(cardHeader, cardBody);

    // Attach the article's id to the jQuery element
    card.data("_id", article._id);
    // We return the constructed card jQuery element
    return card;
  }

  function renderEmpty() {
    // This function renders some HTML when we don't have articles to view
    const emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. Looks like we don't have any saved articles.</h4>",
        "</div>",
        "<div class='card'>",
        "<div class='card-header text-center'>",
        "<h3>Would You Like to Browse Available Articles?</h3>",
        "</div>",
        "<div class='card-body text-center'>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Appending this data to the page
    articleContainer.append(emptyAlert);
  }

  function renderNotesList(data) {
    // This function handles rendering note list items to the notes modal
    const notesToRender = [];
    let currentNote;
    if (!data.notes.length) {
      // If we have no notes, just display a message explaining this
      currentNote = $(
        "<li class='list-group-item'>No notes for this article yet.</li>"
      );
      notesToRender.push(currentNote);
    } else {
      // If we do have notes, loop through each one
      for (let i = 0; i < data.notes.length; i++) {
        // Constructs an li element to contain our noteText and a delete button
        currentNote = $("<li class='list-group-item note'>")
          .text(data.notes[i].noteText)
          .append($("<button class='btn btn-danger note-delete'>x</button>"));
        // Store the note id on the delete button for easy access when trying to delete
        currentNote.children("button").data("_id", data.notes[i]._id);
        // Adding our currentNote to the notesToRender array
        notesToRender.push(currentNote);
      }
    }
    // Now append the notesToRender to the note-container inside the note modal
    $(".note-container").append(notesToRender);
  }

  function handleArticleDelete() {
    // This function handles deleting articles/headlines
    const articleToDelete = $(this)
      .parents(".card")
      .data();

    // Remove card from page
    $(this)
      .parents(".card")
      .remove();
    // Using a delete method here just to be semantic since we are deleting an article/headline
    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(data => {
      // If this works out, run initPage again which will re-render our list of saved articles
      if (data.ok) {
        initPage();
      }
    });
  }
  function handleArticleNotes(event) {
    // This function handles opening the notes modal and displaying notes
    const currentArticle = $(this)
      .parents(".card")
      .data();
    // Grab any notes with this headline/article id
    $.get("/api/notes/" + currentArticle._id).then(data => {
      // Constructing our initial HTML to add to the notes modal
      const modalText = $("<div class='container-fluid text-center'>").append(
        $("<h4>").text("Notes For Article: " + currentArticle._id),
        $("<hr>"),
        $("<ul class='list-group note-container'>"),
        $("<textarea placeholder='New Note' rows='4' cols='60'>"),
        $("<button class='btn btn-success save'>Save Note</button>")
      );
      // Adding the formatted HTML to the note modal
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      const noteData = {
        _id: currentArticle._id,
        notes: data || []
      };
      // Adding some information about the article and article notes to the save button
      $(".btn.save").data("article", noteData);
      // renderNotesList will populate the actual note HTML inside of the modal
      renderNotesList(noteData);
    });
  }

  function handleNoteSave() {
    // This function handles what happens when a user tries to save a new note for an article
    let noteData;
    const newNote = $(".bootbox-body textarea")
      .val()
      .trim();
    if (newNote) {
      noteData = {
        _headlineId: $(this).data("article")._id,
        noteText: newNote
      };
      $.post("/api/notes", noteData).then(() => {
        // When complete, close the modal
        bootbox.hideAll();
      });
    }
  }

  function handleNoteDelete() {
    // This function handles the deletion of notes
    const noteToDelete = $(this).data("_id");
    // Perform an DELETE request to "/api/notes/" with the id of the note we're deleting as a parameter
    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(() => {
      // When finished, hide the modal
      bootbox.hideAll();
    });
  }

  function handleArticleClear() {
    $.get("api/clear").then(() => {
      articleContainer.empty();
      initPage();
    });
  }
});
