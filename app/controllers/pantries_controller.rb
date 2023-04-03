class PantriesController < ApplicationController
    before_action :authorize_logged
    before_action :find_user, only: [:index, :show, :create, :update, :destroy]
    before_action :find_pantry, only: [:show, :update, :destroy]
    before_action :authorize_belongs_to, only: [:show, :destroy, :update]

    def index
        pantries = @user.pantries.all.order(created_at: :desc)
        render json: pantries, status: :ok
    end

    def show
        render json: @pantry, status: :ok
    end

    def create
        pantry = @user.pantries.create!(pantry_params)
        render json: pantry, status: :created
    end

    def update
        if params[:comments].present?
            params[:flagged] = true
        end
            @pantry.update!(pantry_params)
        render json: @pantry, status: :ok
    end
    
    def destroy
        @pantry.destroy
        head :no_content
    end

    private

    def pantry_params
        params.permit(:rating, :comments, :nood_id, :flagged)
    end

    def find_pantry
        @pantry = Pantry.find(params[:id])
    end

    def authorize_belongs_to
        render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @pantry.user == @user
    end

end
