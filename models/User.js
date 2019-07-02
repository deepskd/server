const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema(
  {
    googleId: String,
    displayName: String,
    email: String,
  },
  { timestamps: { updatedAt: 'lastLogIn' } }
)

User.pre('save', function() {
  this.lastLogIn = new Date()
})

mongoose.model('users', User)
