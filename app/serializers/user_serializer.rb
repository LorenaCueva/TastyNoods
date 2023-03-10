class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :isAdmin
end
