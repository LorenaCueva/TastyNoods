class NoodCommentsSerializer < ActiveModel::Serializer
  attributes :id, :brand, :flavor, :nood_type, :cuisine, :price, :contents, :users_rating, :pantries, :pictures, :minutes, :seconds, :overall_rating, :in_user_pantry
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

  # def pantries
  #   object.pantries.where(flagged: false).where.not(comments: [nil, ""]).map do |pantry|
  #     PantryCommentsSerializer.new(pantry, root: false)
  #   end
  # end

  def pantries
    object.pantries.where.not(comments: [nil, ""]).map do |pantry|
      PantryCommentsSerializer.new(pantry, root: false)
    end
  end

  def in_user_pantry
    object.pantries.where(user_id: scope.id).exists?
  end

  def minutes
    object.cooking_time.to_i / 60
  end

  def seconds
    object.cooking_time.to_i % 60
  end

  def overall_rating
    object.rating&.overall_rating
  end

  # def pictures
  #   if object.pictures.attached?
  #     object.pictures.map do |picture|
  #       Cloudinary::Utils.cloudinary_url(picture.key, crop: "fill")
  #     end
    
  #   end
  # end

  def pictures
    if object.pictures.attached?
      res = []
      res << Cloudinary::Utils.cloudinary_url(object.pictures[0].key, width: 1200, height: 400, crop: "fill")
      res << Cloudinary::Utils.cloudinary_url(object.pictures[1].key, width: 800, height: 600, crop: "fill", gravity: "center")
      res << Cloudinary::Utils.cloudinary_url(object.pictures[2].key, width: 800, height: 600, crop: "fill", gravity: "center")
      res
      end
  end


end