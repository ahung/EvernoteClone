EvernoteClone.Collections.Notebooks = Backbone.Collection.extend({

  model: EvernoteClone.Models.Notebook,
  
  url: "/api/notebooks",
  
  comparator: function (notebook) {
    return notebook.get("name");
  } 

});
