EvernoteClone.Views.NotesIndex = Backbone.View.extend({
  initialize: function (options) {
    this.$rightCol = options.$rightCol;
    this.listenTo(this.collection.notebook, "change:name", this.render);
    this.listenTo(this.collection, "add change:title sort remove reset", 
      this.render);
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
    $(this.$el.find(".drag-note")).draggable({
      revert: "invalid"
    });
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
    var that = this;
    $(".note-link").removeClass('active');
    $(event.currentTarget).addClass('active');
    var id = $(event.currentTarget).data('id');
    var note = this.collection.get(id);
    this.renderNote(note);
  },
  
  renderNote: function (note) {
    var that = this;
    note.fetch();
    EvernoteClone.noteTags = new EvernoteClone.Collections.TaggedNotes({
      note: note
    });
    EvernoteClone.noteTags.fetch({
      success: function () {
        EvernoteClone.currentTags = note.get('tags');
        var showNote = new EvernoteClone.Views.ShowNote({ 
          model: note,
          collection: EvernoteClone.noteTags
        });
        that._swapRightView(showNote);
      }
    });
  },
  
  newNote: function (event) {
    var that = this;
    var newNote = new EvernoteClone.Models.Note({
      title: "Untitled",
      notebook_id: this.collection.notebook.id
    });
    newNote.save(null, {
      success: function () {
        EvernoteClone.notes.add(newNote);
        that.renderNote(newNote);
      }
    });
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
    EvernoteClone._currentRightView && EvernoteClone._currentRightView.remove();
    EvernoteClone._currentRightView = view;
    this.$rightCol.html(view.render().$el);
  },
  
  _removeRightView: function() {
    EvernoteClone._currentRightView && EvernoteClone._currentRightView.remove();
  }
});
