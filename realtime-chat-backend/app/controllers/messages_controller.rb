class MessagesController < ApplicationController
  before_action :authenticate_user
  before_action :set_message, only: [:destroy]

  def index
    messages = Message.includes(:user).order(created_at: :asc)
    render json: messages, include: :user
  end

  def create
    message = @current_user.messages.create!(message_params)
    Pusher.trigger('chat', 'new-message', message.as_json(include: :user))
    render json: message, include: :user
  end

  def destroy
    if @message.user_id == @current_user.id
      @message.destroy
      Pusher.trigger('chat', 'delete-message', { id: @message.id })
      render json: { message: 'Message deleted successfully' }, status: :ok
    else
      render json: { errors: ['Unauthorized to delete this message'] }, status: :unauthorized
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

  def authenticate_user
    token = request.headers['Authorization']&.split(' ')&.last
    decoded = jwt_decode(token)
    @current_user = User.find(decoded['user_id'])
  rescue
    render json: { errors: ['Unauthorized'] }, status: :unauthorized
  end

  def set_message
    @message = Message.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ['Message not found'] }, status: :not_found
  end

  def jwt_decode(token)
    JWT.decode(token, Rails.application.secret_key_base).first
  end
end
