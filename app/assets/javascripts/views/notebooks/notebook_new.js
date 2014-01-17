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
    console.log("submitted form");
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var notebook = new EvernoteClone.Models.Notebook(params["notebook"]);
    notebook.save(null, {
      success: function () {
        
        Backbone.history.navigate("#", { trigger: true })
      },
      error: function () {
        console.log("Failed to Save")
      }
    })
  }
  
})