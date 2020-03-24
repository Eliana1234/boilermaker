const router = require('express').Router()
const {User, Outing, dayTime} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     console.log('IS THERE A USER', req.session)
//     let outing = await Outing.findOne({
//       where: {
//         day: req.body.day,
//         time: req.body.time
//       }
//     })
//     if (!outing){
//       const {time, day} = req.body
//       let newOuting= {}
//       newOuting.time = time
//       newOuting.day = day
//       outing = await Outing.create(newOuting)
//     }
//     res.json(outing)
//   } catch (error) {
//     next(error)
//   }
// })
