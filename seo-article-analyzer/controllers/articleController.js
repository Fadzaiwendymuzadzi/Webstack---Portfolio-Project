const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const natural = require('natural');
const readability = require('readability');
const auth = require('../middleware/authMiddleware');

// @route   POST api/articles/analyze
// @desc    Analyze article for SEO metrics
// @access  Private
router.post('/analyze', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(content);
    const wordCount = words.length;
    const keywordMap = {};
    words.forEach(word => {
      keywordMap[word] = (keywordMap[word] || 0) + 1;
    });
    const keywords = Object.entries(keywordMap).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([word]) => word);
    const readabilityScore = readability.calculate(content).score;
    const newArticle = new Article({
      title,
      content,
      keywords,
      readability: readabilityScore,
      wordCount,
      user: req.user.id
    });
    const article = await newArticle.save();
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

