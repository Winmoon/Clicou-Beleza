class FollowingsController < UserController
  respond_to :html, :json

  def create
    @following = current_user.followings.create(params[:following])
    respond_with @following
  end


  def update
    @following = current_user.followings.find_by_following_id(params[:id])
    @following.update_attributes(params[:following])
    respond_with @following
  end

  def destroy
    @following = current_user.followings.find_by_following_id(params[:id])
    @following.destroy
    respond_with @following
  end
end