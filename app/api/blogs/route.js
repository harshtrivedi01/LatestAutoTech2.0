const connect = require('../../../lib/mongoose')
const Blog = require('../../../models/Blog')
const auth = require('../../../lib/auth')

export async function GET(req){
  try{
    await connect()
    const url = new URL(req.url)
    const slug = url.searchParams.get('slug')
    if(slug){
      const post = await Blog.findOne({ slug }).populate('category')
      return new Response(JSON.stringify(post), { status: 200 })
    }
    const page = parseInt(url.searchParams.get('page')||'1')
    const limit = parseInt(url.searchParams.get('limit')||'10')
    const query = url.searchParams.get('q')
    const filters = {}
    if (query) {
      const search = new RegExp(query, 'i')
      filters.$or = [
        { title: search },
        { description: search },
        { content: search },
        { tags: search }
      ]
    }
    const posts = await Blog.find(filters).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit).populate('category')
    return new Response(JSON.stringify(posts), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function POST(req){
  try{
    await connect()
    // protect route
    try{ auth.verifyToken(req) }catch(e){
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    const body = await req.json()
    const post = new Blog(body)
    await post.save()
    return new Response(JSON.stringify(post), { status: 201 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function DELETE(req){
  try{
    await connect()
    // protect route
    try{ auth.verifyToken(req) }catch(e){
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    const body = await req.json()
    const { id } = body
    await Blog.findByIdAndDelete(id)
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
