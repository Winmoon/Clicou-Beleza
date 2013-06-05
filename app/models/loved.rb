class Loved < ActiveRecord::Base
  belongs_to :user
  belongs_to :post, counter_cache: true
  validates :user_id, :post_id, presence: true

  validates :post_id, uniqueness: { :scope => :user_id }
end
