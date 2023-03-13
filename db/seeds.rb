# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

time = 5.minutes + 30.seconds
n1 = Nood.create!(brand: "brand", flavor: "flavor1", nood_type: "type", cuisine: "cuisine", price: 1.95, contents: ["noodles", "flavor"], cooking_time: time)

time = 4.minutes + 15.seconds
n2 = Nood.create!(brand: "brand", flavor: "flavor2", nood_type: "type", cuisine: "cuisine", price: 1.95, contents: ["noodles", "flavor"], cooking_time: time)


time = 4.minutes
n3 = Nood.create!(brand: "brand", flavor: "flavor3", nood_type: "type", cuisine: "cuisine", price: 1.95, contents: ["noodles", "flavor"], cooking_time: time)


time = 5.minutes + 15.seconds
n4 = Nood.create!(brand: "brand", flavor: "flavor4", nood_type: "type", cuisine: "cuisine", price: 1.95, contents: ["noodles", "flavor"], cooking_time: time)

Rating.create!(nood_id: 1, user_id: 1, flavor: 5, broth_characteristic: 4.5, noodle_texture: 4.5, aroma: 4, packaging: 3.5, completeness_of_meal: 3, overall_rating:4, notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A cras semper auctor neque. Netus et malesuada fames ac turpis egestas. Nibh nisl condimentum id venenatis a condimentum vitae. Id velit ut tortor pretium. Mattis molestie a iaculis at erat pellentesque adipiscing. Consectetur purus ut faucibus pulvinar elementum integer. Libero justo laoreet sit amet cursus sit amet dictum sit. Vel fringilla est ullamcorper eget. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Netus et malesuada fames ac. Risus viverra adipiscing at in tellus integer feugiat. Nibh ipsum consequat nisl vel pretium lectus quam. Curabitur vitae nunc sed velit dignissim sodales. Sed libero enim sed faucibus turpis.")
Rating.create!(nood_id: 2, user_id: 1, flavor: 3, broth_characteristic: 4, noodle_texture: 4.5, aroma: 4, packaging: 3.5, completeness_of_meal: 3, overall_rating:3.5, notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A cras semper auctor neque. Netus et malesuada fames ac turpis egestas. Nibh nisl condimentum id venenatis a condimentum vitae. Id velit ut tortor pretium. Mattis molestie a iaculis at erat pellentesque adipiscing. Consectetur purus ut faucibus pulvinar elementum integer. Libero justo laoreet sit amet cursus sit amet dictum sit. Vel fringilla est ullamcorper eget. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Netus et malesuada fames ac. Risus viverra adipiscing at in tellus integer feugiat. Nibh ipsum consequat nisl vel pretium lectus quam. Curabitur vitae nunc sed velit dignissim sodales. Sed libero enim sed faucibus turpis.")
Rating.create!(nood_id: 3, user_id: 1, flavor: 5, broth_characteristic: 5, noodle_texture: 5, aroma: 5, packaging: 5, completeness_of_meal: 5, overall_rating: 5, notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A cras semper auctor neque. Netus et malesuada fames ac turpis egestas. Nibh nisl condimentum id venenatis a condimentum vitae. Id velit ut tortor pretium. Mattis molestie a iaculis at erat pellentesque adipiscing. Consectetur purus ut faucibus pulvinar elementum integer. Libero justo laoreet sit amet cursus sit amet dictum sit. Vel fringilla est ullamcorper eget. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Netus et malesuada fames ac. Risus viverra adipiscing at in tellus integer feugiat. Nibh ipsum consequat nisl vel pretium lectus quam. Curabitur vitae nunc sed velit dignissim sodales. Sed libero enim sed faucibus turpis.")

Pantry.create!(nood_id: 1, user_id: 1, rating: 5, comments: "bla bla bla")
