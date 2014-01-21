EvernoteClone.Collections.TaggedNotes = Backbone.Collection.extend({
  initialize: function (options) {
    this.tag = options.tag
  },
  
  model: EvernoteClone.Models.Note,
  
  url: function () {
    return "/api/tags/" + this.tag.id + "/tagged_notes"
  },
  
  comparator: function (taggedNote) {
    return taggedNote.get("title");
  }
  
})