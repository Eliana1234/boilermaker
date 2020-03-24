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

router.post('/', async (req, res, next) => {
  try {
    console.log('IS THERE A USER', req.session)
    let outing = await Outing.findOne({
      where: {
        day: req.body.day,
        time: req.body.time
      }
    })
    if (!outing) {
      const {time, day} = req.body
      let newOuting = {}
      newOuting.time = time
      newOuting.day = day
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

module.exports = router
