class Pantry < ApplicationRecord
    belongs_to :user
    belongs_to :nood
    has_one :comment

    validates :rating, numericality: {
        greater_than_or_equal_to: 0,
        less_than_or_equal_to: 5.0,
        message: "must be between 0.0 and 5.0"
      }
      validate :must_have_0_5_increment, attribute: :rating
    
end
