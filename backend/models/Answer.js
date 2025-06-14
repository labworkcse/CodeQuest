const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    minlength: 10
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  downvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isAccepted: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
answerSchema.index({ question: 1 });
answerSchema.index({ author: 1 });
answerSchema.index({ createdAt: -1 });

// Virtual for upvote count
answerSchema.virtual('upvoteCount').get(function() {
  return this.upvotes.length;
});

// Virtual for downvote count
answerSchema.virtual('downvoteCount').get(function() {
  return this.downvotes.length;
});

module.exports = mongoose.model('Answer', answerSchema);