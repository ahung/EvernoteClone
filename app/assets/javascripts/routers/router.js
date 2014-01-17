EvernoteClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    EvernoteClone.notebooks = new EvernoteClone.Collections.Notebooks();
    EvernoteClone.notebooks.fetch();
    this.$leftCol = options.$leftCol;
    this.$midCol = options.$midCol;
    this.$rightCol = options.$rightCol;
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
   "": "notebooksIndex",
   "notebooks/new": "notebookNew",
   "notebooks/:id/notes": "notesIndex",
   "notebooks/:id/edit": "notebookEdit",
   "notebooks/:id/notes/new": "noteNew",
   "notes/:id": "noteShow"
  },
  
  notebooksIndex: function() {
    var notebooksIndex = new EvernoteClone.Views.NotebooksIndex({
      collection: EvernoteClone.notebooks
    })
    this._swapLeftView(notebooksIndex);
    this.$midCol._currentView && this.$midCol._currentView.remove();
    // var notebooks = new EvernoteClone.Collections.Notebooks();
 //    notebooks.fetch({
 //      success: function() {
 //        var notebooksIndex = new EvernoteClone.Views.NotebooksIndex({
 //          collection: notebooks
 //        });
 //        that._swapLeftView(notebooksIndex);
 //      }
 //    });
  },
  
  notebookNew: function() {
    var newNotebook = new EvernoteClone.Views.NewNotebook();
    this._swapMidView(newNotebook);
    this.$rightCol._currentView && this.$rightCol._currentView.remove();
  },
  
  notesIndex: function(id) {
    var that = this;
    var notebook = EvernoteClone.notebooks.get(id);
    var notes = new EvernoteClone.Collections.Notes([], {notebook: notebook});
    notes.fetch({
      success: function () {
        var notesIndex = new EvernoteClone.Views.NotesIndex({ 
          collection: notes
        });
        that._swapMidView(notesIndex);
        that.$rightCol._currentView && that.$rightCol._currentView.remove();
      }
    });
  },
  
  notebookEdit: function(id) {
    //edit name of notebook with this id
  },
  
  noteNew: function(id) {
    var notebook = EvernoteClone.notebooks.get(id);
    var newNote = new EvernoteClone.Views.NewNote({ notebook: notebook});
    this._swapRightView(newNote);
  },
  
  noteShow: function(id) {
    var that = this;
    this._getNote(id, function (note) {
      var showNote = new EvernoteClone.Views.ShowNote({model: note});
      that._swapRightView(showNote);
    });
  },
  
  _getNote: function(id, callback) {
    var that = this; 
    var note = new EvernoteClone.Models.Note({id: id});
    note.fetch({
      success: function () {
        callback(note);
      }
    });
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
  }// ,
//   
//   _fullView: function () {
//     this.$rootEl.append(this.$leftCol).append(this.$midCol).append(this.$rightCol)
//   }
});
