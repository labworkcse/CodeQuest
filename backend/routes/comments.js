const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// Comment model
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxlength: 500
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentType: {
    type: String,
    enum: ['Question', 'Answer'],
    required: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

// Get comments for a parent (question or answer)
router.get('/:parentType/:parentId', async (req, res) => {
  try {
    const { parentType, parentId } = req.params;
    
    const comments = await Comment.find({
      parentType,
      parentId,
      isActive: true
    })
    .populate('author', 'username avatarUrl')
    .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create comment
router.post('/', auth, [
  body('body').isLength({ min: 1, max: 500 }),
  body('parentType').isIn(['Question', 'Answer']),
  body('parentId').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body, parentType, parentId } = req.body;

    const comment = new Comment({
      body,
      author: req.userId,
      parentType,
      parentId
    });

    await comment.save();
    await comment.populate('author', 'username avatarUrl');

    res.status(201).json({
      message: 'Comment created successfully',
      comment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;