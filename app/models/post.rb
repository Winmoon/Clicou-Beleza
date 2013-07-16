class Post < ActiveRecord::Base

  belongs_to :user
  has_many :loveds
  has_many :comments

  has_attached_file :photo, :styles => { :cropped => "5000x5000>", :thumb => "95x95>" }, default_url: "/images/:style/missing.png", :processors => [:cropper]

  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h

  attr_accessible :categories, :deleted_at, :description, :venue, :photo, :crop_x, :crop_y, :crop_w, :crop_h

  validates :categories, :description, :venue, presence: true

  validates :categories, :description, length: { maximum: 255 }

  validates :photo, attachment_presence: true

  before_save do
    self.categories = categories.delete_if(&:blank?).join(',') if categories.is_a?(Array)
  end

  def to_s
    description
  end

  def categories
    read_attribute(:categories).split(',') if read_attribute(:categories).present?
  end

  def categories_sentence
    categories.collect{ |i| I18n.t("activerecord.attributes.post.category_list.#{i}")}.to_sentence if read_attribute(:categories).present?
  end

  def Post.category_list
    [:hair, :nail, :makeup, :look].collect{ |i| [I18n.t("activerecord.attributes.post.category_list.#{i}"), i]}
  end

  def cropping?
    crop_x.present? && crop_y.present? && crop_w.present? && crop_h.present?
  end

  def photo_geometry(style = :original)
    @geometry ||= {}
    @geometry[style] ||= Paperclip::Geometry.from_file(photo.path(style))
  end

  def venue_info
    # client = Foursquare2::Client.new(:client_id => '3JLPOEMCQ05BHK3LAOL0ANTXT1KKYHXDKKAFAPTKR3IAD2E3', :client_secret => 'QSYLJVS0OCDFNTKZ1DZ2IL1BQVKTCCYQ1LVRIPZORSLF503Z')
    # client.venue(venue).name
    'Buscar o nome por javascript'
  end

  def photo_urls
    { original: photo.url, cropped: photo.url(:cropped), thumb: photo.url(:thumb) }
  end

end
