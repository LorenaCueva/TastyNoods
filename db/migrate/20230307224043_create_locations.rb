class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.integer :store_id
      t.integer :nood_id

      t.timestamps
    end
  end
end
