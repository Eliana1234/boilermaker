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
  try {
    console.log('IS THERE A USER', req.session)
    console.log('API LOCATION', req.body.location)
    let outing = await Outing.findOne({
      where: {
        day: req.body.day,
        time: req.body.time,
        location: req.body.location
      }
    })
    if (!outing) {
      let newOuting = {}
      newOuting.time = req.body.time
      newOuting.day = req.body.day
      newOuting.location = req.body.location
      outing = await Outing.create(newOuting)
    }
    if (req.body.userId === 'guest') {
      let user = await User.create()
      await outing.addUser(user.id)
      let resObj = {}
      resObj.outing = outing
      resObj.user = user
      res.json(resObj)
    } else {
      await outing.addUser(req.body.userId)
      res.json(outing)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/map', async (req, res, next) => {
  try {
    console.log('THIS IS THE DAY IN THE API ROUTE', req.body.day)
    console.log('THIS IS THE TIME IN THE API ROUTE', req.body.time)
    let outings = await Outing.findAll({
      where: {
        day: req.body.day,
        time: req.body.time
      }
    })
    console.log('THESE ARE THE OUTINGS', outings)
    res.json(outings)
  } catch (error) {
    next(error)
  }
})

module.exports = router
