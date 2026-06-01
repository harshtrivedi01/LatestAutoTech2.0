const mongoose = require('mongoose')
console.log("MONGODB_URI =", process.env.MONGODB_URI)
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is missing')
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
