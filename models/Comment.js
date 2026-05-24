const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  name: String,
  email: String,
  content: String,
  approved: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
