EvernoteClone::Application.routes.draw do

  resources :users, :only => [:new, :create, :show]

  resource :session, :only => [:create, :destroy, :new]
  
  resources :notebooks
  
  resources :notes
  
  root :to => "root#root"
end
