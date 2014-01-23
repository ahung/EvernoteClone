EvernoteClone.Views.ShowTag = Backbone.View.extend({
  initialize: function (options) {
    this.$rightCol = options.$rightCol;
    this.listenTo(this.model, "change:name", this.render)
    this.listenTo(this.collection, "add change:title sort reset remove", 
      this.render);
  },
  
  events: {
    "click .note-link": "showNote"
  },
  
  template: JST['tags/show'],
  
  render: function () {
    var activeId = $(this.$el.find('.active')).data('id')
    var renderedContent = this.template({
      tag: this.model
    });
    this.$el.html(renderedContent);
    if (activeId) {
      $('a[data-id=' + activeId + ']').addClass('active');
    }
    return this;
  },
  
  showNote: function (event) {
    var that = this;
    var id = $(event.currentTarget).data('id');
    var note = this.collection.get(id);
    note.fetch();
    EvernoteClone.noteTags = new EvernoteClone.Collections.TaggedNotes({
      note: note
    });
    EvernoteClone.noteTags.fetch({
      success: function () {
        EvernoteClone.currentTags = note.get('tags');
        var showNote = new EvernoteClone.Views.ShowNote({ 
          model: note,
          collection: EvernoteClone.noteTags,
          tag: that.model
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
