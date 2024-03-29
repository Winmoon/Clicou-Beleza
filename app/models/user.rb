# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0)
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  name                   :string(255)      not null
#  avatar_file_name       :string(255)
#  avatar_content_type    :string(255)
#  avatar_file_size       :integer
#  avatar_updated_at      :datetime
#

class User < ActiveRecord::Base
  # Include defaults devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  attr_accessible :name, :avatar, :user_type, :venue

  has_attached_file :avatar, styles: { medium: "95x95>", thumb: "40x40>" }, default_url: "/images/:style/missing.png"

  has_many :posts
  has_many :loveds
  has_many :comments
  has_many :followings, :class_name => 'Following', :foreign_key => :user_id
  has_many :followers, :class_name => 'Following', :foreign_key => :following_id
  has_many :loved_posts, through: :loveds, source: :post

  validates :name, presence: true, length: { maximum: 255 }

  validates :avatar, attachment_presence: true

  validates :user_type, presence: true

  validates :venue, presence: true, if: :is_salon?

  def is_salon?
    user_type.to_s == 'salon'
  end

  def to_s
    name
  end

  def self.user_type_list
    [:user, :salon].collect{ |i| [I18n.t("activerecord.attributes.user.user_type_list.#{i}"), i]}
  end

  def avatar_urls
    { original: avatar.url, medium: avatar.url(:medium), thumb: avatar.url(:thumb) }
  end

  def post_list
    Post.category_list.collect do |category|
      posts = self.posts.where("categories like ?", "%#{category[1]}%").order("RANDOM()").limit('4').collect{ |post| post.as_json(methods: [:photo_urls]) }
      {category_name: category, category_posts: posts} if posts.any?
    end.reject(&:nil?)
  end

  def loved_post_list
    Post.category_list.collect do |category|
      posts = self.loved_posts.where("categories like ?", "%#{category[1]}%").order("RANDOM()").limit('4').collect{ |post| post.as_json(methods: [:photo_urls]) }
      {category_name: category, category_posts: posts} if posts.any?
    end.reject(&:nil?)
  end

  def following?(user_id)
    user_id != self.id && followings.find_by_following_id(user_id).present?
  end
end
