class Pantry < ApplicationRecord
    belongs_to :user
    belongs_to :nood

    validates :user_id, presence: true
    validates :nood_id, presence: true, uniqueness: { scope: :user_id }
    validates :rating, inclusion: { in: 0.step(5.0, 0.5), message: "value must be between 0.5 - 5.0 in 0.5 increments" }, allow_nil: true
    validates :comments, length: { maximum: 300 }, allow_nil: true
    scope :flagged, -> {where(flagged: true)}

  
end
