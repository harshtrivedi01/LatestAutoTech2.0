const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'admin' }
}, { timestamps: true })

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = function(candidate){
  return bcrypt.compare(candidate, this.password)
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
