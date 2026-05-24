const fs = require('fs')
const path = require('path')

export async function POST(req){
  try{
    const body = await req.json()
    const { filename, data } = body
    if(!filename || !data) return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 })
    const matches = data.match(/^data:(.+);base64,(.+)$/)
    let buffer
    if(matches){
      buffer = Buffer.from(matches[2], 'base64')
    }else{
      // assume raw base64
      buffer = Buffer.from(data, 'base64')
    }
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if(!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
    const filePath = path.join(uploadsDir, filename)
    await fs.promises.writeFile(filePath, buffer)
    const url = `/uploads/${filename}`
    return new Response(JSON.stringify({ url }), { status: 201 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
