const router = require('express').Router()
const {User, Outing, dayTime} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    let outings = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [{model: Outing}]
    })
    if (!outings) {
      outings = 'no outings'
    }
    res.json(outings)
  } catch (error) {
    next(error)
  }
})

router.delete('/:outingId/:userId', async (req, res, next) => {
  try {
    const outing = await Outing.findByPk(req.params.outingId)
    const user = await User.findByPk(req.params.userId)
    res.send(outing)
    await user.removeOuting(outing)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  //REMOVING ALL INSTANCES OF LOCATION FROM OUTING MODEL AND ADDING TO THROUGH TABLE
  try {
    let outing = await Outing.findOne({
      where: {
        day: req.body.day,
        time: req.body.time
      }
    })
    if (!outing) {
      let newOuting = {}
      newOuting.time = req.body.time
      newOuting.day = req.body.day
      outing = await Outing.create(newOuting)
    }
    if (req.body.userId === 'guest') {
      let user = await User.create()
      user.addOuting(outing, {
        through: {
          location: req.body.location
        }
      })
      let resObj = {}
      resObj.outing = outing
      resObj.user = user
      res.json(resObj)
    } else {
      let user = await User.findByPk(req.body.userId)
      let daytime = await dayTime.findOne({
        where: {
          userId: user.id,
          outingId: outing.id
        }
      })
      if (!daytime) {
        user.addOuting(outing, {
          through: {
            location: req.body.location
          }
        })
        res.json(outing)
      } else {
        res.json('You have already scheduled for that day and time')
      }
    }
  } catch (error) {
    next(error)
  }
})

router.post('/map', async (req, res, next) => {
  try {
    console.log('THIS IS THE DAY IN THE API ROUTE', req.body.day)
    console.log('THIS IS THE TIME IN THE API ROUTE', req.body.time)
    let outing = await Outing.findOne({
      where: {
        day: req.body.day,
        time: req.body.time
      }
    })
    let daytimes = await dayTime.findAll({
      where: {
        outingId: outing.id
      }
    })
    res.json(daytimes)
  } catch (error) {
    next(error)
  }
})

module.exports = router
