class ApplicationController < ActionController::Base
  protect_from_forgery
  # before_action :authenticate_user!
  respond_to :json, :html

  # before_action :check_request

  # def check_request
  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  #   puts
  #   puts
  #   puts params
  #   puts
  #   puts

  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  #   puts "@@@@@@@@@@"
  # end


  # before_action :configure_permitted_parameters, if: :devise_controller?


#   def index
#     @user = current_user
#   end

  # def set_csrf_cookie_for_ng
  #   cookies['XSRF-TOKEN'] = form_authenticity_token if protect_from_forgery?
  # end

protected

  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

end
