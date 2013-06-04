class DashboardController < UserController
  skip_before_filter :authenticate_user!
  def index
    @posts = Post.paginate(page: params[:page], per_page: 15)

  end

end