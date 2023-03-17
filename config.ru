# This file is used by Rack-based servers to start the application.

require 'dotenv/load'
require 'cloudinary'
require 'cloudinary/uploader'
require 'cloudinary/utils'

require_relative "config/environment"

run Rails.application
Rails.application.load_server
