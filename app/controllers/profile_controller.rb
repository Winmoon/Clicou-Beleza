class ProfileController < ApplicationController
  skip_before_filter :authenticate_user!, only: :index
  respond_to :html, :json

  before_filter do
    @user = User.find(params[:id])
  end

  def show
    @following = Following.new

    @is_following = current_user.following?(@user.id) if user_signed_in?

    r = {is_following: @is_following, user: @user.as_json(only: [:id, :name, :followings_count, :followers_count], methods: [:avatar_urls, :post_list])}
    respond_with r
  end


end