class StoresController < ApplicationController
    def index
        stores = Store.all
        render json: stores, status: :ok
    end
    def create
        store = Store.create!(store_params)
        render json: store, status: :created
    end

private

    def store_params
        params.permit(:name)
    end
end
