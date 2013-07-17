class ChangeFollowingCountersColumnsFromUsers < ActiveRecord::Migration
  def up
    rename_column :users, :following_count, :followings_count
  end

  def down
    rename_column :users, :followings_count, :following_count
  end
end
