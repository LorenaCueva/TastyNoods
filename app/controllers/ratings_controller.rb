class RatingsController < ApplicationController
    before_action :authorize_logged
    before_action :authorize_admin
    before_action :find_rating, only: [:show, :update, :destroy]

    def index
        ratings = Rating.all
        render json: ratings, status: :ok
    end

    def show
        render json: @rating, status: :ok
    end

    def create
        rating = Rating.create(rating_params)
        render json: rating, status: :created
    end

    def update
        @rating.update!(rating_params)
        render json: @rating, status: :ok
    end

    def destroy
        @rating.destroy
        head :no_content
    end

    private

    def rating_params
        params.permit(:flavor, :broth_characteristic, :noodle_texture, :aroma, :packaging, :completeness_of_meal, :overal_rating, :notes)
    end

    def find_rating
        @rating = Rating.find(params[:id])
    end
end
