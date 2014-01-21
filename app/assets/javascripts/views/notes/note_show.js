EvernoteClone.Views.ShowNote = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model.get('tags'), "all", this.render)
  },
  
  events: {
    "click #delete-note": "deleteNote",
    "click .note-title": "editNoteTitle",
    "click .note-body": "editNoteBody",
    "blur input": "updateNoteTitle",
    "blur textarea": "updateNoteBody",
    "click .add-tag": "addTag",
    "click .remove-tag": "removeTag"
  },
  
  template: JST['notes/show'],
  
  render: function () {
    var renderedContent = this.template({
      note: this.model,
      tags: EvernoteClone.tags
    });
    console.log(this.model.get('tags'))
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
  
  editNoteTitle: function (event) {
    var id = $(event.currentTarget).attr('id');
    var $input = $("<input type='text' class='form-control'>");
    $input.val($(event.currentTarget).text());
    $input.attr("data-field", id);
    $(event.currentTarget).replaceWith($input);
    $input.focus();
  },
  
  updateNoteTitle: function (event) {
    var that = this;
    var attrName = $(event.currentTarget).data("field");
    var value = $(event.currentTarget).val();
    this.model.set(attrName, value);
    this.model.save(null, {
      success: function () {
        that.collection.sort();
        that.render();
      }
    });
  },
  
  editNoteBody: function (event) {
    var id = $(event.currentTarget).attr('id');
    var $textarea = $("<textarea class='form-control' rows='15'>");
    $textarea.val($(event.currentTarget).text());
    $textarea.attr("data-field", id);
    $(event.currentTarget).replaceWith($textarea);
    $textarea.focus();
  },
  
  updateNoteBody: function (event) {
    var that = this;
    var attrName = $(event.currentTarget).data("field");
    var value = $(event.currentTarget).val();
    this.model.set(attrName, value);
    this.model.save(null, {
      success: function () {
        that.render();
      }
    });
  },
  
  addTag: function (event) {
    event.preventDefault();
    var that = this;
    var tagId = $(event.currentTarget).data("id");
    var tag = EvernoteClone.tags.get(tagId);
    console.log(tag)
    var taggedNote = new EvernoteClone.Models.TaggedNote({
      tag_id: tagId,
      note_id: this.model.id
    });
    console.log(this.model.tags)
    taggedNote.save({
      success: function () {
        that.model.get('tags').create({id: tagId})
      }
    });
  },
  
  removeTag: function (event) {
    console.log("removing tag");
    var tagId = $(event.currentTarget).data("id");
    var taggedNote = new EvernoteClone.Models.TaggedNote({
      tag_id: tagId,
      note_id: this.model.id
    });
    console.log(taggedNote);
    taggedNote.fetch({
      success: function () {
        console.log(taggedNote);
        taggedNote.destroy();
      }
    });
    
  }
  
})