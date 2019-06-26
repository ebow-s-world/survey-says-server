const express = require('express')
const passport = require('passport')

const Option = require('../models/option')
const Survey = require('../models/survey')

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
  let survey
  Survey.findById(req.body.option.survey)
    .then(handle404)
    .then(surveyResponse => {
      survey = surveyResponse
      requireOwnership(req, survey)
    })
    .then(() => Option.create(req.body.option))
    .then(option => {
      survey.options.push(option.id)
      survey.save()
      return option
    })
    .then(option => {
      console.log(option)
      res.status(201).json({ option: option.toObject() })
    })
    .catch(next)
})

router.patch('/options/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.option.owner
  delete req.body.option.survey
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
