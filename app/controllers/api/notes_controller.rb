class Api::NotesController < ApplicationController
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
    render :json => @note
  end

  def update
  end

  def destroy
  end
end
