EvernoteClone.Views.ShowNote = Backbone.View.extend({
  events: {
    "click #delete-note": "deleteNote"
  },
  
  template: JST['notes/show'],
  
  render: function () {
    var renderedContent = this.template({
      note: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  deleteNote: function(event) {
    var that = this;
    this.model.destroy({
      success: function () {
        that.remove();
      }
    });
  }
  
})