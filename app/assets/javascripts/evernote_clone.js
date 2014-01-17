window.EvernoteClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new EvernoteClone.Routers.Router({
      $leftCol: $("#left-column"),
      $midCol: $("#middle-column"),
      $rightCol: $("#right-column"),
      $rootEl: $("#note-view")
    });
    Backbone.history.start();
  }
};

$(EvernoteClone.initialize);

