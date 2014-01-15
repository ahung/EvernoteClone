class NotebooksController < ApplicationController
  def index
    @notebooks = current_user.notebooks
  end

  def show
    @notebook = Notebook.find(params[:id])
  end

  def new
  end

  def create
    @notebook = Notebook.new(params[:notebook])
    if @notebook.save
      render :json => @notebook
    else
      render :json => @notebook.errors
    end
  end

  def edit
  end

  def update
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
  end
end
