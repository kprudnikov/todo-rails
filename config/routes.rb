Rails.application.routes.draw do

  devise_for :users

  root 'application#index'

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :lists, only: [:create, :update, :destroy, :index] do
        resources :tasks

        put "/tasks/all/update", to: "tasks#update_all"
      end
    end
  end
end
