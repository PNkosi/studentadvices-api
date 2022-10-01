const mongoose = require('mongoose')
const { Schema } = mongoose

const StudentAdviceSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: 'Anonymous',
  },
  institution: {
    type: String,
    default: 'Anonymous',
  },
  advice: {
    type: String,
    default: 'No advice',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('studentadvice', StudentAdviceSchema)
