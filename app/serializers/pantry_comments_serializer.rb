class PantryCommentsSerializer < ActiveModel::Serializer
  attributes :author, :comments, :rating

  def comments
    object.comments if object.comments
  end

  def author
    User.find(object.user_id).username
  end

end
