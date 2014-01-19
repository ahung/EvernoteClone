EvernoteClone.Views.NotesIndex = Backbone.View.extend({
  
  initialize: function (options) {
    this.$rightCol = options.$rightCol;
    this.listenTo(this.collection.notebook, "change:name", this.render);
    this.listenTo(this.collection, "add change:title remove reset", this.render);
  },
  
  events: {
    "click #delete-notebook": "deleteNotebook",
    "click .note-link": "showNote",
    "click #new-note": "newNote",
    "submit #edit-notebook": "editNotebook"
  },

  template: JST['notes/index'],
  
  render: function () {
    var renderedContent = this.template({
      notes: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  deleteNotebook: function (event) {
    var that = this;
    var id = $(event.currentTarget).data('id');
    var notebook = EvernoteClone.notebooks.get(id);
    notebook.destroy({
      success: function () {
        that._removeRightView();
        that.remove();
      }
    });
  },
  
  showNote: function (event) {
    var id = $(event.currentTarget).data('id');
    var note = this.collection.get(id);
    var showNote = new EvernoteClone.Views.ShowNote({ model: note });
    this._swapRightView(showNote);
  },
  
  newNote: function (event) {
    var newNote = new EvernoteClone.Views.NewNote({ 
      notebook: this.collection.notebook
    });
    this._swapRightView(newNote);
  },
  
  editNotebook: function(event) {
    event.preventDefault();
    var that = this;
    var id = $(event.currentTarget).data('id');
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var notebook = EvernoteClone.notebooks.get(id);
    notebook.save(params['notebook'], {
      success: function () {
        EvernoteClone.notebooks.sort();
      }
    });
  },
  
  _swapRightView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rightCol.html(view.render().$el);
  },
  
  _removeRightView: function() {
    this._currentView && this._currentView.remove();
  }

});
