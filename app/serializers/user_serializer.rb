class UserSerializer < ActiveModel::Serializer
  # include Rails.application.routes.url_helpers

  attributes :id, :username, :isAdmin, :avatar

  # def avatar
  #   if object.avatar.attached?
  #     object.avatar.blob.url
  #   end
  # end

  def avatar
    if object.avatar.attached?
      Cloudinary::Utils.cloudinary_url(object.avatar.key, :gravity=>"face", :height=>150, :width=>150, :crop=>"thumb", :border=>"3px_solid_orange")
    end
  end

end
