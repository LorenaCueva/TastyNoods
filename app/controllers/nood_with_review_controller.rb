class NoodWithReviewController < ApplicationController
    before_action :authorize_logged
    before_action :authorize_admin

    # def create
    #     contents_array = nood_params[:contents].downcase.split(", ")
    #     params[:cooking_time] = ActiveSupport::Duration.parse("PT#{params[:minutes]}M#{params[:seconds]}S")
    #     nood = Nood.create(nood_params.except(:contents).merge(contents: contents_array))
    #     if nood.valid?
    #         rating = User.find(session[:user_id]).ratings.new(rating_params.merge(nood_id: nood.id))
    #         if rating.valid?
    #              params[:stores].map{|s|nood.locations.create!(store_id: s)}
    #              nood.save
    #              rating.save
    #             render json: nood, status: :created
    #         else
    #             nood.destroy
    #             render json:{errors: rating.errors}, status: :unprocessable_entity
    #         end
    #     else
    #     rating = User.find(session[:user_id]).ratings.new(rating_params.merge(nood_id: 1))
    #     if rating.valid?
    #         render json: {errors: nood.errors}, status: :unprocessable_entity
    #     else
    #         render json: {errors: nood.errors, rating.errors}, status: :unprocessable_entity
    #     end
    # end

    def create
        contents = nood_params[:contents].downcase.split(", ")
        cooking_time = ActiveSupport::Duration.parse("PT#{params[:minutes]}M#{params[:seconds]}S")
        nood = Nood.new(nood_params.except(:contents).merge(contents: contents, cooking_time: cooking_time))
        rating = User.find(session[:user_id]).ratings.new(rating_params.merge(nood_id: nood.id))
        byebug
        if nood.valid? && rating.valid?
          ActiveRecord::Base.transaction do
            nood.save!
            rating.save!
            params[:stores].each do |store_id|
              nood.locations.create!(store_id: store_id)
            end
            end
          render json: nood, status: :created
        else
          errors = nood.errors.to_hash.merge!(rating.errors.to_hash)
          render json: { errors: errors }, status: :unprocessable_entity
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