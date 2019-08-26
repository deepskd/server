const cloudinary = require('cloudinary').v2
const keys = require('../config/keys')

cloudinary.config({
  cloud_name: keys.cloudinaryCloudName,
  api_key: keys.cloudinaryApiKey,
  api_secret: keys.cloudinaryApiSecret,
})
