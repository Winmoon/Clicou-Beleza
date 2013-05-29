class VenuesController < UserController

  def index
    client = Foursquare2::Client.new(:client_id => '3JLPOEMCQ05BHK3LAOL0ANTXT1KKYHXDKKAFAPTKR3IAD2E3', :client_secret => 'QSYLJVS0OCDFNTKZ1DZ2IL1BQVKTCCYQ1LVRIPZORSLF503Z')

    ll = params[:ll] || '-16.6723002,-49.2783986'
    query = params[:query] || ''
    category_id = '4f04aa0c2fb6e1c99f3db0b8,4bf58dd8d48988d110951735,4d1cf8421a97d635ce361c31,4bf58dd8d48988d1ed941735'

    @venue_categories = client.venue_categories
    @venues = client.search_venues(ll: ll, query: query, categoryId: category_id).groups.first.items

    respond_to do |format|
      format.html
      format.json { render json: @venues }
    end
  end

  def show
    @venue = Venue.find(params[:id])
  end

  def new
    @venue = Venue.new
  end

  def edit
    @venue = Venue.find(params[:id])
  end

  def create
    @venue = Venue.new(params[:venue])

    respond_to do |format|
      if @venue.save
        format.html { redirect_to @venue, notice: t('controllers.action.success.create') }
      else
        format.html { render :new }
      end
    end
  end

  def update
    @venue = Venue.find(params[:id])

    respond_to do |format|
      if @venue.update_attributes(params[:venue])
        format.html { redirect_to @venue, notice: t('controllers.action.success.update') }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @venue = Venue.find(params[:id])
    @venue.destroy
    
    redirect_to venues_url
  end
end