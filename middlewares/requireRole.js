module.exports = (req, res, next) => {
  if (!req.user.authorized) {
    return res.status(401).send({ error: 'Not authorized' })
  }
  next()
}
