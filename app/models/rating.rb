class Rating < ApplicationRecord
    belongs_to :nood
    belongs_to :user
    validates :notes, presence: true

    ATTRIBUTES = %i[flavor broth_characteristic noodle_texture aroma packaging completeness_of_meal overal_rating].freeze

private 

    ATTRIBUTES.each do |attribute|
        validates attribute, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5.0, message: "must be between 0.0 and 5.0" }
        validate :must_have_0_5_increment, attribute: attribute
    end

    
end
