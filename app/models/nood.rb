class Nood < ApplicationRecord
    # has_many_attached :photos
    attribute :cooking_time, :interval
    has_one :rating, :dependent => :destroy
    has_many :pantries, :dependent => :destroy
    has_many :comments, through: :pantries
    has_many :users, through: :pantries
    has_many :locations, :dependent => :destroy
    has_many :stores, through: :locations
    
    validates :brand, presence: :true
    validates :flavor, presence: :true, uniqueness: { scope: :brand }
    validates :nood_type, presence: :true
    validates :cuisine, presence: :true
    validates :price, presence: :true, numericality: { greater_than_or_equal_to: 0.00 }
    validates :contents, presence: true
    validate :contents_has_noodles
    validates :cooking_time, presence: :true
    validate :cooking_time_less_than_10_minutes

    private

    def cooking_time_less_than_10_minutes
        if cooking_time && cooking_time > 10.minutes
            errors.add(:cooking_time, "must be less than 10 minutes")
        end
    end

    def contents_has_noodles
        errors.add(:contents, "must include noodles") unless contents.include? "noodles"
    end

end
