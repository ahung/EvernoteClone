EvernoteClone.Collections.Notes = Backbone.Collection.extend({
  initialize: function (models, options) {
    if (options) {
      this.notebook = options.notebook;
    }
  },
  
  url: function () {
    return "/api/notebooks/" + this.notebook.id + "/notes"
  },

  model: EvernoteClone.Models.Note,
  
  comparator: function(note) {
    return note.get("title");
  }
});
