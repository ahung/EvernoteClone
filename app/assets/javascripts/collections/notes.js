EvernoteClone.Collections.Notes = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.notebookId = options.notebookId;
  },
  
  url: function () {
    return "/api/notebooks/" + this.notebookId + "/notes"
  },

  model: EvernoteClone.Models.Note,
  
  comparator: function(note) {
    return note.get("title");
  }

});
