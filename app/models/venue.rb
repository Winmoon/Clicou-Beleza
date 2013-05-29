# == Schema Information
#
# Table name: venues
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  venue_id   :integer
#  deleted_at :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Venue < ActiveRecord::Base

  acts_as_paranoid

  attr_accessible :deleted_at, :name, :venue_id

  validates :name, :venue_id, presence: true

  validates :name, length: { maximum: 255 }

  def to_s
    name
  end

end
