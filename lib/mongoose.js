const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techdrives'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) cached = global.mongoose = { conn: null, promise: null }

async function connect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    const opts = { bufferCommands: false }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

module.exports = connect
