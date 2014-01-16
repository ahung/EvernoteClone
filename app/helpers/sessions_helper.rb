module SessionsHelper
  
  def current_user
    User.find_by_session_token(session[:session_token])
  end
  
  def current_user=(user)
    @current_user = user
    session[:session_token] = user.session_token
  end
  
  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end
  
  def ensure_logged_in
    redirect_to new_session_url if current_user.nil?
  end
  
  
  def logged_in?
    !!current_user
  end
  
end
