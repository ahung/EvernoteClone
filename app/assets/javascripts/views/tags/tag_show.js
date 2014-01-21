EvernoteClone.Views.ShowTag = Backbone.View.extend({
  initialize: function (options) {
    this.$rightCol = options.$rightCol;
  },
  
  events: {
    "click .note-link": "showNote"
  },
  
  template: JST['tags/show'],
  
  render: function () {
    var renderedContent = this.template({
      tag: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  showNote: function (event) {
    var that = this;
    var id = $(event.currentTarget).data('id');
    var note = this.collection.get(id);
    EvernoteClone.noteTags = new EvernoteClone.Collections.TaggedNotes({
      note: note
    });
    EvernoteClone.noteTags.fetch({
      success: function () {
        var showNote = new EvernoteClone.Views.ShowNote({ 
          model: note,
          collection: EvernoteClone.noteTags
        });
        that._swapRightView(showNote);
      }
    });
  },
  
  _swapRightView: function (view) {
    EvernoteClone._currentRightView && EvernoteClone._currentRightView.remove();
    EvernoteClone._currentRightView = view;
    this.$rightCol.html(view.render().$el);
  }
  
})
