EvernoteClone.Models.Notebook = Backbone.Model.extend({
  validate: function (attributes) {
    if (!attributes || !attributes.name || attributes.name ==='') {
      return "Notebook Name Can't Be Blank";
    }
  },
  
  urlRoot: "/api/notebooks"
  
});
