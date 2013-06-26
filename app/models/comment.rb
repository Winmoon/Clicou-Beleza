class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :post, counter_cache: true

  attr_accessible :comment, :post_id

  validates :user_id, :post_id, :comment, presence: true
end
