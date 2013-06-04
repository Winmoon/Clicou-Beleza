class DashboardController < UserController
  skip_before_filter :authenticate_user!
  respond_to :html, :json
  def index
    @posts = Post.paginate(page: params[:page], per_page: 15)
    @posts = @posts.where("categories like ?", "%#{params[:category]}%") if params[:category].present?
    respond_with @posts
  end

  def love
    @loved = Loved.new()
    @loved.user_id = current_user.id

    @loved.save!
    respond_with @loved
  end

  def comment
    @comment = Comment.create(params[:comment])
    respond_with @comment
  end

  def show
    @post = Post.find(params[:id])
    respond_with @post
  end
end