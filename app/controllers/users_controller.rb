class UsersController < ApplicationController
  before_filter :ensure_logged_in, :only => [:show]

  def create
    @user = User.new(params[:user])

    if @user.save
      self.current_user = @user
      redirect_to root_url
    else
      render :json => @user.errors.full_messages
    end
  end
  
  def show
    @user = User.find(params[:id])
    render :json => @user
  end

end
