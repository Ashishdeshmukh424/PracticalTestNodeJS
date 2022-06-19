const { sign } = require('jsonwebtoken')
const mysqlConnection = require('../config/config')
const sha1 = require('sha1')

const JWT_KEY = 'secret-key'

exports.loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request, request is made with invalid arguments',
      })
    }

    const password = req.body.password ? sha1(req.body.password) : null
    const email = req.body.email ? sha1(req.body.email) : null

    const mysqlQuery = 'SELECT * FROM user where email=?'
    const result = await mysqlConnection(mysqlQuery, [email])

    if (result.length === 0) {
      return res.status(400).json({
        status: 0,
        message: 'Invalid username or password',
      })
    }
    const userData = JSON.parse(JSON.stringify(result[0]))
    delete userData.password

    if (result[0].password === password && result[0].email === email) {
      const jsontoken = sign(
        {
          data: userData,
        },
        JWT_KEY,
        {
          expiresIn: '1h',
        }
      )
      res.status(200).json({
        status: 1,
        message: 'Login successfully',
        token: jsontoken,
      })
    } else {
      return res.status(400).json({
        status: 0,
        message: 'Invalid Username or Password',
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
      data: null,
    })
  }
}
