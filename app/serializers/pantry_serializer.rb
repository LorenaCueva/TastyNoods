class PantrySerializer < ActiveModel::Serializer
  attributes :id, :rating, :comments

  belongs_to :nood, serializer: PantryNoodSerializer

end
