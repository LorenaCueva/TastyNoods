class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.integer :pantry_id
      t.string :comment
      t.boolean :flagged, default: false

      t.timestamps
    end
  end
end
