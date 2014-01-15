EvernoteClone::Application.routes.draw do

  resources :users, :only => [:new, :create, :show]

  resource :session, :only => [:create, :destroy, :new]
  
  resources :notebooks
  
  root :to => "root#root"
end
