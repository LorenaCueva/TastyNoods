class Location < ApplicationRecord
    belongs_to :store
    belongs_to :nood

    validates :store, presence: true
    validates :nood, presence: true
end
