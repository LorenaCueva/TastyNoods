class Comment < ApplicationRecord
    belongs_to :pantry
    validates :comments, length: { maximum: 300 }
    scope :flagged, -> {where(flagged: true)}
end
