const mongoose = require('mongoose')
const Image = mongoose.model('images')

exports.uploadTeamImages = async images => {
  const retailerId = '999999'

  const teamImages = images.map(image => {
    return new Image({
      retailerId,
      previewImageURL: image.url,
    })
  })

  try {
    const imgs = await Image.insertMany(teamImages)
    return imgs
  } catch (error) {
    console.log(error)
    throw error
  }
}
