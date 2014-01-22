EvernoteClone.Views.NotebooksIndex = Backbone.View.extend({
  initialize: function (options) {
    this.$midCol = options.$midCol;
    this.$rightCol = options.$rightCol;
    this.listenTo(this.collection, "add change:name sort remove reset", 
      this.render);
  },
  
  events: {
    "click .notebook-link": "renderNotes",
    "submit #create-notebook": "newNotebook"
  },

  template: JST['notebooks/index'],
  
  render: function() {
    var renderedContent = this.template({
      notebooks: this.collection,
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  renderNotes: function (event) {
    var that = this;
    $(".notebook-link").removeClass('active');
    $(".tag-link").removeClass('active');
    $(event.currentTarget).addClass('active');
    var id = $(event.currentTarget).data('id');
    var notebook = this.collection.get(id);
    EvernoteClone.notes = new EvernoteClone.Collections.Notes([], {
      notebook: notebook
    });
    EvernoteClone.notes.fetch({
      success: function () {
        var notesIndex = new EvernoteClone.Views.NotesIndex({
          collection: EvernoteClone.notes,
          $rightCol: that.$rightCol
        });
        that._swapMidView(notesIndex);
        that._removeRightView();
        $(".drag-note").draggable({
          revert: true,
          drag: function() {
            console.log("dragging");
          },
          stop: function() {
            console.log("dropped");
          }
        });
      }
    });
  },
  
  newNotebook: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var notebook = new EvernoteClone.Models.Notebook(params["notebook"]);
    if (notebook.isValid()) {
      notebook.save(null, {
        success: function () {
          EvernoteClone.notebooks.add(notebook);
        }
      });
    } else {
      $('#notebook-error').text(notebook.validationError);
    }
  },
  
  _swapMidView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$midCol.html(view.render().$el);
  },
  
  _removeRightView: function () {
    EvernoteClone._currentRightView && EvernoteClone._currentRightView.remove();
  }
});
