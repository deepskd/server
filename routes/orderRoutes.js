require('../models/Order')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Order = mongoose.model('orders')

module.exports = app => {
  app.get('/api/orders', requireLogin, async (req, res) => {
    const orders = await Order.findByOrderName(req.query.orderName)

    res.status(200).send(orders)
  })

  app.patch('/api/orders', requireLogin, async (req, res) => {
    const updates = await Image.assignTeamToImages(
      req.body.selectedOrderIds,
      req.body.teamId
    )

    res.status(200).send({ message: 'Records Updated', meta: updates })
  })
}
