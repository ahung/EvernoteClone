EvernoteClone.Views.ShowNote = Backbone.View.extend({
  initialize: function (options) {
    $('.note-link').removeClass('active');
    $('.note-link[data-id=' + this.model.id + ']').addClass('active');
    this.listenTo(EvernoteClone.tags, "add remove sort change:name", 
      this.render);
    this.listenTo(EvernoteClone.currentTags, "add remove", this.render);
    if (options.tag) {
      this.tag = options.tag;
    }
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
    var notebook = EvernoteClone.notebooks.get(this.model.get('notebook_id'));
    var renderedContent = this.template({
      note: this.model,
      notebook: notebook,
      tags: EvernoteClone.tags,
      currentTags: EvernoteClone.currentTags
    });
    this.$el.html(renderedContent);
    
    $(this.$el.find(".drop-tag")).droppable({
      accept: ".drag-tag",
      hoverClass: "ui-state-hover",
      drop: function (event, ui) {
        var noteId = $(event.target).data('id');
        var tagId = $(ui.draggable.context).data('id');
        var currentTag = EvernoteClone.tags.get(tagId);
        if (EvernoteClone.currentTags.where({
          name: currentTag.get('name')
        }).length === 0) {
          var noteTag = new EvernoteClone.Models.TaggedNote({
            tag_id: tagId,
            note_id: noteId
          });
          noteTag.save(null, {
            success: function () {
              EvernoteClone.noteTags.add(noteTag);
              EvernoteClone.currentTags.add(currentTag);
            }
          })
        }
      }
    });
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
    if (value != "") {
      this.model.set(attrName, value);
      this.model.save(null, {
        success: function () {
          if (EvernoteClone.notes) {
            EvernoteClone.notes.sort();
          } else {
            EvernoteClone.taggedNotes.sort();
          }
          that._noteUpdated();
          that.render();
        }
      });
    } else {
      this.render();
    }
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
        that._noteUpdated();
        that.render();
      }
    });
  },
  
  addTag: function (event) {
    event.preventDefault();
    var that = this;
    var tagId = $(event.currentTarget).data("id");
    var currentTag = EvernoteClone.tags.get(tagId);
    var noteTag = new EvernoteClone.Models.TaggedNote({
      tag_id: tagId,
      note_id: this.model.id
    });
    noteTag.save(null, { 
      success: function () {
        EvernoteClone.noteTags.add(noteTag);
        EvernoteClone.currentTags.add(currentTag);
      }
    });
  },
  
  removeTag: function (event) {
    var that = this;
    var id = $(event.currentTarget).data("id");
    var currentTag = EvernoteClone.currentTags.get(id)
    var noteTag = EvernoteClone.noteTags.findWhere({tag_id: id});
    noteTag.destroy({
      success: function () {
        EvernoteClone.currentTags.remove(currentTag);
        if (EvernoteClone.taggedNotes && (that.tag.id === currentTag.id)) {
          EvernoteClone.taggedNotes.remove(that.model);  
        }
      }
    });
  },
  
  _noteUpdated: function () {
    var $span = $("<span class='label label-success'>");
    $span.text('Note has been saved!');
    $('#message-area').html($span);
    setTimeout(function () {
      $('#message-area').html('');
    }, 3000);
  }
})