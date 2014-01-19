EvernoteClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    EvernoteClone.notebooks = new EvernoteClone.Collections.Notebooks();
    EvernoteClone.notebooks.fetch();
    this.$leftCol = options.$leftCol;
    this.$midCol = options.$midCol;
    this.$rightCol = options.$rightCol;
  },
  
  routes: {
   "": "notebooksIndex"
  },
  
  notebooksIndex: function() {
    var notebooksIndex = new EvernoteClone.Views.NotebooksIndex({
      collection: EvernoteClone.notebooks,
      $midCol: this.$midCol,
      $rightCol: this.$rightCol
    })
    this._swapLeftView(notebooksIndex);
  },

  _swapLeftView: function(view) {
    this.$leftCol._currentView && this.$leftCol._currentView.remove();
    this.$leftCol._currentView = view;
    this.$leftCol.html(view.render().$el);
  }
});
