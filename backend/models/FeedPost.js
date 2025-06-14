const mongoose = require('mongoose');

const feedPostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caption: {
    type: String,
    maxlength: 1000
  },
  mediaUrl: {
    type: String
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: function() {
      return this.mediaUrl;
    }
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  shares: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  commentsCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
feedPostSchema.index({ author: 1 });
feedPostSchema.index({ createdAt: -1 });

// Virtual for likes count
feedPostSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for shares count
feedPostSchema.virtual('sharesCount').get(function() {
  return this.shares.length;
});

module.exports = mongoose.model('FeedPost', feedPostSchema);