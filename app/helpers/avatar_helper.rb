# app/helpers/avatar_helper.rb

module AvatarHelper
    def transformed_avatar_url(avatar = nil, options = {})
      return unless avatar&.attached?
  
      cloudinary_url = avatar.service_url
  
      # Specify the folder name
      folder_name = "TastyNoodsAvatars"
  
      # Add your desired transformations
      transformations = {
        folder: folder_name,
        width: options[:width] || 150,
        height: options[:height] || 150,
        crop: options[:crop] || :fill,
        gravity: options[:gravity] || :face,
        quality: options[:quality] || :auto,
        format: options[:format] || :jpg
      }.compact
  
      # Append the transformations to the Cloudinary URL
      transformed_url = Cloudinary::Utils.cloudinary_url(cloudinary_url, transformations)
  
      transformed_url
    end
  end
  