EvernoteClone.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    
  },
  
  routes: {
   "": "index",
   "notebooks/new": "new",
   "notebooks/:id": "show",
   "notebooks/:id/edit": "edit"
   
  },
  
  index: function() {
    // var notebooksIndex = new EvernoteClone.Views.NotebooksIndex({
    //   collection: 
    });
  },
  
  new: function() {
    
  },
  
  show: function(id) {
    
  },
  
  edit: function(id) {
    
  },
  
  _getPost: function(id, callback) {
    
  },
  
  _swapView: function(view) {
    
  }
});
