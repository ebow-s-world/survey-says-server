const express = require('express')
const passport = require('passport')

const Option = require('../models/option')
const Server = require('../models/survey')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// router.get('/options', requireToken, (req, res, next) => {
//   Option.find()
//     .then(options => {
//       return options.map(option => option.toObject())
//     })
//     .then(options => res.status(200).json({ options: options }))
//     .catch(next)
// })
//
// router.get('/options/:id', requireToken, (req, res, next) => {
//   Option.findById(req.params.id)
//     .then(handle404)
//     .then(option => res.status(200).json({ option: option.toObject() }))
//     .catch(next)
// })

router.post('/options', requireToken, (req, res, next) => {
  req.body.option.owner = req.user.id
  let option = {}
  Option.create(req.body.option)
    .then(newOption => {
      option = newOption
      return option
    })
    .then(() => Server.findById(option.server))
    .then(handle404)
    .then(server => {
      requireOwnership(req, server)
      return server.update({ $push: {options: option.id} })
    })
    .then(() => res.status(201).json({ option: option.toObject() }))
    .catch(next)
})

router.patch('/options/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.option.owner
  delete req.body.option.server
  delete req.body.option.responses

  Option.findById(req.params.id)
    .then(handle404)
    .then(option => {
      requireOwnership(req, option)
      return option.update(req.body.option)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/options/:id', requireToken, (req, res, next) => {
  Option.findById(req.params.id)
    .then(handle404)
    .then(option => {
      requireOwnership(req, option)
      option.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
