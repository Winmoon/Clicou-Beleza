class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :name
      t.integer :venue_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
