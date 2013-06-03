class PostsController < UserController
  def index
    @posts = current_user.posts.paginate(page: params[:page], per_page: 15)
  end

  def show
    @post = current_user.posts.find(params[:id])
  end

  def new
    @post = current_user.posts.new
  end

  def edit
    @post = current_user.posts.find(params[:id])
  end

  def create
    @post = current_user.posts.new(params[:post])

    respond_to do |format|
      if @post.save
        @post.photo.reprocess!
        format.html { redirect_to @post, notice: t('controllers.action.success.create') }
      else
        format.html { render :new }
      end
    end
  end

  def update
    @post = current_user.posts.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        @post.photo.reprocess!
        format.html { redirect_to @post, notice: t('controllers.action.success.update') }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy
    
    redirect_to posts_url
  end
end