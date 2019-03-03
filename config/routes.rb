Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    namespace :v1 do
      get '/users', to: 'users#index'
      get '/users/:id', to: 'users#show'#, :constraints => { :id => /\w*@\w*\.\w*/ }
      get '/mailboxes/user/:id', to: 'mailboxes#user_mailboxes'
      get '/address_books/user/:id', to: 'address_books#user_address_books'
      resources :mailboxes
      resources :address_books
      resources :letters
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
