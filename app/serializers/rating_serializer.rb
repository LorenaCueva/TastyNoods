class RatingSerializer < ActiveModel::Serializer
  attributes :author, :flavor_rating, :broth_characteristic, :noodle_texture, :aroma, :packaging, :completeness_of_meal, :overall_rating, :notes

  def author
    User.find(object.user_id).username
  end


end
