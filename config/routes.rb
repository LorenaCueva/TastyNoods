Rails.application.routes.draw do
  resources :noods, except: [:show, :create, :update]
  resources :ratings
  resources :users, only: [:update, :destroy]
  resources :stores, only: [:index, :create]

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  patch "/users/:id/avatar", to: "users#set_avatar"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/pantry", to: "pantries#index"
  get "/pantry/:id", to: "pantries#show"
  post "/pantry", to: "pantries#create"
  patch "/pantry/:id", to: "pantries#update"
  delete "/pantry/:id", to: "pantries#destroy"

  get "/noods/:id", to: "noods#nood_with_comments"
  patch "/noods/:id", to: "nood_with_review#update"
  post "/noods", to: "nood_with_review#create"
  patch "/noods/:id/pictures", to: "noods#set_pictures"
  get "/noods/:id/pictures", to: "noods#pictures"
  delete "/noods/:id/pictures", to: "noods#remove_picture"

  get "/noodReview/:id", to: "nood_with_review#show"

  get "/comments", to: "comments#index"
  patch "/comments/:id", to: "comments#accept_comment"
  delete "/comments/:id", to: "comments#destroy"

  get '/erase', to: "noods#erase"

end
