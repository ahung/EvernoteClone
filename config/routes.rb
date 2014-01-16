EvernoteClone::Application.routes.draw do
  resource :session, :only => [:create, :destroy, :new]
  
  namespace :api, :defaults => { :format => :json } do
    resources :users, :only => [:create, :show] do
      resources :notebooks, :except => [:new, :edit]
    end
  end
  
  resources :notes
  
  root :to => "root#root"
end
