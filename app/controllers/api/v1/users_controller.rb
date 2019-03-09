require 'pry'
module Api::V1
  class UsersController < ApiController

    # GET /v1/users
    def index
      render json: User.all
    end

    # GET /v1/users/{uid}
    def show
      render json: User.find_by(id: params[:id])
    end

    # GET /v1/users/{uid}
    def show_current_user
      render json: current_user
    end

  end
end