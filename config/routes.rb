EvernoteClone::Application.routes.draw do
  resource :session, :only => [:create, :destroy, :new]
  resources :users, :only => [:create, :show]
  
  namespace :api, :defaults => { :format => :json } do
    resources :notebooks, :except => [:new, :edit] do
      resources :notes, :only => [:index, :update]
    end
    resources :notes, :only => [:show, :create, :destroy]
  end
  
  root :to => "root#root"
  get '/about', :to => 'root#about'
  get '/contact', :to => 'root#contact'
  get '/support', :to => 'root#support'
end
