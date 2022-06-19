const mysqlConnection = require('../config/config')

exports.getUserData = async (req, res) => {
  try {
    const sqlQuery =
      'select id as user_id, name, age, telephone, isSubscribed from user where isSubscribed=?'
    const result = await mysqlConnection(sqlQuery, [1])

    res.status(200).send({
      status: 200,
      message: 'Success',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
    })
  }
}
