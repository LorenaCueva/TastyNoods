class CreateRatings < ActiveRecord::Migration[6.1]
  def change
    create_table :ratings do |t|
      t.integer :nood_id
      t.integer :user_id
      t.decimal :flavor, precision: 1, scale: 1
      t.decimal :broth_characteristic, precision: 1, scale: 1
      t.decimal :noodle_texture, precision: 1, scale: 1
      t.decimal :aroma, precision: 1, scale: 1
      t.decimal :packaging, precision: 1, scale: 1
      t.decimal :completeness_of_meal, precision: 1, scale: 1
      t.decimal :overal_rating, precision: 1, scale: 1
      t.string :notes

      t.timestamps
    end
  end
end
