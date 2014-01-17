EvernoteClone.Views.NotesIndex = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.collection, "add change:title remove reset", this.render);
  },

  template: JST['notes/index'],
  
  render: function () {
    var renderedContent = this.template({
      notes: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }

});
