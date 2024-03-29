class Rating < ApplicationRecord
    belongs_to :nood
    belongs_to :user
    validates :notes, presence: true
    validates :overall_rating, presence: true

    ATTRIBUTES = %i[flavor_rating broth_characteristic noodle_texture aroma packaging completeness_of_meal].freeze

    ATTRIBUTES.each do |attribute|
        validates attribute, presence: true, numericality: { greater_than_or_equal_to: 0.5, less_than_or_equal_to: 5.0, message: "must be between 0.5 and 5.0" }
    end
    
end
