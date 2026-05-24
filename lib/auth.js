const jwt = require('jsonwebtoken')

function verifyToken(req){
  const auth = req.headers.get?.('authorization') || req.headers.get('Authorization') || ''
  const token = auth.replace(/^Bearer\s+/i, '') || auth
  if(!token) throw new Error('No token provided')
  const secret = process.env.JWT_SECRET || 'dev_secret'
  try{
    const payload = jwt.verify(token, secret)
    return payload
  }catch(err){
    throw new Error('Invalid token')
  }
}

module.exports = { verifyToken }
