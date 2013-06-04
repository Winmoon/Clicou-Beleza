class Loved < ActiveRecord::Base
  belongs_to :user
  belongs_to :post, counter_cache: true
  # attr_accessible :title, :body
end
