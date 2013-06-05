class DashboardController < UserController
  skip_before_filter :authenticate_user!, only: :index
  respond_to :html, :json
  def index
    @posts = Post.paginate(page: params[:page], per_page: 15)
    @posts = @posts.where("categories like ?", "%#{params[:category]}%") if params[:category].present?
    respond_with @posts
  end

  def love
    @loved = current_user.loveds.new()
    @loved.post_id = params[:id]

    if @loved.save
      respond_with @loved
    else
      respond_with @loved.errors, status: 400
    end
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