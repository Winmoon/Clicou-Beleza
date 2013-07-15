class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :post, counter_cache: true

  attr_accessible :comment, :post_id

  validates :user_id, :post_id, :comment, presence: true

  validate :duplicity

  def duplicity
    if Comment.where("user_id = ? and post_id = ? and comment = ? and created_at > ?", self.user_id, self.post_id, self.comment, (DateTime.now - 5.minutes)).count > 0
      errors.add(:comment, I18n.t("errors.comment.duplicated_message"))
    end
  end
end
