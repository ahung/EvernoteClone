window.EvernoteClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new EvernoteClone.Routers.Router();
    Backbone.history.start();
  };
};

$(document).ready(function(){
  EvernoteClone.initialize();
});
