class PantryNoodSerializer < ActiveModel::Serializer
  attributes :id, :brand, :flavor, :nood_type, :cuisine, :overall_rating, :short_notes, :picture, :user_rating

  def cook_time
    minutes = object.cooking_time.to_i / 60
    seconds = object.cooking_time.to_i % 60
    format('%1d:%02d', minutes, seconds)
  end

  def overall_rating
    object.rating&.overall_rating
  end

  def user_rating
    object.pantries.average(:rating)
  end

  def short_notes
    if object.rating
      "#{self.object.rating.notes[0..39]}..."
    end
  end

  def picture
    if object.pictures.attached?
      Cloudinary::Utils.cloudinary_url(object.pictures[0].key, 
        crop: "fill",
        width: 400, 
        height: 400,
        gravity: "center")
    end
  end

  
end
