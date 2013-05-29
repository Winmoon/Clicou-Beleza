class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.references :user
      t.string :categories, null: false
      t.integer :venue, null: false
      t.string :description, null: false
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :posts, :user_id
  end
end
