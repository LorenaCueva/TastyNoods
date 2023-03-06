class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar
    validates :username, presence: true
    validates_uniqueness_of :username 
end
