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
    var notebookId = this.model.get("notebook_id");
    this.model.destroy({
      success: function (model, response, options) {
        Backbone.history.navigate("#/notebooks/" + notebookId + "/notes", 
          {trigger: true});
      }
    });
  }
  
})