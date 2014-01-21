EvernoteClone.Collections.TaggedNotes = Backbone.Collection.extend({
  initialize: function (options) {
    this.note = options.note;
  },
  
  model: EvernoteClone.Models.TaggedNote,
  
  url: function () {
    return "/api/notes/" + this.note.id + "/tagged_notes"
  },
  
  comparator: function (taggedNote) {
    return taggedNote.get("title");
  }
  
})