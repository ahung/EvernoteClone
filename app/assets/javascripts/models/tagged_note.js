EvernoteClone.Models.TaggedNote = Backbone.Model.extend({
  // parse: function (data) {
  //   var tag = data.tag;
  //   data.tag = new EvernoteClone.Models.Tag(tag);
  //   return data;
  // },
  
  urlRoot: "/api/tagged_notes"
})