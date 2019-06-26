const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  responses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Response'
  }]
}, {
  timestamps: true
})

optionSchema.virtual('count').get(function () {
  return this.responses.length
})

module.exports = mongoose.model('Option', optionSchema)
