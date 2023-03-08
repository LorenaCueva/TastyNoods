class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  private

  def must_have_0_5_increment
    if (send(attribute) * 10) % 5 != 0
        errors.add(attribute, "must have a 0.5 increment")
    end
  end
  
end
