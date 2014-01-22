class Api::NotesController < ApplicationController
  before_filter :ensure_logged_in
  
  def index
    @notebook = Notebook.find(params[:notebook_id])
    @notes = @notebook.notes
    render :json => @notes
  end

  def create
    @note = Note.new(params[:note])
    @note.user_id = current_user.id
    if @note.save
      render :json => @note
    else
      render :json => @note.errors
    end
  end
  
  def show
    @note = Note.find(params[:id])
    render :json => @note.as_json(:include => :tags)
  end

  def update
    @note = Note.find(params[:id])
    if @note.update_attributes(params[:note])
      render :json => @note.as_json(:include => :tags)
    else
      render :json => @note.errors
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    render :json => {}
  end
end
