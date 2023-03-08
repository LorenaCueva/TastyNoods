class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar

    has_many :ratings
    has_many :rated_noods, through: :ratings, source: :noods
    has_many :noods_in_pantries, through: :pantries, source: :nood
    has_many :pantries, :dependent => :destroy

    validates :username, presence: true
    validates_uniqueness_of :username 
end
