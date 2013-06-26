class ProfileController < ApplicationController
  skip_before_filter :authenticate_user!, only: :index
  respond_to :html, :json

  before_filter do
    @user = User.find(params[:id])
  end

  def show
    respond_with @user.as_json(only: [:id, :name, :following_count, :followers_count], methods: [:avatar_urls, :post_list])
  end

  def follow
    @following = current_user.followings.find_or_initialize_by_following_id(params[:id])
    @following.save
    respond_with 'following'
  end

  def unfollow
    @following = current_user.followings.find_by_following_id(params[:id])
    @following.destroy
    respond_with 'unfollowed'
  end
end