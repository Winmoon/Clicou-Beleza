class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :cors_set_access_control_headers

  def is_json?
    request.format == 'application/json'
  end
  
  def cors_set_access_control_headers
    if request.headers['HTTP_ORIGIN']
      headers['Access-Control-Allow-Origin'] = request.headers['HTTP_ORIGIN']
      headers['Access-Control-Expose-Headers'] = 'ETag'
      headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
      headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match,Auth-User-Token'
      headers['Access-Control-Max-Age'] = '86400'
      headers['Access-Control-Allow-Credentials'] = 'true'
    end
  end
  
end
