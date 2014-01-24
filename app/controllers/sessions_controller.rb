class SessionsController < ApplicationController
  
  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password])
    if user.nil?
      flash[:errors] = ["Invalid Username and/or Password"]
      redirect_to root_url
    else
      self.current_user = user
      flash[:notices] = ["Welcome, #{user.username}!"]
      redirect_to root_url
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end
  
end
