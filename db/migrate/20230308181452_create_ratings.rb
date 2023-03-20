class CreateRatings < ActiveRecord::Migration[6.1]
  def change
    create_table :ratings do |t|
      t.integer :nood_id
      t.integer :user_id
      t.decimal :flavor_rating, precision: 2, scale: 1
      t.decimal :broth_characteristic, precision: 2, scale: 1
      t.decimal :noodle_texture, precision: 2, scale: 1
      t.decimal :aroma, precision: 2, scale: 1
      t.decimal :packaging, precision: 2, scale: 1
      t.decimal :completeness_of_meal, precision: 2, scale: 1
      t.decimal :overall_rating, precision: 2, scale: 1
      t.text :notes

      t.timestamps
    end
  end
end
