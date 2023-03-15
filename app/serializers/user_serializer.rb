class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :isAdmin, :avatar
 

  # def avatar_url
  #   transformed_avatar_url(object.avatar, width: 200, height: 200, crop: :fill, gravity: :face)
  # end

  # options = {
  #   width: 150,
  #   height: 150,
  #   crop: :fill,
  #   gravity: :face,
  #   quality: :auto,
  #   format: :jpg,
  #   folder: "TastyNoodsAvatars"
  # }

  def avatar
    if object.avatar.attached?
Cloudinary::Utils.cloudinary_url(object.avatar.key, public_id: object.username)
      # Cloudinary::Utils.cl_image_path(object.avatar.key, {folder: "TastyNoodsAvatars"})
      # Cloudinary::Uploader.upload(object.avatar.key, 
      #   :folder => "TastyNoodsAvatars", 
      #   :public_id => object.username)
    end
  end
end
