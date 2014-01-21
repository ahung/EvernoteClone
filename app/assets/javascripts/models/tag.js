EvernoteClone.Models.Tag = Backbone.Model.extend({
  parse: function (data) {
    var notes = data.notes;
    data.notes = new EvernoteClone.Collections.Notes(notes);
    return data;
  },
    
  validate: function (attributes) {
    if (!attributes || !attributes.name || attributes.name === '') {
      return "Tag Name Can't Be Blank"
    }
  },
  
  urlRoot: "/api/tags"// ,
//   
//   toJSON: function () {
//     var json = Backbone.Model.prototype.toJSON.call(this);
//     console.log(json);
//     delete json.created_at;
//     delete json.updated_at;
//     return json;
//   }
//   
})