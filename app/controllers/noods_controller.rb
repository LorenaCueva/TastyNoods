class NoodsController < ApplicationController
    # before_action :authorize_logged
    # before_action :authorize_admin
    before_action :find_nood, only: [:show, :update, :destroy]

    def index
        noods = Nood.all 
        render json: noods, status: :ok
    end

    def show
        render json: @nood, status: :ok
    end

    def create
        nood = Nood.create!(nood_params)
        render json: nood, status: :created
    end

    def update
        @nood.update(nood_params)
        render json: @nood, status: :ok
    end

    def destroy
        @nood.destroy
        head :no_content
    end

    private

    def nood_params
        params.permit(:brand, :flavor, :nood_type, :cuisine, :price, :contents, :cooking_time)
    end

    def find_nood
        @nood = Nood.find(params[:id])
    end

end
