const connect = require('../../../../lib/mongoose')
const User = require('../../../../models/User')
const jwt = require('jsonwebtoken')

export async function POST(req) {
  try {
    await connect()

    const body = await req.json()
    const { email, password } = body

    console.log("Login email:", email)

    const user = await User.findOne({ email })

    console.log("User found:", !!user)

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 401 }
      )
    }

    const valid = await user.comparePassword(password)

    console.log("Password valid:", valid)

    if (!valid) {
      return new Response(
        JSON.stringify({ error: 'Wrong password' }),
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '7d' }
    )

    return new Response(
      JSON.stringify({ token }),
      { status: 200 }
    )
  } catch (err) {
    console.error(err)

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
}