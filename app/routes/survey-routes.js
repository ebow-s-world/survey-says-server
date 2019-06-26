const express = require('express')
const Survey = require('../models/survey')
const router = express.Router()

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// create
router.post('/surveys', requireToken, (req, res, next) => {
  req.body.survey.owner = req.user.id

  Survey.create(req.body.survey)
    .then(survey => {
      res.status(201).json({ survey: survey.toObject() })
    })
    .catch(next)
})

// index
router.get('/surveys', requireToken, (req, res, next) => {
  Survey.find()
    .populate('options')
    .then(surveys => {
      console.log(surveys[0].toObject())
      return surveys.map(survey => survey.toObject())
    })
    .then(surveys => res.status(200).json({ survey: surveys }))
    .catch(next)
})

// DESTROY
router.delete('/surveys/:id', requireToken, (req, res, next) => {
  Survey.findById(req.params.id)
    .then(handle404)
    .then(survey => {
      requireOwnership(req, survey)
      survey.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// update
router.patch('/surveys/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.survey.owner

  Survey.findById(req.params.id)
    .populate('options')
    .then(handle404)
    .then(survey => {
      requireOwnership(req, survey)
      return survey.update(req.body.survey)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
