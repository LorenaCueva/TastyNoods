class NoodSerializer < ActiveModel::Serializer
  attributes :id, :brand, :flavor, :type, :cuisine, :price, :contents, :cooking_time
end
