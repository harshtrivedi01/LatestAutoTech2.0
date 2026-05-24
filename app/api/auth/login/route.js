const connect = require('../../../../lib/mongoose')
const User = require('../../../../models/User')
const jwt = require('jsonwebtoken')

export async function POST(req) {
  try {
    await connect()
    const body = await req.json()
    const { email, password } = body
    const user = await User.findOne({ email })
    if (!user) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
    const valid = await user.comparePassword(password)
    if (!valid) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
    return new Response(JSON.stringify({ token }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
