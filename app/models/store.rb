class Store < ApplicationRecord
    has_many :locations, :dependent => :destroy
    has_many :noods, through: :locations
    
    validates :name, presence: true
end
