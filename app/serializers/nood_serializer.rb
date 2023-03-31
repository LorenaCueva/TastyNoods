class NoodSerializer < ActiveModel::Serializer
  attributes :id, :brand, :flavor, :nood_type, :cuisine, :price, :contents, :cook_time, :overall_rating, :short_notes, :pictures, :user_rating

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

  def pictures
    if object.pictures.attached?
      # Cloudinary::Utils.cloudinary_url(object.pictures[0].key, 
      #   width: 400, 
      #   height: 300, 
      #   crop: "fill", 
      #   gravity: "center", 
      #   fetch_format: "auto", 
      #   quality: "auto")
      # Cloudinary::Utils.cloudinary_url(object.pictures[0].key)
    end
  end

  

end
