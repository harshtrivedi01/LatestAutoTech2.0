const connect = require('../../../../lib/mongoose')
const Blog = require('../../../../models/Blog')
const auth = require('../../../../lib/auth')

export async function GET(req, { params }){
  try{
    await connect()
    const { id } = params
    const post = await Blog.findById(id).populate('category')
    return new Response(JSON.stringify(post), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function PUT(req, { params }){
  try{
    await connect()
    try{ auth.verifyToken(req) }catch(e){ return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }) }
    const { id } = params
    const body = await req.json()
    const post = await Blog.findByIdAndUpdate(id, body, { new: true })
    return new Response(JSON.stringify(post), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function DELETE(req, { params }){
  try{
    await connect()
    try{ auth.verifyToken(req) }catch(e){ return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }) }
    const { id } = params
    await Blog.findByIdAndDelete(id)
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
