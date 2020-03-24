const Sequelize = require('sequelize')
const db = require('../db')

const dayTime = db.define('dayTime', {
  userId: {
    type: Sequelize.INTEGER
  },
  outingId: {
    type: Sequelize.INTEGER
  }
})

module.exports = dayTime
