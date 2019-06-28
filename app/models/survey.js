const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  }]
},
{
  transform: (_doc, survey) => {
    delete survey.owner
    return survey
  }
})

const Survey = mongoose.model('Survey', surveySchema)
module.exports = Survey
