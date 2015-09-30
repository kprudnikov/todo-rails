class ApplicationController < ActionController::Base

  protect_from_forgery with: :reset_session
  respond_to :json

end