EvernoteClone.Views.NewNote = Backbone.View.extend({
  
  initialize: function (options) {
    this.notebookId = options.notebookId;
  },
  
  events: {
    "submit #create-note": "newNote"
  },
  
  template: JST['notes/new'],
  
  render: function() {
    var renderedContent = this.template({notebookId: this.notebookId})
    this.$el.html(renderedContent);
    return this;
  },
  
  newNote: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var note = new EvernoteClone.Models.Note(params["note"]);
    note.save(null, {
      success: function () {

        Backbone.history.navigate("#/notebooks/" + note.get("notebook_id") 
        + "/notes",
        { trigger: true })
      },
      error: function () {
        
      }
    });
  }
  
})