EvernoteClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    EvernoteClone.notebooks = new EvernoteClone.Collections.Notebooks();
    EvernoteClone.tags = new EvernoteClone.Collections.Tags();
    EvernoteClone.notebooks.fetch();
    this.$leftCol = options.$leftCol;
    this.$midCol = options.$midCol;
    this.$rightCol = options.$rightCol;
  },
  
  routes: {
   "": "mainIndex"
  },
  
  mainIndex: function() {
    var that = this;
    var notebooksIndex = new EvernoteClone.Views.NotebooksIndex({
      collection: EvernoteClone.notebooks,
      $midCol: this.$midCol,
      $rightCol: this.$rightCol
    });
    EvernoteClone.tags.fetch({
      success: function () {
        var tagsIndex = new EvernoteClone.Views.TagsIndex({
          collection: EvernoteClone.tags,
          $midCol: that.$midCol,
          $rightCol: that.$rightCol
        });
        that._swapLeftView(notebooksIndex, tagsIndex);
        $(".drop-note").droppable({
          accept: ".drag-note",
          activeClass: "ui-state-highlight",
          drop: function (event, ui) {
            console.log(event.target);
            console.log(ui.draggable);
            console.log("dropped the note on a notebook");
          }
        });
      }
    });
  },

  _swapLeftView: function(notebookView, tagView) {
    this.$leftCol._currentNotebookView && 
      this.$leftCol._currentNotebookView.remove();
    this.$leftCol._currentTagView && this.$leftCol._currentTagView.remove();
    this.$leftCol._currentNotebookView = notebookView;
    this.$leftCol._currentTagView = tagView
    $('#notebook-column').html(notebookView.render().$el);
    $('#tag-column').html(tagView.render().$el);
  }
});
