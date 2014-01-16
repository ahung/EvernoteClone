EvernoteClone.Collections.Notebooks = Backbone.Collection.extend({
  // initialize: function (models, options) {
  //   this.user = options.user;
  // },

  model: EvernoteClone.Models.Notebook,
  
  url: "/api/notebooks" 
  // function () {
//     return "/api/users/" + this.user.id + "/notebooks"
//   }

});
