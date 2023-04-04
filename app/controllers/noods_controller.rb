class NoodsController < ApplicationController
    before_action :authorize_logged
    before_action :authorize_admin, only: [:create, :update, :destroy]
    before_action :find_nood, only: [:show, :update, :destroy, :nood_with_comments, :set_pictures, :pictures, :remove_picture]

    def index
        noods = Nood.all.order(updated_at: :desc)
        render json: noods, status: :ok
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
            @nood.save
            render json: @nood, status: :ok
          rescue StandardError => e
            render json: { error: "Error uploading pictures: #{e.message}" }, status: :internal_server_error
          end
        end
    end

    def remove_picture
        begin
            @nood.pictures[params[:pictures]].purge
            @nood.save
            head :no_content
        rescue StandardError => e
            render json: {error: "Error deleting picture"}, status: :internal_server_error
        end
    end

    def pictures
        render json: @nood, serializer: NoodPictrureSerializer, status: :ok
    end

    def erase
        Nood.destroy_all
        render json: {message: "erased"},status: :ok
    end

    private

    def nood_params
        params.permit(:brand, :flavor, :nood_type, :cuisine, :price, :contents, :cooking_time, :pictures).select{:pictures.present?}
    end

    def find_nood
        @nood = Nood.find(params[:id])
    end

end
