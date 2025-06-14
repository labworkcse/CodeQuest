const express = require('express');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ 
      username: req.params.username,
      isActive: true 
    }).populate('friends', 'username avatarUrl');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's questions
    const questions = await Question.find({ 
      author: user._id,
      isActive: true 
    })
    .populate('tags', 'name')
    .sort({ createdAt: -1 })
    .limit(10);

    // Get user's answers count
    const answersCount = await Answer.countDocuments({ 
      author: user._id,
      isActive: true 
    });

    res.json({
      user,
      questions,
      answersCount
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { bio, avatarUrl } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { bio, avatarUrl },
      { new: true }
    ).populate('friends', 'username avatarUrl');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add friend
router.post('/:userId/friend', auth, async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    
    if (targetUserId === req.userId) {
      return res.status(400).json({ message: 'Cannot add yourself as friend' });
    }

    const user = await User.findById(req.userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friends.includes(targetUserId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    user.friends.push(targetUserId);
    targetUser.friends.push(req.userId);

    await user.save();
    await targetUser.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Add friend error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;