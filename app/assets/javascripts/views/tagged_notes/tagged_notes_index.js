EvernoteClone.Views.TaggedNotesIndex = Backbone.View.extend({
  initialize: function (options) {
    this.$rightCol = options.$rightCol;
    this.listenTo(this.collection.tag, "change:name", this.render);
    this.listenTo(this.collection, "add change:title sort remove reset", 
      this.render);
  },
  
  events: {
    "click .note-link": "showNote"
  },
  
  template: JST['tagged_notes/index'],
  
  render: function () {
    var renderedContent = this.template({
      taggedNotes: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  showNote: function (event) {
    var id = $(event.currentTarget).data('id');
    var taggedNote = this.collection.get(id);
    var showNote = new EvernoteClone.Views.ShowNote({ 
      model: taggedNote,
      collection: this.collection
     });
    this._swapRightView(showNote);
  },
  
  _swapRightView: function (view) {
    EvernoteClone._currentRightView && EvernoteClone._currentRightView.remove();
    EvernoteClone._currentRightView = view;
    this.$rightCol.html(view.render().$el);
  }
  
})