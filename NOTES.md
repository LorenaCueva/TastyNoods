# TASTY NOODS

Convinient
Affordable
Delicious
Comforting
...
Magical

However, not all instant ramen is created equal - some are more flavorful, some have better texture, and some are healthier than others. 
As a ramen lover, I often find myself overwhelmed by the copious amount of options available at stores. How to know which one is the best? How to know which one to try? How to know what the label even says?

That's why I'm proposing Tasty Noods, an Instant Ramen Rating app - a one-stop-shop for all things instant ramen. The app will give users reliable reviews by instant ramen aficionados. It will also allow users to overall rate and review these different brands and flavors of instant ramen, and view ratings and reviews from other users. 

With ratings, tags, information on where to buy them, comments from the community and ideas on different add-ins for extra flavor, ramen lovers everywhere will have a reliable source for finding the best instant ramen, and discovering new and exciting flavors.

# TECHNOLOGIES

- React: 
    A popular front-end JavaScript library for building user interfaces.
- Ruby on Rails: 
    A web application framework written in Ruby that follows the Model-View-Controller (MVC) architectural pattern.
- Bcrypt (Ruby gem):
    A Ruby gem for hashing passwords and providing secure authentication.
- active_model_serializers (ruby gem): 
    A Ruby gem for serializing ActiveRecord objects into JSON or XML.
- Active Storage (Ruby gem): 
    A Ruby gem for handling file uploads and attachments in Rails applications.
- Cloudinary: 
    A cloud-based image and video management service that provides image manipulation and optimization capabilities.
- Bulma: 
    A popular CSS framework for building responsive and mobile-first websites.

# USER STORIES

## ADMIN 

- As an admin of the Tasty Noods app, I want to be able to create detailed reviews of new Instant Ramen products, so that users can learn about the ramen's ingredients, flavor, texture, and other characteristics. The review creation process should allow me to upload photos. Once the review is published, it should be visible to all users who view the ramen's page.

- As an admin of the Tasty Noods app, I want to be able to edit an existing Instant Ramen's review, so that I can correct errors or update the information as needed. The editing process should allow me to modify the review's text, and media, as well as to adjust the overall rating of the ramen based on new information or feedback. Once the changes are saved, they should be reflected in the database and visible to all users who view the ramen's page.

- As an admin of the Tasty Noods app, I want to be able to delete an existing Instant Ramen's review, so that I can remove outdated or inaccurate information from the database. The deletion process should confirm my decision before removing the review from the database, and should prevent users from viewing or commenting on the review after it has been deleted.

- As an admin of the Tasty Noods app, I want to be able to delete user comments if they are found offensive or violate the app's community guidelines. The deletion process should allow me to review and delete individual comments, and should provide a reason for the deletion that is visible to the user who made the comment. Users whose comments are deleted should be notified of the deletion.

- As an admin, I want to be able to securely log in to the Tasty Noods App to access the admin functionalities of the app.

## Account

- As a user of the Tasty Noods app, I want to be able to create a personal account so that I can rate instant ramen products and keep track of my favorite products. I should be able to create an account by providing my username and choosing a secure password. Once I've created an account, I should be able to log in and access my account information from any device. If I forget my password, I should be able to reset it easily by following a secure authentication process.

- As a user of the Tasty Noods app, I want to be able to securely log in to my account using my username and password, so that I can access my ratings, favorites, and other account information. The login process should be simple and user-friendly, and should use industry-standard encryption and security protocols to protect my personal information.

## Profile

- As a user of the Tasty Noods app, I want to be able to upload an avatar picture to my profile, so that I can customize my user experience and make my account feel more personalized. The avatar picture should be able to be uploaded in a variety of common image formats

- As a user of the Tasty Noods app, I want to be able to edit the avatar picture in my profile, so that I can further customize my experience and ensure that my profile picture always reflects my current preferences. The editing process should be user-friendly and intuitive. The edited avatar picture should replace the existing avatar picture in my profile.

<!-- - As a user of the Tasty Noods app, I want to be able to remove the avatar picture in my profile, so that I can further customize my experience and ensure that my profile is always up-to-date. The removal process should be simple and user-friendly, and should confirm my decision before deleting the existing avatar picture from my profile. -->


## User

- As a user, I want to be able to view a list of all rated Instant Ramen so I can discover new Noods to try. This list should include the name of the ramen, its overall rating, and the number of user ratings it has received.

- As a user, I want to be able to click on an individual Instant Ramen and see all its information and review. This page should include details such as the brand, flavor, noodle type, broth type, and any additional toppings or flavors. Additionally, the main review of the ramen by an admin should be displayed along with the user's rating, if available.

- As a user, I want to be able to add an Instant Ramen to my pantry so I can keep track of which ones I've tried. This should be an easy process where the user selects the ramen from a list or search, and it is added to their pantry.

- As a user, I want to be able to remove an Instant Ramen from my pantry if I no longer have it or don't want to track it. This should be an easy process where the user selects the ramen from their pantry and chooses to remove it.

- As a user, I want to be able to rate an Instant Ramen in my pantry so I can remember my eating experience and share it with others. This should be done through a simple rating system, such as a 5-star rating, and the overal users' rating should be displayed with the main review of the ramen.

- As a user, I want to be able to add a comment on an Instant Ramen in my pantry to share my thoughts or experience with others who may try it later. This should be done through a simple text input box, and the user's comment should be saved and displayed with the main review of the ramen.

# END POINTS

- /login
    This endpoint can handle user authentication and log in.

- /noods
    This endpoint can display a list of all the Instant Ramen available in the app. Users can use this endpoint to browse and search for Instant Ramen they want to try.

- /nood/:id
    This endpoint can display the details of a specific Instant Ramen based on its ID. Users can use this endpoint to see the detailed information and review of an Instant Ramen they are interested in.

- /noods/new
    This endpoint can handle the process of adding a new Instant Ramen to the app. Admins can use this endpoint to add new Instant Ramen to the app.

- /pantry
    This endpoint can display a list of all the Instant Ramen that a user has added to their pantry. Users can use this endpoint to see the Instant Ramen they have tried and rated.

- /user
    This endpoint can display a user's profile information, such as their name, email, and avatar. Users can use this endpoint to view and edit their profile information.


# RELATIONSHIPS

## USER

has_secure_password
has_many :ratings
has_many :rated_noods, through: :ratings, source: :noods
has_many :noods_in_pantries, through: :pantries, source: :nood
has_many :pantries, :dependent => :destroy

has_one_attached :avatar  (active storage)


## RATING

belongs_to :nood
belongs_to :user

## NOOD

has_one :rating, :dependent => :destroy
has_many :pantries, :dependent => :destroy
has_many :users, through: :pantries
has_many :locations, :dependent => :destroy
has_many :stores, through: :locations


(has_one :nutrition)
has_many_attached :photos (active storage)

## PANTRY

belongs_to :user
belongs_to :nood


## LOCATION

belongs_to :nood
belongs_to :store

## STORE 

has_many :locations, :dependent => :destroy
has_many :noods, through: :locations


# USING

- React Stars

https://github.com/n49/react-stars

- Watermarked images used for educational purposes from: 

https://www.dreamstime.com

- Images used for educational purposes grabbed from the Internet.


