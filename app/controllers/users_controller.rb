class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])

    if @user.save
      Notebook.create!({name:"#{@user.username}'s Notebook", user_id: @user.id})
      self.current_user = @user
      flash[:notices] = ["Account Created! Welcome!"]
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to root_url
    end
  end

end
