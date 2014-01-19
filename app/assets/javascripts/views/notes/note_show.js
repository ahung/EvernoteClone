EvernoteClone.Views.ShowNote = Backbone.View.extend({
  events: {
    "click #delete-note": "deleteNote",
    "click .note": "editNote",
    "blur input": "updateNote"
  },
  
  template: JST['notes/show'],
  
  render: function () {
    var renderedContent = this.template({
      note: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  deleteNote: function (event) {
    var that = this;
    this.model.destroy({
      success: function () {
        that.remove();
      }
    });
  },
  
  editNote: function (event) {
    var id = $(event.currentTarget).attr('id');
    var $input = $("<input type='text'>");
    $input.val($(event.currentTarget).text());
    $input.attr("data-field", id);
    $(event.currentTarget).replaceWith($input);
    $input.focus();
  },
  
  updateNote: function (event) {
    var that = this;
    var attrName = $(event.currentTarget).data("field");
    var value = $(event.currentTarget).val();
    this.model.set(attrName, value);
    this.model.save(null, {
      success: function () {
        that.render();
      }
    });
  }
  
})