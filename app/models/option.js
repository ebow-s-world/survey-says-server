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
  timestamps: true,
  transform: (_doc, option) => {
    delete option.owner
    delete option.responses
    return option
  },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

optionSchema.virtual('count').get(function () {
  return this.responses.length
})

module.exports = mongoose.model('Option', optionSchema)
