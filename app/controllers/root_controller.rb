class RootController < ApplicationController
  def root
    if logged_in?
      render :root
    else
      render :welcome
    end
  end
  
  def about
  end
  
  def contact
  end
  
  def support
  end
  
  
  
end
