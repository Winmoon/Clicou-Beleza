class AddCategoriesToFollowing < ActiveRecord::Migration
  def change
    add_column :followings, :categories, :string
  end
end
