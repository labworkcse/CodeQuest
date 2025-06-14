const express = require('express');
const Tag = require('../models/Tag');

const router = express.Router();

// Get all tags
router.get('/', async (req, res) => {
  try {
    const { search, limit = 50 } = req.query;
    
    let query = { isActive: true };
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const tags = await Tag.find(query)
      .sort({ questionsCount: -1, name: 1 })
      .limit(parseInt(limit));

    res.json(tags);
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular tags
router.get('/popular', async (req, res) => {
  try {
    const tags = await Tag.find({ isActive: true })
      .sort({ questionsCount: -1 })
      .limit(20);

    res.json(tags);
  } catch (error) {
    console.error('Get popular tags error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;