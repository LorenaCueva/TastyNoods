class ChangeDefaultFlaggedValueInPantries < ActiveRecord::Migration[6.1]
  def change
    change_column_default :pantries, :flagged, false
  end
end
