class CommentsSerializer < ActiveModel::Serializer
  attributes :id, :comments, :rating, :author

  belongs_to :nood, serializer: CommentsNoodSerializer

  def author
      User.find(object.user_id).username
  end

end
