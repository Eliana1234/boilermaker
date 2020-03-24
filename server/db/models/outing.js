const Sequelize = require('sequelize')
const db = require('../db')

const Outing = db.define('outing', {
  time: {
    type: Sequelize.STRING
  },
  day: {
    type: Sequelize.STRING
  }
  //add location once you have the map set up
})

module.exports = Outing
