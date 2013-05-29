class ApplicationController < ActionController::Base
  protect_from_forgery

  def is_json?
    request.format == 'application/json'
  end
end
