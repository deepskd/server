const mongoose = require('mongoose')
const Image = mongoose.model('images')

exports.uploadTeamImages = async (images, { teamId }) => {
  const retailerId = '999999'

  const teamImages = images.map(image => {
    return new Image({
      retailerId,
      previewImageURL: image.url,
      teamId,
    })
  })

  try {
    return await Image.insertMany(teamImages)
  } catch (error) {
    console.log(error)
    throw error
  }
}
