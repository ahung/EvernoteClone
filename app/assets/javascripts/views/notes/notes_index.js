EvernoteClone.Views.NotesIndex = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.collection, "add change:title remove reset", this.render);
  },
  
  events: {
    "click #delete-notebook": "deleteNotebook"
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
    var id = $(event.currentTarget).data('id');
    var notebook = EvernoteClone.notebooks.get(id);
    notebook.destroy({
      success: function () {
        Backbone.history.navigate("#", { trigger: true })
      }
    });
  }

});
