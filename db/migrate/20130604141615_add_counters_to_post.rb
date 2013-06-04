class AddCountersToPost < ActiveRecord::Migration
  def change
    add_column :posts, :loveds_count, :integer, default: 0
    add_column :posts, :comments_count, :integer, default: 0
  end
end
