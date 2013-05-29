class ChangeVenueTypeFromPost < ActiveRecord::Migration
  def up
    change_column :posts, :venue, :string, null: false
  end

  def down
    change_column :posts, :venue, :integer, null: false
  end
end
