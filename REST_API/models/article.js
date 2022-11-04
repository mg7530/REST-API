const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Article', articleSchema)