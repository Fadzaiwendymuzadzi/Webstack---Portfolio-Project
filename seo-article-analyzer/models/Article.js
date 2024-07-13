const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  keywords: {
    type: [String]
  },
  readability: {
    type: Number
  },
  wordCount: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Article', ArticleSchema);

