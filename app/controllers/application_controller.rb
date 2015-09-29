class ApplicationController < ActionController::Base

  before_action :authenticate_user!
  respond_to :json, :html

#   def index
#     @user = current_user
#   end

#   def set_csrf_cookie_for_ng
#     cookies['XSRF-TOKEN'] = form_authenticity_token if protect_from_forgery?
#   end

# protected

#   def verified_request?
#     super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
#   end

end
