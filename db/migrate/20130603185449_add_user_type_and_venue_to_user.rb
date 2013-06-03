class AddUserTypeAndVenueToUser < ActiveRecord::Migration
  def change
    add_column :users, :user_type, :string
    add_column :users, :venue, :string
  end
end
