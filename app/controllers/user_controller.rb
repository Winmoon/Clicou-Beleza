class UserController < ApplicationController
  before_filter :authenticate_user!
  skip_before_filter :verify_authenticity_token, if: Proc.new { |c| c.request.format == 'application/json' }
  #http_basic_authenticate_with name: 'clicoubeleza', password: 'uyP4RnNMGe4coOm6kIcfAt9E1S8AHK9wwHqPZO9xz7I', if: Proc.new { |c| c.request.format == 'application/json' }
end
