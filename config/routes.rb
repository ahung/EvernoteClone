EvernoteClone::Application.routes.draw do
  resources :users, :only => [:new, :create, :show]
  resource :session, :only => [:create, :destroy, :new]
  
  namespace :api, :defaults => { :format => :json } do
    resources :notebooks, :except => [:new, :edit]
  end
  
  resources :notes
  
  root :to => "root#root"
end
