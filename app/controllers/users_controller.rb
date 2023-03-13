class UsersController < ApplicationController
    before_action :authorize_logged, only:[:update, :destroy]
    before_action :find_user, only: [:update, :destroy, :authorize_delete_account]
    before_action :authorize_delete_account, only:[:destroy]


    def create
        user = User.create!(user_params)
        session[:user_id] = user.id 
        render json: user, status: :created
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {errors: ["Not Authorized"]}, status: :unauthorized
        end
    end

    def update
        @user.update!(user_params)
        render json: user, status: :ok
    end

    def destroy
        @user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :avatar)
    end

    def authorize_delete_account
        render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @user.isAdmin?
    end

end
