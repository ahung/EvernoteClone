EvernoteClone.Views.EditNotebook = Backbone.View.extend({
  events: {
    "submit #edit-notebook": "editNotebook"
  },
  
  template: JST['notebooks/edit'],
  
  render: function () {
    var renderedContent = this.template({ notebook: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  editNotebook: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var notebook = EvernoteClone.notebooks.get(id);
    notebook.save(params['notebook'], {
      success: function () {
        EvernoteClone.notebooks.sort();
        Backbone.history.navigate("#", { trigger: true });
      }
    });
  }
  
})