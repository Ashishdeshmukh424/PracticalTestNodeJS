const mysql = require('mysql')
const util = require('util')

const con = mysql.createPool({
  host: 'localhost',
  database: 'practical_test',
  user: 'root',
  password: 'Winjit@1234',
  connectionLimit: 100,
  timezone: 'UTC',
})

con.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }
  console.log('Successfully connected to Database !!')

  if (connection) {
    connection.release()
  }
})

const mysqlConnection = util.promisify(con.query).bind(con)

module.exports = mysqlConnection
