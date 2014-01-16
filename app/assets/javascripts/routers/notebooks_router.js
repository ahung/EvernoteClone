EvernoteClone.Routers.Router = Backbone.Router.extend({
  routes: {
   "": "index" 
  },
  
  index: function() {
    var test = $("<p>got here</p>");
    $("#right-column").html(test);
  }
});
