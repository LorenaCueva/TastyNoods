class NoodWithReviewController < ApplicationController
    before_action :authorize_logged
    before_action :authorize_admin
    before_action :find_nood, only: [:update, :show]

    def create
        contents_array = nood_params[:contents].downcase.split(", ")
        params[:cooking_time] = ActiveSupport::Duration.parse("PT#{params[:minutes]}M#{params[:seconds]}S")
        nood = Nood.create(nood_params.except(:contents).merge(contents: contents_array))
        if nood.valid?
            rating = User.find(session[:user_id]).ratings.new(rating_params.merge(nood_id: nood.id))
            if rating.valid?
                 params[:stores].map{|s|nood.locations.create!(store_id: s)}
                 nood.save
                 rating.save
                render json: nood, serializer: NoodCommentsSerializer, status: :created
            else
                nood.destroy
                render json:{errors: rating.errors}, status: :unprocessable_entity
            end
        else
            render json: {errors: nood.errors}, status: :unprocessable_entity
        end
    end


    def update
        contents_array = nood_params[:contents].downcase.split(", ")
        params[:cooking_time] = ActiveSupport::Duration.parse("PT#{params[:minutes]}M#{params[:seconds]}S")
        if @nood.update(nood_params.except(:contents).merge(contents: contents_array))
          if @nood.rating.present? && !@nood.rating.update(rating_params)
            render json: { errors: @nood.rating.errors }, status: :unprocessable_entity
          else
            @nood.locations.destroy_all
            params[:stores].map { |s| @nood.locations.create!(store_id: s) }
            render json: @nood, serializer: NoodCommentsSerializer, status: :ok
          end
        else
          render json: { errors: @nood.errors }, status: :unprocessable_entity
        end
      end

    def show
        render json: @nood, serializer: NoodCommentsSerializer
    end

private

def nood_params
    params.permit(:brand, :flavor, :nood_type, :cuisine, :price, :contents, :cooking_time, :pictures).select{:pictures.present?}
end

def rating_params
    params.permit(:flavor_rating, :broth_characteristic, :noodle_texture, :aroma, :packaging, :completeness_of_meal, :overall_rating, :notes)
end

def find_nood
    @nood = Nood.find(params[:id])
end

end