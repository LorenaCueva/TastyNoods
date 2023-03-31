class CommentsNoodSerializer < ActiveModel::Serializer
  attributes :id, :brand, :flavor, :users_rating, :overall_rating


  def users_rating
    object.pantries.average(:rating)
  end

  def overall_rating
    object.rating&.overall_rating
  end

end
