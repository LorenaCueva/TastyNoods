class Nood < ApplicationRecord
    has_many_attached :photos

    has_one :rating, :dependent => :destroy
    has_many :pantries, :dependent => :destroy
    has_many :comments, through: :pantries
    has_many :users, through: :pantries
    has_many :locations, :dependent => :destroy
    has_many :stores, through: :locations
    
    validates :brand, presence: :true, uniqueness: { scope: :flavor }
    validates :flavor, presence: :true, uniqueness: { scope: :brand }
    validates :type, presence: :true
    validates :cuisine, presence: :true
    validates :price, presence: :true, numericality: { greater_than_or_equal_to: 0.01 }
    validates :contents, presence: true
    validates :contents, array_includes: { value: "noodles", message: "must include noodles" }
    # validates :contents, inclusion: { in: ->(record) { record.valid_contents } }
    validates :cooking_time presence: :true
    validate :cooking_time_less_than_10_minutes

    private

    # def valid_contents
    #     ["noodles", "soup base", "vegetables", "spices", "oil", "flavoring powder"]
    # end

    # def valid_types
    #     ["ramen", "udon", "stir-fry", "instant noodle", "pho", "yakisoba", "laksa" ]
    # end

    def cooking_time_less_than_10_minutes
        if cooking_time_minutes > 10
            errors.add(:cooking_time, "must be less than 10 minutes")
        end
    end

    def cooking_time_minutes
        Noods.select("extract(minute from cooking_time) as cooking_time_minutes").find(id).cooking_time_minutes
    end

end
