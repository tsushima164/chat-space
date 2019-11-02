Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: %i[index edit update]
  resources :groups, only: %i[new create edit update] do
    resources :messages, only: %i[index create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
