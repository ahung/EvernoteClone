class UsersController < ApplicationController
  # before_filter :logged_in?, :only => [:show]

  def new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      self.current_user = @user
      redirect_to user_url(@user)
    else
      render :json => @user.errors.full_messages
    end
  end
  
  def show
  end

end
