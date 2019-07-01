require('../models/OrderStat')
const mongoose = require('mongoose')
const OrderStat = mongoose.model('orderstats')
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.get('/api/orderStats', requireLogin, async (req, res) => {
    let { query } = req
    if (query.retailerType) {
      query.retailerType = query.retailerType.split('|')
    } else {
      query.retailerType = ['Wholesale', 'Promotion']
    }
    let stats = await OrderStat.findByCountry(query)
    stats.query = query
    res.send(stats)
  })
}
