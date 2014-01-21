EvernoteClone.Collections.Tags = Backbone.Collection.extend({
  model: EvernoteClone.Models.Tag,
  
  url: "/api/tags",
  
  comparator: function (tag) {
    return tag.get('name');
  }
})