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
  }
})

const Response = mongoose.model('Response', responseSchema)
module.exports = Response
