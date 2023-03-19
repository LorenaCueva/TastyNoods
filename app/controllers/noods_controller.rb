class NoodsController < ApplicationController
    # before_action :authorize_logged
    before_action :authorize_admin, only: [:create, :update, :destroy]
    before_action :find_nood, only: [:show, :update, :destroy, :nood_with_comments]

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

    def nood_with_comments
        render json: @nood, serializer: NoodCommentsSerializer, status: :ok
    end

    private

    def nood_params
        params.permit(:brand, :flavor, :nood_type, :cuisine, :price, :contents, :cooking_time)
    end

    def find_nood
        @nood = Nood.find(params[:id])
    end

end
