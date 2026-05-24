const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String
}, { timestamps: true })

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema)
