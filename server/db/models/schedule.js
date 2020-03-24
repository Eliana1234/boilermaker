const Sequelize = require('sequelize')
const db = require('../db')

const Schedule = db.define('schedule', {
  outings: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  }
})

module.exports = Schedule
