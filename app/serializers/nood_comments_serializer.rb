class NoodCommentsSerializer < ActiveModel::Serializer
  attributes :id, :brand, :flavor, :nood_type, :cuisine, :price, :contents, :cook_time, :pictures, :users_rating, :pantries
  has_one :rating, serializer: RatingSerializer
  has_many :stores 

  def cook_time
    minutes = object.cooking_time.to_i / 60
    seconds = object.cooking_time.to_i % 60
    format('%1d:%02d', minutes, seconds)
  end

  def users_rating
    object.pantries.average(:rating)
  end

  def pantries
    object.pantries.where(flagged: false).map do |pantry|
      PantryCommentsSerializer.new(pantry, root: false)
    end
  end

  def pictures
    # if object.pictures.attached?
    #   object.pictures.map do |picture|
    #     Cloudinary::Utils.cloudinary_url(picture.key)
    #   end
    # end
  end

end