class NoodWithReviewController < ApplicationController
    before_action :authorize_logged
    before_action :authorize_admin

    def create
        contents_array = nood_params[:contents].downcase.split(", ")
        params[:cooking_time] = ActiveSupport::Duration.parse("PT#{params[:minutes]}M#{params[:seconds]}S")
        nood = Nood.create(nood_params.except(:contents).merge(contents: contents_array))
        if nood.valid?
            rating = User.find(session[:user_id]).ratings.new(rating_params.merge(nood_id: nood.id))
            if rating.valid?
                nood.save
                rating.save
                render json: nood, status: :created
            else
                nood.destroy
                render json:{errors: rating.errors}, status: :unprocessable_entity
            end
        else
        render json: {errors: nood.errors}, status: :unprocessable_entity
        end
    end

private

def nood_params
    params.permit(:brand, :flavor, :nood_type, :cuisine, :price, :contents, :cooking_time)
end

def rating_params
    params.permit(:flavor_rating, :broth_characteristic, :noodle_texture, :aroma, :packaging, :completeness_of_meal, :overall_rating, :notes)
end
end
