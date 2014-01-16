class NotebooksController < ApplicationController
  def index
    @notebooks = current_user.notebooks
  end

  def show
    @notebook = Notebook.find(params[:id])
  end

  def new
    @notebook = Notebook.new()
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
    @notebook = Notebook.find(params[:id])
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
  end
end
