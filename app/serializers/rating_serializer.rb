class RatingSerializer < ActiveModel::Serializer
  attributes :id, :nood_id, :user_id, :author, :flavor, :broth_characteristic, :noodle_texture, :aroma, :packaging, :completeness_of_meal, :overal_rating, :notes

  def author
    User.find(object.user_id).username
  end

  Rating.create!(nood_id: 3, user_id: 1, flavor: 5, broth_characteristic: 5, noodle_texture: 5, aroma: 5, packaging: 5, completeness_of_meal: 5, overal_rating: 5, notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A cras semper auctor neque. Netus et malesuada fames ac turpis egestas. Nibh nisl condimentum id venenatis a condimentum vitae. Id velit ut tortor pretium. Mattis molestie a iaculis at erat pellentesque adipiscing. Consectetur purus ut faucibus pulvinar elementum integer. Libero justo laoreet sit amet cursus sit amet dictum sit. Vel fringilla est ullamcorper eget. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Netus et malesuada fames ac. Risus viverra adipiscing at in tellus integer feugiat. Nibh ipsum consequat nisl vel pretium lectus quam. Curabitur vitae nunc sed velit dignissim sodales. Sed libero enim sed faucibus turpis.")

end
