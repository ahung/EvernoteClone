EvernoteClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$leftCol = options.$leftCol;
    this.$midCol = options.$midCol;
    this.$rightCol = options.$rightCol;
  },
  
  routes: {
   "": "notebooksIndex",
   "notebooks/new": "notebookNew",
   "notebooks/:id/notes": "notesIndex",
   "notebooks/:id/edit": "notebookEdit",
   "notebooks/:id/notes/new": "noteNew"
  },
  
  notebooksIndex: function() {
    var that = this;
    var notebooks = new EvernoteClone.Collections.Notebooks();
    notebooks.fetch({
      success: function() {
        var notebooksIndex = new EvernoteClone.Views.NotebooksIndex({
          collection: notebooks
        });
        that._swapLeftView(notebooksIndex);
      }
    });
  },
  
  notebookNew: function() {
    var newNotebook = new EvernoteClone.Views.NewNotebook();
    this._swapMidView(newNotebook);
  },
  
  notesIndex: function(id) {
    var that = this;
    var notes = new EvernoteClone.Collections.Notes([], {notebookId: id});
    notes.fetch({
      success: function () {
        var notesIndex = new EvernoteClone.Views.NotesIndex({ 
          collection: notes
        });
        that._swapMidView(notesIndex);
      }
    });
  },
  
  notebookEdit: function(id) {
    //edit name of notebook with this id
  },
  
  noteNew: function(id) {
    var newNote = new EvernoteClone.Views.NewNote({ notebookId: id});
    this._swapRightView(newNote);
  },
  
  _getNotebook: function(id, callback) {
    
  },
  
  _swapLeftView: function(view) {
    this.$leftCol._currentView && this.$leftCol._currentView.remove();
    this.$leftCol._currentView = view;
    this.$leftCol.html(view.render().$el);
  },
  
  _swapMidView: function(view) {
    this.$midCol._currentView && this.$midCol._currentView.remove();
    this.$midCol._currentView = view;
    this.$midCol.html(view.render().$el);
  },
  
  _swapRightView: function(view) {
    this.$rightCol._currentView && this.$rightCol._currentView.remove();
    this.$rightCol._currentView = view;
    this.$rightCol.html(view.render().$el);
  }
});
