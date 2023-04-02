class PantryCommentsSerializer < ActiveModel::Serializer
  attributes :author, :comments, :rating, :avatar

  def comments
    object.comments if object.comments
  end

  def author
    User.find(object.user_id).username
  end

  def avatar
    user = User.find(object.user_id)
    if user.avatar.attached?
      Cloudinary::Utils.cloudinary_url(user.avatar.key, :gravity=>"face", :height=>150, :width=>150, :crop=>"thumb", :border=>"3px_solid_orange")
    end
  end

end
