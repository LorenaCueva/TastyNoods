class NoodCommentsSerializer < ActiveModel::Serializer
  attributes :rating, :author, :comments

  def comments
    object.comments if object.comments
  end

  def author
    User.find(object.user_id).username
  end

end
  