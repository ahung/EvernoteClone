class Api::TagsController < ApplicationController
  before_filter :ensure_logged_in
  
  def index
    @tags = current_user.tags
    render :json => @tags
  end

  def show
    @tag = Tag.find(params[:id])
    render :json => @tag.as_json(:include => :notes)
  end

  def create
    @tag = Tag.new(params[:tag])
    @tag.user_id = current_user.id
    if @tag.save
      render :json => @tag
    else
      flash[:errors] = @tag.errors.full_messages
    end
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update_attributes(params[:tag])
      render :json => @tag
    else
      render :json => @notebook.errors
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    render :json => {}
  end
end
