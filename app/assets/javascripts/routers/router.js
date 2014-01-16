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
    // var notebooksIndex = new EvernoteClone.Views.NotebooksIndex({
    //   collection: 
    // });
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
    
  }
});
