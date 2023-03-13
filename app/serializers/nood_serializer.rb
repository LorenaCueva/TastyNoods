class NoodSerializer < ActiveModel::Serializer
  attributes :id, :brand, :flavor, :nood_type, :cuisine, :price, :contents, :cook_time, :overall_rating

  def cook_time
    minutes = object.cooking_time.to_i / 60
    seconds = object.cooking_time.to_i % 60
    format('%1d:%02d', minutes, seconds)
  end

  def overall_rating
    object.rating&.overall_rating
  end

end
