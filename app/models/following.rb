class Following < ActiveRecord::Base
  belongs_to :user
  attr_accessible :following_id, :categories

  validates :user_id, :following_id, :categories, presence: true
  validates :following_id, uniqueness: { :scope => :user_id }

  before_save do
    self.categories = categories.delete_if(&:blank?).join(',') if categories.is_a?(Array)
  end

  def categories
    read_attribute(:categories).split(',') if read_attribute(:categories).present?
  end
end
