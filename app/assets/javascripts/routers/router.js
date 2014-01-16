EvernoteClone.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    
  },
  
  routes: {
   "": "notebooksIndex",
   "notebooks/new": "notebookNew",
   "notebooks/:id": "notebookShow",
   "notebooks/:id/edit": "notebookEdit"
  },
  
  notebooksIndex: function() {
    var that = this;
    var notebooks = new EvernoteClone.Collections.Notebooks();
    notebooks.fetch({
      success: function() {
        var notebooksIndex = new EvernoteClone.Views.NotebooksIndex({
          collection: notebooks
        });
        that._swapView(notebooksIndex);
        $("#left-column").html(notebooksIndex.render().$el);
      }
    });
  },
  
  notebookNew: function() {
    
  },
  
  notebookShow: function(id) {
    
  },
  
  notebookEdit: function(id) {
    
  },
  
  _getNotebook: function(id, callback) {
    
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
  }
});
