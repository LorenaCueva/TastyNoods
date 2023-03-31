class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar

    has_many :ratings
    has_many :rated_noods, through: :ratings, source: :nood
    has_many :pantries, dependent: :destroy
    has_many :noods, through: :pantries
   

    validates :username, presence: true
    validates_uniqueness_of :username 

    

end
