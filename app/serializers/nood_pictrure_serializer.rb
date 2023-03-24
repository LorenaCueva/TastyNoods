class NoodPictrureSerializer < ActiveModel::Serializer
  attributes :pictures

  def pictures
    if object.pictures.attached?
      object.pictures.map do |picture|
        Cloudinary::Utils.cloudinary_url(picture.key)
      end
    end
  end

end
