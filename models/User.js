const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema({
  googleId: String,
  displayName: String,
  email: String,
  createdOn: { type: Date, default: Date.now },
  lastLogIn: { type: Date, default: Date.now },
})

User.pre('save', function(next) {
  now = new Date()
  this.lastLogIn = now
  if (!this.createdOn) {
    this.createdOn = now
  }
})

mongoose.model('users', User)
