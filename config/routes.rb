Rails.application.routes.draw do
  resources :noods
  resources :ratings

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/pantry", to: "pantries#index"
  get "/pantry/:id", to: "pantries#show"
  post "/pantry", to: "pantries#create"
  patch "/pantry/:id", to: "pantries#update"
  delete "/pantry/:id", to: "pantries#destroy"
end
