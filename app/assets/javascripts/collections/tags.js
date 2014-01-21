EvernoteClone.Collections.Tags = Backbone.Collection.extend({
  model: EvernoteClone.Models.Tag,
  
  url: "/api/tags",
  
  comparator: function (tag) {
    return tag.get('name');
  }// ,
//   
//   toJSON: function () {
//     var data = _.clone(this.attributes);
//     console.log(this.attributes)
//     data.tags = this.get('tags').toJSON();
//     return data;
//   }
//   
})