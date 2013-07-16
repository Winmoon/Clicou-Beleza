class DashboardController < UserController
  skip_before_filter :authenticate_user!, only: [:index, :show]
  respond_to :html, :json
  def index
    if params[:source] == 'user'
      @posts = current_user.posts.order("created_at desc").paginate(page: params[:page], per_page: 15)
    else
      @posts = Post.order("created_at desc").paginate(page: params[:page], per_page: 15)
    end
    @posts = @posts.where("categories like ?", "%#{params[:category]}%") if params[:category].present?
    
    @posts.each_with_index do |p, idx|
      @posts[idx]["user_avatar"] = p.user.avatar.url(:medium)
      @posts[idx]["user_name"] = p.user.name
    end
    
    respond_with @posts, methods: :photo_urls
  end

  def love
    @loved = current_user.loveds.find_or_initialize_by_post_id(params[:id])
    if @loved.persisted?
      @loved.destroy
      respond_with ['unloved']
    else
      @loved.post_id = params[:id]
      if @loved.save
        respond_with ['loved']
      else
        respond_with @loved.errors, status: 400
      end
    end
  end

  def comment
    @comment = current_user.comments.new(params[:comment])
    @comment.post_id = params[:id]

    if @comment.save
      respond_with @comment
    else
      respond_with @comment, status: 400
    end
  end

  def show

    @comment = Comment.new

    @post = Post.find(params[:id])
    
    @post[:user_avatar] = @post.user.avatar.url(:medium)
    @post[:user_name] = @post.user.name
    
    respond_with @post, methods: :photo_urls, include: {
        loveds: { only: [:id, :created_at], include: { user: { only: [:id, :name], methods: :avatar_urls } } } ,
        comments: { only: [:id, :created_at, :comment], include: { user: { only: [:id, :name], methods: :avatar_urls } } }
    }
  end
end