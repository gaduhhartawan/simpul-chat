class AuthController < ApplicationController
  SECRET_KEY = Rails.application.secret_key_base

  def register
    user = User.new(user_params)
    if user.save
      render json: { token: jwt_encode(user_id: user.id, username: user.username) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      render json: { token: jwt_encode(user_id: user.id, username: user.username) }, status: :ok
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:username, :email, :password)
  end

  def jwt_encode(payload)
    JWT.encode(payload, SECRET_KEY)
  end
end
