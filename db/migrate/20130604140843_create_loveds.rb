class CreateLoveds < ActiveRecord::Migration
  def change
    create_table :loveds do |t|
      t.references :user, null: false
      t.references :post, null: false

      t.timestamps
    end
    add_index :loveds, :user_id
    add_index :loveds, :post_id
  end
end
