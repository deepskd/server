module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.user) {
    return res.status(401).send({ error: 'Not authorized' })
  }
  next()
}
