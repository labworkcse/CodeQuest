const express = require('express');
const { body, validationResult } = require('express-validator');
const FeedPost = require('../models/FeedPost');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get feed posts
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const user = await User.findById(req.userId);
    const friendsCount = user.friends.length;
    
    // Get posts from user and friends
    const authorIds = [req.userId, ...user.friends];
    
    const posts = await FeedPost.find({
      author: { $in: authorIds },
      isActive: true
    })
    .populate('author', 'username avatarUrl')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

    res.json(posts);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create feed post
router.post('/', auth, [
  body('caption').optional().isLength({ max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.userId);
    const friendsCount = user.friends.length;
    
    // Check post limits
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayPosts = await FeedPost.countDocuments({
      author: req.userId,
      createdAt: { $gte: today }
    });

    let maxPosts = 0;
    if (friendsCount === 0) {
      maxPosts = 0;
    } else if (friendsCount <= 2) {
      maxPosts = 2;
    } else if (friendsCount >= 10) {
      maxPosts = Infinity;
    } else {
      maxPosts = Math.floor(friendsCount / 2);
    }

    if (todayPosts >= maxPosts) {
      return res.status(400).json({ 
        message: 'Daily post limit reached',
        limit: maxPosts,
        current: todayPosts
      });
    }

    const { caption, mediaUrl, mediaType } = req.body;

    const post = new FeedPost({
      author: req.userId,
      caption,
      mediaUrl,
      mediaType
    });

    await post.save();
    await post.populate('author', 'username avatarUrl');

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await FeedPost.findById(req.params.id);
    
    if (!post || !post.isActive) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = post.likes.find(
      like => like.user.toString() === req.userId
    );

    if (existingLike) {
      // Unlike
      post.likes = post.likes.filter(
        like => like.user.toString() !== req.userId
      );
    } else {
      // Like
      post.likes.push({ user: req.userId });
    }

    await post.save();

    res.json({
      message: existingLike ? 'Post unliked' : 'Post liked',
      likes: post.likes.length
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;