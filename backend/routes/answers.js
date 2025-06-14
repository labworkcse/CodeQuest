const express = require('express');
const { body, validationResult } = require('express-validator');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const auth = require('../middleware/auth');

const router = express.Router();

// Get answers for a question
router.get('/question/:questionId', async (req, res) => {
  try {
    const answers = await Answer.find({ 
      question: req.params.questionId,
      isActive: true 
    })
    .populate('author', 'username avatarUrl reputation badges')
    .sort({ isAccepted: -1, createdAt: -1 });

    res.json(answers);
  } catch (error) {
    console.error('Get answers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create answer
router.post('/', auth, [
  body('body').isLength({ min: 10 }),
  body('questionId').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body, questionId } = req.body;

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question || !question.isActive) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Create answer
    const answer = new Answer({
      body,
      question: questionId,
      author: req.userId
    });

    await answer.save();

    // Update question answers count
    question.answersCount += 1;
    await question.save();

    // Populate and return
    await answer.populate('author', 'username avatarUrl reputation');

    res.status(201).json({
      message: 'Answer created successfully',
      answer
    });
  } catch (error) {
    console.error('Create answer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Vote on answer
router.post('/:id/vote', auth, [
  body('type').isIn(['upvote', 'downvote'])
], async (req, res) => {
  try {
    const { type } = req.body;
    const answer = await Answer.findById(req.params.id);

    if (!answer || !answer.isActive) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    // Remove existing votes by this user
    answer.upvotes = answer.upvotes.filter(
      vote => vote.user.toString() !== req.userId
    );
    answer.downvotes = answer.downvotes.filter(
      vote => vote.user.toString() !== req.userId
    );

    // Add new vote
    if (type === 'upvote') {
      answer.upvotes.push({ user: req.userId });
    } else {
      answer.downvotes.push({ user: req.userId });
    }

    await answer.save();

    res.json({
      message: 'Vote recorded',
      upvotes: answer.upvotes.length,
      downvotes: answer.downvotes.length
    });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;