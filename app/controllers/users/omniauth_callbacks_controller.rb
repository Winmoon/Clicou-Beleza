require 'addressable/uri'
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    self.authenticate
  end

  def authenticate
    # You need to implement the method below in your model
    @user = User.find_for_oauth(request.env["omniauth.auth"], current_user)

    session[:mobile_redirect_url] = params[:mobile_redirect_url]

    
    if @user && @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => request.env["omniauth.auth"].provider.capitalize
      
      if session[:is_mobile] == true
        sign_in @user, :event => :authentication
        uri = Addressable::URI.new
        uri.query_values = {mobile_user_logged: true}
        redirect_to user_logged_index_url+".json?"+uri.query
      else
        sign_in_and_redirect @user, :event => :authentication
      end
      
    else
      session["devise.omniauth_data"] = get_omniauth_info
      session["devise.omniauth_data_test"] = request.env["omniauth.auth"]
    
      if session[:is_mobile] == true
        uri = Addressable::URI.new
        uri.query_values = session["devise.omniauth_data"]
        redirect_to user_logged_index_url+".json?"+uri.query()
      else
        redirect_to new_user_registration_url(session["devise.omniauth_data"])
      end



    end
  end

  def get_omniauth_info
    data = request.env["omniauth.auth"]
    { provider: data.provider, uid: data.uid, name: data.info.name, email: data.info.email, avatar: data.info.image }
  end
end