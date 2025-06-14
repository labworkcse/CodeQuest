const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 20
  },
  description: {
    type: String,
    maxlength: 500
  },
  questionsCount: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for searching
tagSchema.index({ name: 'text' });

module.exports = mongoose.model('Tag', tagSchema);