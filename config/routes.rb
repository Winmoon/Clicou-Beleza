ClicouBeleza::Application.routes.draw do

  scope :user do
    devise_for :users, controllers: { sessions: "users/sessions", omniauth_callbacks: "users/omniauth_callbacks" }
    resources :venues
    resources :posts
    resources :profile, only: [:show] do
      post 'follow', on: :member
      get 'unfollow', on: :member
      get 'posts', on: :member
    end

    resources :dashboard, only: [:index, :show] do
      get 'love', on: :member
      post 'comment', on: :member
    end
  end

  root :to => 'home#index'

  resources :followings
  resources :comments
  resources :loveds
  resources :home, only: :index

end
#== Route Map
# Generated on 27 Mai 2013 13:21
#
#             user_session POST   /users/sign_in(.:format)               users/sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)              users/sessions#destroy
#  user_omniauth_authorize        /users/auth/:provider(.:format)        users/omniauth_callbacks#passthru {:provider=>/(?!)/}
#   user_omniauth_callback        /users/auth/:action/callback(.:format) users/omniauth_callbacks#(?-mix:(?!))
#            user_password POST   /users/password(.:format)              devise/passwords#create
#        new_user_password GET    /users/password/new(.:format)          devise/passwords#new
#       edit_user_password GET    /users/password/edit(.:format)         devise/passwords#edit
#                          PUT    /users/password(.:format)              devise/passwords#update
# cancel_user_registration GET    /users/cancel(.:format)                devise/registrations#cancel
#        user_registration POST   /users(.:format)                       devise/registrations#create
#    new_user_registration GET    /users/sign_up(.:format)               devise/registrations#new
#   edit_user_registration GET    /users/edit(.:format)                  devise/registrations#edit
#                          PUT    /users(.:format)                       devise/registrations#update
#                          DELETE /users(.:format)                       devise/registrations#destroy
#                   venues GET    /venues(.:format)                      venues#index
#                          POST   /venues(.:format)                      venues#create
#                new_venue GET    /venues/new(.:format)                  venues#new
#               edit_venue GET    /venues/:id/edit(.:format)             venues#edit
#                    venue GET    /venues/:id(.:format)                  venues#show
#                          PUT    /venues/:id(.:format)                  venues#update
#                          DELETE /venues/:id(.:format)                  venues#destroy
#                     root        /                                      home#index
#               home_index GET    /home(.:format)                        home#index
#            venues2_index GET    /venues2(.:format)                     venues2#index
