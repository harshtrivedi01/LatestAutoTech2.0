const connect = require('../../../lib/mongoose')
const Category = require('../../../models/Category')

export async function GET(){
  try{
    await connect()
    const categories = await Category.find()
    return new Response(JSON.stringify(categories), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function POST(req){
  try{
    await connect()
    const body = await req.json()
    const cat = new Category(body)
    await cat.save()
    return new Response(JSON.stringify(cat), { status: 201 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
