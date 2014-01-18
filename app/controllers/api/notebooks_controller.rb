class Api::NotebooksController < ApplicationController
  before_filter :ensure_logged_in
  
  def index
    @notebooks = current_user.notebooks
    render :json => @notebooks
  end

  def show
    @notebook = Notebook.find(params[:id])
    @notes = @notebook.notes
    render :json => @notes
  end

  def create
    @notebook = Notebook.new(params[:notebook])
    @notebook.user_id = current_user.id
    if @notebook.save
      render :json => @notebook
    else
      flash[:errors] = @notebook.errors.full_messages
    end
  end

  def update
    @notebook = Notebook.find(params[:id])
    if @notebook.update_attributes(params[:notebook])
      render :json => @notebook
    else
      render :json => @notebook.errors
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
    render :json => {}
  end
end
