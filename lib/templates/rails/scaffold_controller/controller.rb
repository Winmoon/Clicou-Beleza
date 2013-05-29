class <%= controller_class_name %>Controller < ApplicationController
  def index
    @<%= plural_table_name %> = <%= class_name %>.paginate(page: params[:page], per_page: 15)
  end

  def show
    @<%= singular_table_name %> = <%= class_name %>.find(params[:id])
  end

  def new
    @<%= singular_table_name %> = <%= class_name %>.new
  end

  def edit
    @<%= singular_table_name %> = <%= class_name %>.find(params[:id])
  end

  def create
    @<%= singular_table_name %> = <%= class_name %>.new(params[:<%= singular_table_name %>])

    respond_to do |format|
      if @<%= singular_table_name %>.save
        format.html { redirect_to @<%= singular_table_name %>, notice: t('controllers.action.success.create') }
      else
        format.html { render :new }
      end
    end
  end

  def update
    @<%= singular_table_name %> = <%= class_name %>.find(params[:id])

    respond_to do |format|
      if @<%= singular_table_name %>.update_attributes(params[:<%= singular_table_name %>])
        format.html { redirect_to @<%= singular_table_name %>, notice: t('controllers.action.success.update') }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @<%= singular_table_name %> = <%= class_name %>.find(params[:id])
    @<%= singular_table_name %>.destroy
    
    redirect_to <%= plural_table_name %>_url
  end
end