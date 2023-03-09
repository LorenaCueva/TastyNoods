class NoodsController < ApplicationController
    before_action :authorize_logged
    before_action :authorize_admin

    def index
        noods = Nood.all 
        render json: noods, status: :ok
    end

    def show
        nood = nood.find(params[:id])
        render json: nood, status: :ok
    end

    def create
    end

    def update
    end

    def destroy
    end

    private

    def nood_params
        
    end

end
