class UserAvatarSerializer < ActiveModel::Serializer
  attributes :id, :username, :isAdmin, :avatar

  def avatar
    if object.avatar.attached?
      Cloudinary::Utils.cloudinary_url(object.avatar.key, :gravity=>"face", :height=>150, :width=>150, :crop=>"thumb", :border=>"3px_solid_gray")
    end
  end


end
