class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def must_have_0_5_increment(attribute:)
    if (send(attribute) * 10) % 5 != 0
        errors.add(attribute, "must have a 0.5 increment")
    end
  end
  
end
