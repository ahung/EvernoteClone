EvernoteClone::Application.routes.draw do
  resource :session, :only => [:create, :destroy]
  resources :users, :only => [:create]
  
  namespace :api, :defaults => { :format => :json } do
    resources :notebooks, :except => [:new, :edit] do
      resources :notes, :only => [:index]
    end
    resources :notes, :only => [:show, :create, :destroy, :update] do
      resources :tagged_notes, :only => [:index]
    end
    resources :tags, :except => [:new, :edit]
    resources :tagged_notes, :only => [:create, :destroy]
  end
  
  root :to => "root#root"
  get '/about', :to => 'root#about'
  get '/contact', :to => 'root#contact'
end
