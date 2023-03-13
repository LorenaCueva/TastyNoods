class PantriesController < ApplicationController
    before_action :authorize_logged
    before_action :find_user, only: [:index, :show, :create, :update, :destroy]
    before_action :find_pantry, only: [:show, :update, :destroy]
    before_action :authorize_belongs_to, only: [:show, :destroy]

    def index
        pantries = @user.pantries.all
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
        if @user.isAdmin?
            @pantry.update(pantry_params_admin)
        else
            authorize_belongs_to
            @pantry.update(pantry_params)
        end
        render json: @pantry, status: :ok
    end
    
    def destroy
        @pantry.destroy
        head :no_content
    end

    private

    def pantry_params
        params.permit(:rating, :comments)
    end

    def pantry_params_admin
        params.permit(:comments, :rating, :flagged)
    end

    def find_pantry
        @pantry = Pantry.find(params[:id])
    end

    def authorize_belongs_to
        render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @pantry.user == @user
    end

end
