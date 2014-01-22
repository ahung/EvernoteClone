EvernoteClone.Models.Note = Backbone.Model.extend({
  parse: function (data) {
    var tags = data.tags;
    data.tags = new EvernoteClone.Collections.Tags(tags);
    return data;
  },
  
  validate: function (attributes) {
    if (!attributes || !attributes.title || attributes.title === ''){
      return "Title Can't Be Blank";
    }
  },
  
  urlRoot: "/api/notes"
});
