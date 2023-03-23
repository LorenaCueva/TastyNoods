class NoodsController < ApplicationController
    # before_action :authorize_logged
    # before_action :authorize_admin, only: [:create, :update, :destroy]
    before_action :find_nood, only: [:show, :update, :destroy, :nood_with_comments, :set_pictures]

    def index
        noods = Nood.all 
        render json: noods, status: :ok
    end

    def show
        render json: @nood, status: :ok
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

    def set_pictures
        if params[:pictures].present?
          begin
            @nood.pictures.attach(params[:pictures])
            @nood.update({pictures: params[:pictures]})
            @nood.save
            render json: @nood, status: :ok
          rescue StandardError => e
            render json: { error: "Error uploading pictures: #{e.message}" }, status: :internal_server_error
          end
        end
    end

    private

    def nood_params
        params.permit(:brand, :flavor, :nood_type, :cuisine, :price, :contents, :cooking_time, :pictures).select{:pictures.present?}
    end

    def find_nood
        @nood = Nood.find(params[:id])
    end

end
