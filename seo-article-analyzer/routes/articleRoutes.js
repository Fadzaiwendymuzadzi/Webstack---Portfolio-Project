const express = require('express');
const router = express.Router();
const { analyzeArticle } = require('../controllers/articleController');

// @route   POST api/articles/analyze
// @desc    Analyze article for SEO metrics
// @access  Private
router.post('/analyze', analyzeArticle);

module.exports = router;

