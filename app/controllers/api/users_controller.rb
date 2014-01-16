class Api::UsersController < ApplicationController
  before_filter :ensure_logged_in, :only => [:show]

  def create
    @user = User.new(params[:user])

    if @user.save
      self.current_user = @user
      flash[:notices] = ["Account Created!"]
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to root_url
    end
  end
  
  def show
    @user = current_user
    render :json => @user
  end

end
