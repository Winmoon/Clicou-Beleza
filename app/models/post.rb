class Post < ActiveRecord::Base
  belongs_to :user
  attr_accessible :categories, :deleted_at, :description, :venue, :photo, :crop_x, :crop_y, :crop_w, :crop_h

  has_attached_file :photo, :styles => { :small => "100x100#", :large => "500x500>" }, :processors => [:cropper], default_url: "/images/:style/missing.png", :processors => [:cropper]
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h

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
    read_attribute(:categories).split(',')
  end

  def Post.category_list
    [:nail, :hair, :makeup].collect{ |i| [I18n.t("activerecord.attributes.post.category_list.#{i}"), i]}
  end

  def cropping?
    crop_x.present? && crop_y.present? && crop_w.present? && crop_h.present?
  end

  def photo_geometry(style = :original)
    @geometry ||= {}
    @geometry[style] ||= Paperclip::Geometry.from_file(photo.path(style))
  end

end
