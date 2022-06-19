const jwt = require('jsonwebtoken')
const JWT_KEY = 'secret-key'

const validateToken = async (req, res, next) => {
  const { headers } = req
  try {
    if (headers['x-auth-token']) {
      const tokenDecryptInfo = await verifyToken(headers['x-auth-token'])
      console.log('tokenDecryptInfo:', tokenDecryptInfo)
      if (!tokenDecryptInfo.data) {
        res.status(401)
        res.json({ status: 401, message: 'Session has expired' })
      }
      next()
    } else {
      res.status(401)
      res.json({ status: 401, message: 'Auth token missing' })
    }
  } catch (e) {
    res.status(500)
    res.json({ status: 500, message: e.message })
  }
}

const verifyToken = (token) => {
  try {
    const decodedData = jwt.verify(token, JWT_KEY)
    console.log('-> decodedData:', decodedData)
    return decodedData
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      err.message = 'User Session Expired'
      err.status = 401
      throw err
    }
    throw err
  }
}

module.exports = validateToken
