class CommentsController < ApplicationController

    before_action :authorize_logged
    before_action :authorize_admin
    before_action :find_pantry, only: [:accept_comment, :destroy]

    def index
        comments = Pantry.all.flagged.order(updated_at: :desc)
        render json: comments, each_serializer: CommentsSerializer, status: :ok
    end

    def accept_comment
        params[:flagged] = false
        @pantry.update!(comments_params)
        render json: @pantry, status: :ok
    end

    def destroy
        params[:flagged] = false
        params[:comments] = ""
        params[:rating] = nil
        @pantry.update!(comments_params)
        render json: @pantry, status: :ok
    end 

private

    def comments_params
        params.permit(:comments, :rating, :flagged)
    end

    def find_pantry
        @pantry = Pantry.find(params[:id])
    end

end
