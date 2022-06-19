var express = require('express')
var router = express.Router()
const { loginUser } = require('../controller/loginController')
const { getUserData } = require('../controller/userController')
const validateToken = require('../middleware/authentication')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/login', loginUser)
router.get('/users', validateToken, getUserData)

module.exports = router
