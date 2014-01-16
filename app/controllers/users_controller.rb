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
    # if params[:id].to_i != current_user.id
    #   redirect_to user_url(current_user)
    # else
    #   @user = current_user
    # end
  end

end
