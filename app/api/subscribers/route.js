const connect = require('../../../lib/mongoose')
const Subscriber = require('../../../models/Subscriber')

export async function GET(){
  try{
    await connect()
    const subscribers = await Subscriber.find().sort({ createdAt: -1 })
    return new Response(JSON.stringify(subscribers), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function POST(req){
  try{
    await connect()
    const body = await req.json()
    const s = new Subscriber(body)
    await s.save()
    return new Response(JSON.stringify({ ok: true }), { status: 201 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
