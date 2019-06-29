const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
    required: true
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  }
},
{
  transform: (_doc, response) => {
    delete response.owner
    return response
  }
})

const Response = mongoose.model('Response', responseSchema)
module.exports = Response
