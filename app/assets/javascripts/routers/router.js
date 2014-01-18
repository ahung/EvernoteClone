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
  },
  
  notebookNew: function() {
    var newNotebook = new EvernoteClone.Views.NewNotebook();
    this._swapMidView(newNotebook);
    this.$rightCol._currentView && this.$rightCol._currentView.remove();
  },
  
  notesIndex: function(id) {
    var that = this;
    var notebook = EvernoteClone.notebooks.get(id);
    EvernoteClone.notes = new EvernoteClone.Collections.Notes([], 
      {notebook: notebook});
    EvernoteClone.notes.fetch({
      success: function () {
        var notesIndex = new EvernoteClone.Views.NotesIndex({ 
          collection: EvernoteClone.notes
        });
        that._swapMidView(notesIndex);
        that.$rightCol._currentView && that.$rightCol._currentView.remove();
      }
    });
  },
  
  notebookEdit: function(id) {
    //edit name of notebook with this id
    var that = this;
    this._getNotebook(id, function(notebook) {
      var editNotebook = new EvernoteClone.Views.EditNotebook({
        model: notebook
      });
      that._swapMidView(editNotebook);
      that.$rightCol._currentView && that.$rightCol._currentView.remove();
    });
  },
  
  noteNew: function(id) {
    var notebook = EvernoteClone.notebooks.get(id);
    var newNote = new EvernoteClone.Views.NewNote({ notebook: notebook});
    this._swapRightView(newNote);
  },
  
  noteShow: function(id) {
    // console.log(this._fullView());
    var that = this;
    this._getNote(id, function (note) {
      var showNote = new EvernoteClone.Views.ShowNote({model: note});
      that._swapRightView(showNote);
    });
  },
  
  _getNotebook: function (id, callback) {
    var notebook = EvernoteClone.notebooks.get(id)
    if (notebook) {
      callback(notebook);
    } else {
      notebook = new EvernoteClone.Models.Notebook({ id: id });
      notebook.collection = EvernoteClone.notebooks;
      notebook.fetch({
        success: function () {
          EvernoteClone.notebooks.add(notebook);
          callback(notebook);
        }
      });
    }
  },
  
  _getNote: function(id, callback) {
    var note = EvernoteClone.notes.get(id);
    if (note) {
      callback(note);
    } else {
      note = new EvernoteClone.Models.Note({ id: id })
      note.collection = EvernoteClone.notes
      note.fetch({
        success: function () {
          EvernoteClone.notes.add(note);
          callback(note);
        }
      });
    }
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
//     this.$rootEl.html(this.$leftCol);
//     this.$rootEl.append(this.$midCol).append(this.$rightCol);
//   }
});
