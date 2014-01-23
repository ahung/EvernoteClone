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
    var activeId = $(this.$el.find('.active')).data('id')
    var renderedContent = this.template({
      tags: this.collection
    });
    this.$el.html(renderedContent);
    if (activeId) {
      $(this.$el.find('button[data-id=' + activeId + ']')).addClass('active');
    }
    return this;
  },
  
  newTag: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var tag = new EvernoteClone.Models.Tag(params["tag"]);
    if (this._tagNameAvail(tag.get('name'))) {
      if (tag.isValid()) {
        tag.save(null, {
          success: function () {
            EvernoteClone.tags.add(tag);
          }
        });
      } else {
        $('#tag-error').text(tag.validationError);
      }
    } else {
      $('#tag-error').text("Tag Name Already Exists")  
    }
  },
  
  renderNotes: function (event) {
    var that = this;
    $(".notebook-link").removeClass('active');
    $(".tag-link").removeClass('active');
    $(event.currentTarget).addClass('active');
    var id = $(event.currentTarget).data('id');
    var tag = this.collection.get(id);
    tag.fetch({
      success: function () {
        EvernoteClone.taggedNotes = tag.get('notes');
        var showTag = new EvernoteClone.Views.ShowTag({
          collection: EvernoteClone.taggedNotes,
          model: tag,
          $rightCol: that.$rightCol
        });
        that._swapMidView(showTag);
        that._removeRightView();
      }
    });
  },
  
  renameTag: function (event) {
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    if (this._tagNameAvail(params['tag'].name)) {
      var tag = EvernoteClone.tags.get(id);
      tag.save(params['tag'], {
        success: function () {
         EvernoteClone.tags.sort(); 
        }
      });
    } else {
      $('#tag-rename-error').text("Tag Name Already Exists")  
    }
  },
  
  deleteTag: function (event) {
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var tag = this.collection.get(id);
    tag.destroy();
    this._removeMidView();
    this._removeRightView();
  },
  
  _tagNameAvail: function (name) {
    if ($.inArray(name, EvernoteClone.tags.pluck('name')) === -1) {
      return true
    } else {
      return false
    }
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