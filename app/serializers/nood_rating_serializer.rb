class NoodRatingSerializer < ActiveModel::Serializer
  attributes :id, :brand, :flavor, :nood_type, :cuisine, :price, :contents, :minutes, :seconds
  has_one :rating
  has_many :stores, through: :locations


  def minutes
    object.cooking_time.to_i / 60
  end

  def seconds
    object.cooking_time.to_i % 60
  end


end
