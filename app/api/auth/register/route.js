const connect = require('../../../../lib/mongoose')
const User = require('../../../../models/User')

export async function POST(req){
  try{
    await connect()
    const body = await req.json()
    const user = new User(body)
    await user.save()
    return new Response(JSON.stringify({ ok: true }), { status: 201 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
