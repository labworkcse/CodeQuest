const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Question = require('../models/Question');
const Tag = require('../models/Tag');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all questions with pagination and filtering
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('sort').optional().isIn(['newest', 'active', 'votes', 'views']),
  query('tags').optional(),
  query('search').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sort = req.query.sort || 'newest';
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const search = req.query.search;

    // Build query
    let query = { isActive: true };

    // Add tag filter
    if (tags.length > 0) {
      const tagObjects = await Tag.find({ name: { $in: tags } });
      const tagIds = tagObjects.map(tag => tag._id);
      query.tags = { $in: tagIds };
    }

    // Add search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Build sort
    let sortQuery = {};
    switch (sort) {
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      case 'active':
        sortQuery = { updatedAt: -1 };
        break;
      case 'votes':
        sortQuery = { score: -1 };
        break;
      case 'views':
        sortQuery = { views: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    const questions = await Question.find(query)
      .populate('author', 'username avatarUrl reputation')
      .populate('tags', 'name')
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Question.countDocuments(query);

    res.json({
      questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single question
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username avatarUrl reputation badges')
      .populate('tags', 'name');

    if (!question || !question.isActive) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Increment view count
    question.views += 1;
    await question.save();

    res.json(question);
  } catch (error) {
    console.error('Get question error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create question
router.post('/', auth, [
  body('title').isLength({ min: 15, max: 200 }).trim(),
  body('body').isLength({ min: 30 }),
  body('tags').isArray({ min: 1, max: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, body, tags } = req.body;

    // Find or create tags
    const tagObjects = [];
    for (const tagName of tags) {
      let tag = await Tag.findOne({ name: tagName.toLowerCase() });
      if (!tag) {
        tag = new Tag({ name: tagName.toLowerCase() });
        await tag.save();
      }
      tagObjects.push(tag._id);
    }

    // Create question
    const question = new Question({
      title,
      body,
      tags: tagObjects,
      author: req.userId
    });

    await question.save();

    // Update tag question counts
    await Tag.updateMany(
      { _id: { $in: tagObjects } },
      { $inc: { questionsCount: 1 } }
    );

    // Populate and return
    await question.populate('author', 'username avatarUrl reputation');
    await question.populate('tags', 'name');

    res.status(201).json({
      message: 'Question created successfully',
      question
    });
  } catch (error) {
    console.error('Create question error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Vote on question
router.post('/:id/vote', auth, [
  body('type').isIn(['upvote', 'downvote'])
], async (req, res) => {
  try {
    const { type } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question || !question.isActive) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Remove existing votes by this user
    question.upvotes = question.upvotes.filter(
      vote => vote.user.toString() !== req.userId
    );
    question.downvotes = question.downvotes.filter(
      vote => vote.user.toString() !== req.userId
    );

    // Add new vote
    if (type === 'upvote') {
      question.upvotes.push({ user: req.userId });
    } else {
      question.downvotes.push({ user: req.userId });
    }

    await question.save();

    res.json({
      message: 'Vote recorded',
      upvotes: question.upvotes.length,
      downvotes: question.downvotes.length,
      score: question.upvotes.length - question.downvotes.length
    });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;