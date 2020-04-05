const Sequelize = require('sequelize')
const db = require('../db')

const Outing = db.define('outing', {
  time: {
    type: Sequelize.STRING
  },
  day: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE)
  }
  //add location once you have the map set up
})

module.exports = Outing
