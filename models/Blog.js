const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  content: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  featuredImage: String,
  tags: [String],
  author: { type: String },
  likes: { type: Number, default: 0 },
  bookmarks: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
