class CreatePantries < ActiveRecord::Migration[6.1]
  def change
    create_table :pantries do |t|
      t.integer :user_id
      t.integer :nood_id
      t.decimal :rating, precision: 1, scale: 1
      
      t.timestamps
    end
  end
end
