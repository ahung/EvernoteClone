EvernoteClone.Views.NotebooksIndex = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.collection, "add change:name remove reset", this.render);
  },

  template: JST['notebooks/index'],
  
  render: function() {
    var renderedContent = this.template({
      notebooks: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }

});
