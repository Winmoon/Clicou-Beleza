class CreateFollowings < ActiveRecord::Migration
  def change
    create_table :followings do |t|
      t.integer :user_id, null: false
      t.integer :following_id, null: false
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :followings, :user_id
    add_index :followings, :following_id
  end
end
