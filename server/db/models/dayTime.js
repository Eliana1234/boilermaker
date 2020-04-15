const Sequelize = require('sequelize')
const db = require('../db')

const dayTime = db.define('dayTime', {
  userId: {
    type: Sequelize.INTEGER
  },
  outingId: {
    type: Sequelize.INTEGER
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE)
  }
})

module.exports = dayTime
