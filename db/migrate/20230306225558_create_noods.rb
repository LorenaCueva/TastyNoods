class CreateNoods < ActiveRecord::Migration[6.1]
  def change
    create_table :noods do |t|
      t.string :brand
      t.string :flavor
      t.string :nood_type
      t.string :cuisine
      t.money :price
      t.text :contents, array: true, default: []
      t.interval :cooking_time

      t.timestamps
    end
  end
end
