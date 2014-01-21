EvernoteClone.Views.TagsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.$midCol = options.$midCol;
    this.$rightCol = options.$rightCol;
    this.listenTo(this.collection, "add change:name sort remove reset", 
      this.render);
  },
  
  events: {
    "submit #create-tag": "newTag",
    "click .tag-link": "renderNotes",
    "submit #rename-tag": "renameTag",
    "click .delete-tag": "deleteTag"
  },
  
  template: JST['tags/index'],
  
  render: function () {
    var renderedContent = this.template({
      tags: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  newTag: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var tag = new EvernoteClone.Models.Tag(params["tag"]);
    if (tag.isValid()) {
      tag.save(null, {
        success: function () {
          EvernoteClone.tags.add(tag);
        }
      });
    } else {
      $('#tag-error').text(tag.validationError);
    }
  },
  
  renderNotes: function (event) {
    var that = this;
    $(".notebook-link").removeClass('active');
    $(".tag-link").removeClass('active');
    $(event.currentTarget).addClass('active');
    var id = $(event.currentTarget).data('id');
    var tag = this.collection.get(id);
    var taggedNotes = new EvernoteClone.Collections.TaggedNotes({
      tag: tag
    });
    taggedNotes.fetch({
      success: function () {
        var taggedNotesIndex = new EvernoteClone.Views.TaggedNotesIndex({
          collection: taggedNotes,
          $rightCol: that.$rightCol
        });
        that._swapMidView(taggedNotesIndex);
        that._removeRightView();
      }
    });
  },
  
  renameTag: function (event) {
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var tag = EvernoteClone.tags.get(id);
    tag.save(params['tag'], {
      success: function () {
       EvernoteClone.tags.sort(); 
      }
    });
  },
  
  deleteTag: function (event) {
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var tag = this.collection.get(id);
    tag.destroy();
    this._removeMidView();
    this._removeRightView();
  },
  
  _swapMidView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$midCol.html(view.render().$el);
  },
  
  _removeMidView: function () {
    this._currentView && this._currentView.remove()
  },
  
  _removeRightView: function () {
    EvernoteClone._currentRightView && EvernoteClone._currentRightView.remove();
  }
  
})