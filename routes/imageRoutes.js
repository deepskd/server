require('../models/Image')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireRole = require('../middlewares/requireRole')
const cloudinary = require('cloudinary').v2
const image = require('../controllers/image')

const Image = mongoose.model('images')

module.exports = app => {
  app.get('/api/images', async (req, res) => {
    let images = []
    if (req.query.retailerId) {
      images = await Image.findByRetailerId(
        req.query.retailerId,
        req.query.activePage
      )
    } else if (req.query.teamId) {
      images = await Image.findByTeamId(req.query.teamId)
    }
    res.status(200).send(images)
  })

  app.get(
    '/api/retailerImageCount',
    requireLogin,
    requireRole,
    async (req, res) => {
      const imageStats = await Image.retailerImageCount(
        req.query.country,
        req.query.sort
      )
      res.status(200).send(imageStats)
    }
  )

  app.get(
    '/api/teamImageCount',
    requireLogin,
    requireRole,
    async (req, res) => {
      const imageStats = await Image.teamImageCount()
      res.status(200).send(imageStats)
    }
  )

  app.patch('/api/images', requireLogin, requireRole, async (req, res) => {
    const updates = await Image.assignTeamToImages(
      req.body.selectedImageIds,
      req.body.teamId
    )
    res.status(200).send({ message: 'Records Updated', meta: updates })
  })

  app.post('/api/images', requireLogin, requireRole, async (req, res) => {
    const values = Object.values(req.files)
    const promises = values.map(image =>
      cloudinary.uploader.upload(image.path, { folder: 'teamImages' })
    )

    try {
      const results = await Promise.all(promises)
      await image.uploadTeamImages(results)
      res.json(results)
    } catch (error) {
      console.log(error)
      res.status(501).send({ message: 'Error uploading images' })
    }
  })
}
