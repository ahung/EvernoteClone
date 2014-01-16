class RootController < ApplicationController
  def root
    if logged_in?
      render :root
    else
      render :welcome
    end
  end
end
