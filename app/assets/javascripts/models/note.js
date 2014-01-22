EvernoteClone.Models.Note = Backbone.Model.extend({
  validate: function (attributes) {
    if (!attributes || !attributes.title || attributes.title === ''){
      return "Title Can't Be Blank";
    }
  },
  
  urlRoot: "/api/notes"
});
