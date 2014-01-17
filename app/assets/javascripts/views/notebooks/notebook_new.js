EvernoteClone.Views.NewNotebook = Backbone.View.extend({
  
  events: {
    "submit #create-notebook": "newNotebook"
  },
  
  template: JST['notebooks/new'],
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
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
          Backbone.history.navigate("#", { trigger: true })
        }
      });
    } else {
      //do something with validation error message here
      console.log(notebook.validationError);
    }
  }
  
})