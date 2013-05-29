class Users::SessionsController < Devise::SessionsController
  skip_before_filter :verify_authenticity_token, if: Proc.new { |c| c.request.format == 'application/json' }
  http_basic_authenticate_with name: 'clicoubeleza', password: 'uyP4RnNMGe4coOm6kIcfAt9E1S8AHK9wwHqPZO9xz7I', if: Proc.new { |c| c.request.format == 'application/json' }

  def setup
    provider :facebook,
    request.env['omniauth.strategy'].options[:client_id]      = '163039620543757'
    request.env['omniauth.strategy'].options[:client_secret]  = '9b2d0b99a89eb610b75ba029c8ac7613'

    render :text => "Setup complete.", :status => 404
  end
end