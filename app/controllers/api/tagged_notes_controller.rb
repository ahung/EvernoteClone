class Api::TaggedNotesController < ApplicationController
  before_filter :ensure_logged_in
  
  def create
    @tagged_note = TaggedNote.new(params[:tagged_note])
    if @tagged_note.save
      render :json => @tagged_note
    else
      flash[:errors] => @tagged_note.errors.full_messages
    end
  end

  def destroy
    @tagged_note = TaggedNote.find_by_tag_id_and_note_id(
      params[:tagged_note][:tag_id],
      params[:tagged_note][:note_id])
    @tagged_note.destroy
    render :json => {}
  end
end
