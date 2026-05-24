const connect = require('../../../lib/mongoose')
const Comment = require('../../../models/Comment')

export async function POST(req){
  try{
    await connect()
    const body = await req.json()
    const c = new Comment(body)
    await c.save()
    return new Response(JSON.stringify(c), { status: 201 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function GET(req){
  try{
    await connect()
    const url = new URL(req.url)
    const blog = url.searchParams.get('blog')
    const comments = blog ? await Comment.find({ blog }) : await Comment.find()
    return new Response(JSON.stringify(comments), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
