require('../models/Order')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireRole = require('../middlewares/requireRole')

const Order = mongoose.model('orders')

module.exports = app => {
  app.get('/api/orders', requireLogin, requireRole, async (req, res) => {
    const orders = await Order.findOrders(req.query)

    res.status(200).send(orders)
  })

  app.patch('/api/orders', requireLogin, requireRole, async (req, res) => {
    const updates = await Image.assignTeamToImages(
      req.body.selectedOrderIds,
      req.body.teamId
    )

    res.status(200).send({ message: 'Records Updated', meta: updates })
  })
}
